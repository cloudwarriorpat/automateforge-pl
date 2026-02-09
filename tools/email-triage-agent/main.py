#!/usr/bin/env python3
"""
AutomateForge.pl - Agent Triażu Email (MVP)
=============================================

Inteligentny agent do automatycznej klasyfikacji i priorytetyzacji
wiadomości email. Łączy się z Gmail przez IMAP, klasyfikuje wiadomości
przy użyciu Anthropic Claude API, etykietuje je w Gmail i wysyła
podsumowanie na Slack.

Autor: AutomateForge.pl
"""

import email
import imaplib
import json
import logging
import os
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from email.header import decode_header
from typing import Optional

try:
    from dotenv import load_dotenv
except ImportError:
    print("Błąd: Brak biblioteki python-dotenv. Zainstaluj: pip install python-dotenv")
    sys.exit(1)

try:
    import anthropic
except ImportError:
    print("Błąd: Brak biblioteki anthropic. Zainstaluj: pip install anthropic>=0.40")
    sys.exit(1)

try:
    import requests
except ImportError:
    print("Błąd: Brak biblioteki requests. Zainstaluj: pip install requests>=2.31")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Konfiguracja logowania
# ---------------------------------------------------------------------------

LOG_FORMAT = "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

logging.basicConfig(
    level=logging.INFO,
    format=LOG_FORMAT,
    datefmt=LOG_DATE_FORMAT,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("email_triage.log", encoding="utf-8"),
    ],
)

logger = logging.getLogger("email-triage-agent")


# ---------------------------------------------------------------------------
# Modele danych
# ---------------------------------------------------------------------------

CATEGORIES = {
    "urgent": {
        "label": "URGENT",
        "display_name": "Pilne",
        "emoji": "🔴",
        "priority": 1,
    },
    "invoice": {
        "label": "INVOICE",
        "display_name": "Faktura",
        "emoji": "💰",
        "priority": 2,
    },
    "support": {
        "label": "SUPPORT",
        "display_name": "Wsparcie",
        "emoji": "🔧",
        "priority": 3,
    },
    "spam": {
        "label": "SPAM",
        "display_name": "Spam",
        "emoji": "🗑️",
        "priority": 6,
    },
    "newsletter": {
        "label": "NEWSLETTER",
        "display_name": "Newsletter",
        "emoji": "📰",
        "priority": 5,
    },
    "other": {
        "label": "OTHER",
        "display_name": "Inne",
        "emoji": "📧",
        "priority": 4,
    },
}


@dataclass
class EmailMessage:
    """Reprezentacja wiadomości email."""

    uid: str
    subject: str
    sender: str
    date: str
    body: str
    category: Optional[str] = None
    confidence: float = 0.0
    summary: str = ""


@dataclass
class TriageResult:
    """Wynik triażu - podsumowanie sesji."""

    total_processed: int = 0
    categories: dict = field(default_factory=dict)
    errors: list = field(default_factory=list)
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

    def add(self, category: str):
        self.categories[category] = self.categories.get(category, 0) + 1
        self.total_processed += 1


# ---------------------------------------------------------------------------
# Klient Gmail (IMAP)
# ---------------------------------------------------------------------------


class GmailClient:
    """Klient do połączenia z Gmail przez IMAP."""

    IMAP_SERVER = "imap.gmail.com"
    IMAP_PORT = 993

    def __init__(self, email_address: str, app_password: str):
        self.email_address = email_address
        self.app_password = app_password
        self.connection: Optional[imaplib.IMAP4_SSL] = None

    def connect(self) -> None:
        """Nawiązuje połączenie z serwerem IMAP Gmail."""
        logger.info("Łączenie z Gmail IMAP: %s", self.email_address)
        try:
            self.connection = imaplib.IMAP4_SSL(self.IMAP_SERVER, self.IMAP_PORT)
            self.connection.login(self.email_address, self.app_password)
            logger.info("Połączono pomyślnie z Gmail IMAP")
        except imaplib.IMAP4.error as e:
            logger.error("Błąd logowania IMAP: %s", e)
            raise ConnectionError(
                f"Nie udało się połączyć z Gmail. Sprawdź dane logowania. "
                f"Upewnij się, że używasz hasła aplikacji (App Password). "
                f"Szczegóły: {e}"
            ) from e

    def disconnect(self) -> None:
        """Zamyka połączenie IMAP."""
        if self.connection:
            try:
                self.connection.close()
                self.connection.logout()
                logger.info("Rozłączono z Gmail IMAP")
            except Exception as e:
                logger.warning("Błąd podczas rozłączania: %s", e)

    def fetch_unread_emails(self, max_count: int = 50) -> list[EmailMessage]:
        """
        Pobiera nieprzeczytane wiadomości email.

        Args:
            max_count: Maksymalna liczba wiadomości do pobrania.

        Returns:
            Lista obiektów EmailMessage.
        """
        if not self.connection:
            raise ConnectionError("Brak połączenia z IMAP. Wywołaj connect() najpierw.")

        self.connection.select("INBOX")
        logger.info("Wyszukiwanie nieprzeczytanych wiadomości...")

        status, message_ids = self.connection.search(None, "UNSEEN")
        if status != "OK":
            logger.warning("Błąd wyszukiwania wiadomości: %s", status)
            return []

        ids = message_ids[0].split()
        if not ids:
            logger.info("Brak nieprzeczytanych wiadomości")
            return []

        # Ograniczenie do max_count najnowszych
        ids = ids[-max_count:]
        logger.info("Znaleziono %d nieprzeczytanych wiadomości (pobieranie do %d)", len(ids), max_count)

        emails = []
        for msg_id in ids:
            try:
                email_msg = self._fetch_single_email(msg_id)
                if email_msg:
                    emails.append(email_msg)
            except Exception as e:
                logger.error("Błąd pobierania wiadomości %s: %s", msg_id, e)

        return emails

    def _fetch_single_email(self, msg_id: bytes) -> Optional[EmailMessage]:
        """Pobiera i parsuje pojedynczą wiadomość."""
        status, msg_data = self.connection.fetch(msg_id, "(RFC822)")
        if status != "OK":
            return None

        raw_email = msg_data[0][1]
        msg = email.message_from_bytes(raw_email)

        # Dekodowanie tematu
        subject = self._decode_header_value(msg["Subject"] or "(brak tematu)")

        # Dekodowanie nadawcy
        sender = self._decode_header_value(msg["From"] or "(nieznany)")

        # Data
        date_str = msg["Date"] or ""

        # Treść
        body = self._extract_body(msg)

        # Ograniczenie treści do rozsądnej długości dla API
        if len(body) > 2000:
            body = body[:2000] + "... [treść skrócona]"

        return EmailMessage(
            uid=msg_id.decode("utf-8"),
            subject=subject,
            sender=sender,
            date=date_str,
            body=body,
        )

    @staticmethod
    def _decode_header_value(value: str) -> str:
        """Dekoduje nagłówek email (obsługa różnych kodowań)."""
        decoded_parts = decode_header(value)
        result = []
        for part, charset in decoded_parts:
            if isinstance(part, bytes):
                result.append(part.decode(charset or "utf-8", errors="replace"))
            else:
                result.append(part)
        return " ".join(result)

    @staticmethod
    def _extract_body(msg: email.message.Message) -> str:
        """Wyciąga treść tekstową z wiadomości email."""
        body = ""

        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition", ""))

                if "attachment" in content_disposition:
                    continue

                if content_type == "text/plain":
                    payload = part.get_payload(decode=True)
                    if payload:
                        charset = part.get_content_charset() or "utf-8"
                        body = payload.decode(charset, errors="replace")
                        break
                elif content_type == "text/html" and not body:
                    payload = part.get_payload(decode=True)
                    if payload:
                        charset = part.get_content_charset() or "utf-8"
                        body = payload.decode(charset, errors="replace")
        else:
            payload = msg.get_payload(decode=True)
            if payload:
                charset = msg.get_content_charset() or "utf-8"
                body = payload.decode(charset, errors="replace")

        return body.strip()

    def apply_label(self, msg_uid: str, label_name: str) -> bool:
        """
        Stosuje etykietę do wiadomości w Gmail.

        Args:
            msg_uid: UID wiadomości.
            label_name: Nazwa etykiety (zostanie utworzona z prefiksem AutoForge/).

        Returns:
            True jeśli etykieta została zastosowana pomyślnie.
        """
        if not self.connection:
            return False

        full_label = f"AutoForge/{label_name}"

        try:
            # Próba zastosowania etykiety (Gmail IMAP)
            status, _ = self.connection.uid(
                "STORE", msg_uid, "+X-GM-LABELS", f"({full_label})"
            )
            if status == "OK":
                logger.debug("Etykieta '%s' zastosowana do wiadomości %s", full_label, msg_uid)
                return True
            else:
                logger.warning(
                    "Nie udało się zastosować etykiety '%s' do wiadomości %s",
                    full_label,
                    msg_uid,
                )
                return False
        except Exception as e:
            logger.error("Błąd etykietowania wiadomości %s: %s", msg_uid, e)
            return False

    def mark_as_read(self, msg_uid: str) -> None:
        """Oznacza wiadomość jako przeczytaną."""
        if self.connection:
            try:
                self.connection.uid("STORE", msg_uid, "+FLAGS", "\\Seen")
            except Exception as e:
                logger.warning("Nie udało się oznaczyć wiadomości %s jako przeczytanej: %s", msg_uid, e)


# ---------------------------------------------------------------------------
# Klasyfikator AI (Anthropic Claude)
# ---------------------------------------------------------------------------


class EmailClassifier:
    """Klasyfikator email oparty na Anthropic Claude API."""

    CLASSIFICATION_PROMPT = """Jesteś ekspertem od klasyfikacji wiadomości email dla polskiej firmy.
Twoim zadaniem jest sklasyfikowanie poniższej wiadomości do jednej z kategorii i napisanie krótkiego podsumowania.

Dostępne kategorie:
- urgent: Pilne sprawy wymagające natychmiastowej reakcji (terminy, awarie, skargi, pilne prośby)
- invoice: Faktury, rachunki, noty księgowe, dokumenty finansowe, płatności
- support: Prośby o pomoc techniczną, pytania o produkt/usługę, zgłoszenia problemów
- spam: Niechciane reklamy, phishing, podejrzane wiadomości
- newsletter: Newslettery, biuletyny informacyjne, subskrypcje, mailingi marketingowe
- other: Wszystko, co nie pasuje do powyższych kategorii

Wiadomość email:
---
Od: {sender}
Temat: {subject}
Data: {date}

Treść:
{body}
---

Odpowiedz w formacie JSON (bez bloków kodu markdown):
{{
    "category": "<jedna z: urgent, invoice, support, spam, newsletter, other>",
    "confidence": <pewność od 0.0 do 1.0>,
    "summary": "<krótkie podsumowanie wiadomości po polsku, max 2 zdania>",
    "reasoning": "<krótkie uzasadnienie klasyfikacji>"
}}"""

    def __init__(self, api_key: str, model: str = "claude-sonnet-4-20250514"):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model
        logger.info("Inicjalizacja klasyfikatora AI (model: %s)", model)

    def classify(self, email_msg: EmailMessage) -> EmailMessage:
        """
        Klasyfikuje wiadomość email.

        Args:
            email_msg: Wiadomość do sklasyfikowania.

        Returns:
            Wiadomość z uzupełnionymi polami category, confidence i summary.
        """
        prompt = self.CLASSIFICATION_PROMPT.format(
            sender=email_msg.sender,
            subject=email_msg.subject,
            date=email_msg.date,
            body=email_msg.body[:1500],
        )

        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=500,
                messages=[{"role": "user", "content": prompt}],
            )

            response_text = response.content[0].text.strip()

            # Parsowanie JSON z odpowiedzi
            # Obsługa przypadku, gdy odpowiedź jest w bloku kodu
            if response_text.startswith("```"):
                lines = response_text.split("\n")
                json_lines = [l for l in lines if not l.startswith("```")]
                response_text = "\n".join(json_lines)

            result = json.loads(response_text)

            category = result.get("category", "other").lower()
            if category not in CATEGORIES:
                logger.warning("Nieznana kategoria '%s', ustawiam 'other'", category)
                category = "other"

            email_msg.category = category
            email_msg.confidence = float(result.get("confidence", 0.5))
            email_msg.summary = result.get("summary", "")

            logger.info(
                "Sklasyfikowano: [%s] (%.0f%%) %s",
                category.upper(),
                email_msg.confidence * 100,
                email_msg.subject[:60],
            )

        except json.JSONDecodeError as e:
            logger.error("Błąd parsowania odpowiedzi AI: %s", e)
            email_msg.category = "other"
            email_msg.confidence = 0.0
            email_msg.summary = "Błąd klasyfikacji - wymaga ręcznego sprawdzenia"

        except anthropic.APIError as e:
            logger.error("Błąd API Anthropic: %s", e)
            email_msg.category = "other"
            email_msg.confidence = 0.0
            email_msg.summary = "Błąd API - wymaga ręcznego sprawdzenia"

        except Exception as e:
            logger.error("Nieoczekiwany błąd klasyfikacji: %s", e)
            email_msg.category = "other"
            email_msg.confidence = 0.0
            email_msg.summary = "Błąd klasyfikacji"

        return email_msg


# ---------------------------------------------------------------------------
# Powiadamiacz Slack
# ---------------------------------------------------------------------------


class SlackNotifier:
    """Wysyła podsumowania triażu na Slack przez webhook."""

    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url
        logger.info("Inicjalizacja powiadomień Slack")

    def send_triage_summary(
        self, emails: list[EmailMessage], result: TriageResult
    ) -> bool:
        """
        Wysyła podsumowanie triażu na kanał Slack.

        Args:
            emails: Lista sklasyfikowanych wiadomości.
            result: Wynik triażu.

        Returns:
            True jeśli wiadomość została wysłana pomyślnie.
        """
        blocks = self._build_slack_blocks(emails, result)
        payload = {"blocks": blocks}

        try:
            response = requests.post(
                self.webhook_url,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30,
            )

            if response.status_code == 200:
                logger.info("Podsumowanie wysłane na Slack")
                return True
            else:
                logger.error(
                    "Błąd Slack webhook (HTTP %d): %s",
                    response.status_code,
                    response.text,
                )
                return False

        except requests.RequestException as e:
            logger.error("Błąd komunikacji ze Slack: %s", e)
            return False

    def _build_slack_blocks(
        self, emails: list[EmailMessage], result: TriageResult
    ) -> list[dict]:
        """Buduje bloki wiadomości Slack."""
        now = datetime.now().strftime("%d.%m.%Y %H:%M")

        blocks = [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f"📬 Raport triażu email - {now}",
                },
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": (
                        f"*Przetworzono:* {result.total_processed} wiadomości\n"
                        f"*Czas przetwarzania:* "
                        f"{(result.end_time - result.start_time).seconds}s"
                        if result.start_time and result.end_time
                        else f"*Przetworzono:* {result.total_processed} wiadomości"
                    ),
                },
            },
            {"type": "divider"},
        ]

        # Statystyki kategorii
        category_lines = []
        for cat_key, count in sorted(
            result.categories.items(),
            key=lambda x: CATEGORIES.get(x[0], {}).get("priority", 99),
        ):
            cat_info = CATEGORIES.get(cat_key, {})
            emoji = cat_info.get("emoji", "📧")
            display = cat_info.get("display_name", cat_key)
            category_lines.append(f"{emoji} *{display}:* {count}")

        if category_lines:
            blocks.append(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Podział na kategorie:*\n" + "\n".join(category_lines),
                    },
                }
            )
            blocks.append({"type": "divider"})

        # Pilne wiadomości (szczegóły)
        urgent_emails = [e for e in emails if e.category == "urgent"]
        if urgent_emails:
            blocks.append(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "🔴 *Wiadomości pilne - wymagają natychmiastowej reakcji:*",
                    },
                }
            )
            for ue in urgent_emails:
                blocks.append(
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": (
                                f"• *{ue.subject[:80]}*\n"
                                f"  Od: {ue.sender[:60]}\n"
                                f"  _{ue.summary}_"
                            ),
                        },
                    }
                )

        # Faktury (podsumowanie)
        invoice_emails = [e for e in emails if e.category == "invoice"]
        if invoice_emails:
            blocks.append(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": (
                            f"💰 *Faktury ({len(invoice_emails)}):*\n"
                            + "\n".join(
                                f"• {ie.subject[:80]} (od: {ie.sender[:40]})"
                                for ie in invoice_emails[:5]
                            )
                        ),
                    },
                }
            )

        # Błędy
        if result.errors:
            blocks.append({"type": "divider"})
            blocks.append(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": (
                            f"⚠️ *Błędy ({len(result.errors)}):*\n"
                            + "\n".join(f"• {err}" for err in result.errors[:5])
                        ),
                    },
                }
            )

        # Stopka
        blocks.append({"type": "divider"})
        blocks.append(
            {
                "type": "context",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": "🤖 _AutomateForge.pl - Agent Triażu Email_",
                    }
                ],
            }
        )

        return blocks


# ---------------------------------------------------------------------------
# Główny agent triażu
# ---------------------------------------------------------------------------


class EmailTriageAgent:
    """Główny agent triażu email - orkiestruje cały proces."""

    def __init__(
        self,
        gmail_client: GmailClient,
        classifier: EmailClassifier,
        slack_notifier: Optional[SlackNotifier] = None,
        max_emails: int = 50,
        apply_labels: bool = True,
        mark_read: bool = False,
    ):
        self.gmail = gmail_client
        self.classifier = classifier
        self.slack = slack_notifier
        self.max_emails = max_emails
        self.apply_labels = apply_labels
        self.mark_read = mark_read

    def run(self) -> TriageResult:
        """
        Uruchamia pełny cykl triażu email.

        Returns:
            Obiekt TriageResult z podsumowaniem sesji.
        """
        result = TriageResult(start_time=datetime.now())
        classified_emails = []

        logger.info("=" * 60)
        logger.info("Rozpoczęcie triażu email")
        logger.info("=" * 60)

        try:
            # 1. Połączenie z Gmail
            self.gmail.connect()

            # 2. Pobranie nieprzeczytanych wiadomości
            emails = self.gmail.fetch_unread_emails(max_count=self.max_emails)
            if not emails:
                logger.info("Brak nowych wiadomości do przetworzenia")
                result.end_time = datetime.now()
                return result

            logger.info("Pobrano %d wiadomości do klasyfikacji", len(emails))

            # 3. Klasyfikacja każdej wiadomości
            for i, email_msg in enumerate(emails, 1):
                logger.info(
                    "Klasyfikacja [%d/%d]: %s",
                    i,
                    len(emails),
                    email_msg.subject[:60],
                )

                classified = self.classifier.classify(email_msg)
                classified_emails.append(classified)
                result.add(classified.category)

                # 4. Etykietowanie w Gmail
                if self.apply_labels and classified.category:
                    label = CATEGORIES[classified.category]["label"]
                    self.gmail.apply_label(classified.uid, label)

                # 5. Oznaczanie jako przeczytane (opcjonalnie)
                if self.mark_read:
                    self.gmail.mark_as_read(classified.uid)

                # Krótka przerwa między wywołaniami API
                time.sleep(0.5)

        except ConnectionError as e:
            error_msg = f"Błąd połączenia: {e}"
            logger.error(error_msg)
            result.errors.append(error_msg)

        except Exception as e:
            error_msg = f"Nieoczekiwany błąd: {e}"
            logger.error(error_msg, exc_info=True)
            result.errors.append(error_msg)

        finally:
            # 6. Rozłączenie z Gmail
            self.gmail.disconnect()

        result.end_time = datetime.now()

        # 7. Wysłanie podsumowania na Slack
        if self.slack and classified_emails:
            try:
                self.slack.send_triage_summary(classified_emails, result)
            except Exception as e:
                logger.error("Błąd wysyłania podsumowania na Slack: %s", e)
                result.errors.append(f"Błąd Slack: {e}")

        # 8. Logowanie podsumowania
        self._log_summary(result, classified_emails)

        return result

    def _log_summary(self, result: TriageResult, emails: list[EmailMessage]) -> None:
        """Loguje podsumowanie sesji triażu."""
        logger.info("=" * 60)
        logger.info("PODSUMOWANIE TRIAŻU")
        logger.info("=" * 60)
        logger.info("Przetworzono wiadomości: %d", result.total_processed)

        for cat_key, count in sorted(result.categories.items()):
            cat_info = CATEGORIES.get(cat_key, {})
            display = cat_info.get("display_name", cat_key)
            logger.info("  %s: %d", display, count)

        if result.errors:
            logger.warning("Błędy: %d", len(result.errors))
            for err in result.errors:
                logger.warning("  - %s", err)

        if result.start_time and result.end_time:
            duration = (result.end_time - result.start_time).total_seconds()
            logger.info("Czas przetwarzania: %.1f sekund", duration)

        logger.info("=" * 60)


# ---------------------------------------------------------------------------
# Konfiguracja i uruchomienie
# ---------------------------------------------------------------------------


def load_config() -> dict:
    """Ładuje konfigurację z pliku .env i zmiennych środowiskowych."""
    load_dotenv()

    config = {
        "anthropic_api_key": os.getenv("ANTHROPIC_API_KEY"),
        "gmail_address": os.getenv("GMAIL_ADDRESS"),
        "gmail_app_password": os.getenv("GMAIL_APP_PASSWORD"),
        "slack_webhook_url": os.getenv("SLACK_WEBHOOK_URL"),
        "max_emails": int(os.getenv("MAX_EMAILS", "50")),
        "apply_labels": os.getenv("APPLY_LABELS", "true").lower() == "true",
        "mark_read": os.getenv("MARK_READ", "false").lower() == "true",
        "claude_model": os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514"),
    }

    return config


def validate_config(config: dict) -> list[str]:
    """Waliduje konfigurację. Zwraca listę błędów."""
    errors = []

    if not config.get("anthropic_api_key"):
        errors.append("Brak ANTHROPIC_API_KEY - wymagany do klasyfikacji email")

    if not config.get("gmail_address"):
        errors.append("Brak GMAIL_ADDRESS - wymagany adres email Gmail")

    if not config.get("gmail_app_password"):
        errors.append(
            "Brak GMAIL_APP_PASSWORD - wymagane hasło aplikacji Gmail "
            "(wygeneruj na https://myaccount.google.com/apppasswords)"
        )

    return errors


def main():
    """Punkt wejścia aplikacji."""
    print("=" * 60)
    print("  AutomateForge.pl - Agent Triażu Email (MVP)")
    print("=" * 60)
    print()

    # Ładowanie konfiguracji
    config = load_config()

    # Walidacja
    errors = validate_config(config)
    if errors:
        print("Błędy konfiguracji:")
        for err in errors:
            print(f"  ✗ {err}")
        print()
        print("Utwórz plik .env na podstawie .env.example i uzupełnij dane.")
        sys.exit(1)

    # Inicjalizacja komponentów
    gmail = GmailClient(
        email_address=config["gmail_address"],
        app_password=config["gmail_app_password"],
    )

    classifier = EmailClassifier(
        api_key=config["anthropic_api_key"],
        model=config["claude_model"],
    )

    slack = None
    if config.get("slack_webhook_url"):
        slack = SlackNotifier(webhook_url=config["slack_webhook_url"])
    else:
        logger.warning("Brak SLACK_WEBHOOK_URL - podsumowania nie będą wysyłane na Slack")

    # Uruchomienie agenta
    agent = EmailTriageAgent(
        gmail_client=gmail,
        classifier=classifier,
        slack_notifier=slack,
        max_emails=config["max_emails"],
        apply_labels=config["apply_labels"],
        mark_read=config["mark_read"],
    )

    result = agent.run()

    # Kod wyjścia
    if result.errors:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
