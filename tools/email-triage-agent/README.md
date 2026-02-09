# Agent Triażu Email (MVP)

Inteligentny agent AI do automatycznej klasyfikacji i priorytetyzacji wiadomości email
dla klientów AutomateForge.pl.

## Opis

Agent łączy się z Gmail przez IMAP, pobiera nieprzeczytane wiadomości, klasyfikuje je
przy użyciu Anthropic Claude API, etykietuje w Gmail i wysyła podsumowanie na Slack.

### Kategorie klasyfikacji

| Kategoria | Opis | Priorytet |
|-----------|------|-----------|
| **urgent** | Pilne sprawy wymagające natychmiastowej reakcji | 1 (najwyższy) |
| **invoice** | Faktury, rachunki, dokumenty finansowe | 2 |
| **support** | Prośby o pomoc techniczną, zgłoszenia | 3 |
| **other** | Inne wiadomości | 4 |
| **newsletter** | Newslettery, mailingi | 5 |
| **spam** | Niechciane reklamy, phishing | 6 (najniższy) |

## Wymagania

- Python 3.10+
- Konto Gmail z włączonym hasłem aplikacji (App Password)
- Klucz API Anthropic
- (Opcjonalnie) Webhook Slack

## Instalacja

```bash
cd tools/email-triage-agent
pip install -r requirements.txt
```

## Konfiguracja

### 1. Przygotowanie pliku .env

```bash
cp .env.example .env
```

Uzupełnij plik `.env` swoimi danymi:

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
GMAIL_ADDRESS=twoj-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T.../B.../...
```

### 2. Hasło aplikacji Gmail

Aby agent mógł łączyć się z Gmail przez IMAP, potrzebujesz hasła aplikacji:

1. Przejdź do [Ustawień konta Google](https://myaccount.google.com/apppasswords)
2. Włącz weryfikację dwuetapową (jeśli nie jest włączona)
3. Wygeneruj hasło aplikacji dla "Poczta"
4. Wklej wygenerowane hasło do `.env` jako `GMAIL_APP_PASSWORD`

### 3. Webhook Slack (opcjonalnie)

1. Przejdź do [Slack API](https://api.slack.com/apps)
2. Utwórz nową aplikację lub wybierz istniejącą
3. Dodaj "Incoming Webhooks"
4. Utwórz webhook dla wybranego kanału
5. Wklej URL do `.env` jako `SLACK_WEBHOOK_URL`

## Użycie

### Jednorazowe uruchomienie

```bash
python main.py
```

### Zmienne środowiskowe (opcjonalne)

| Zmienna | Domyślna | Opis |
|---------|----------|------|
| `MAX_EMAILS` | `50` | Maks. liczba wiadomości do przetworzenia |
| `APPLY_LABELS` | `true` | Czy stosować etykiety w Gmail |
| `MARK_READ` | `false` | Czy oznaczać przetworzone wiadomości jako przeczytane |
| `CLAUDE_MODEL` | `claude-sonnet-4-20250514` | Model Claude do klasyfikacji |

### Uruchomienie cykliczne (cron)

Dodaj do crontab (`crontab -e`):

```cron
# Co 15 minut w godzinach pracy
*/15 8-18 * * 1-5 cd /path/to/email-triage-agent && /usr/bin/python3 main.py
```

## Jak to działa

1. **Połączenie** - Agent łączy się z Gmail przez bezpieczne połączenie IMAP SSL
2. **Pobranie** - Pobiera nieprzeczytane wiadomości z INBOX (do limitu MAX_EMAILS)
3. **Klasyfikacja** - Każda wiadomość jest analizowana przez Claude API
4. **Etykietowanie** - Wiadomości otrzymują etykiety `AutoForge/KATEGORIA` w Gmail
5. **Raportowanie** - Podsumowanie jest wysyłane na kanał Slack
6. **Logowanie** - Wszystkie akcje są zapisywane w pliku `email_triage.log`

## Etykiety Gmail

Agent tworzy etykiety z prefiksem `AutoForge/`:

- `AutoForge/URGENT`
- `AutoForge/INVOICE`
- `AutoForge/SUPPORT`
- `AutoForge/SPAM`
- `AutoForge/NEWSLETTER`
- `AutoForge/OTHER`

## Logowanie

Logi są zapisywane w dwóch miejscach:
- **Konsola** (stdout) - bieżące informacje o przetwarzaniu
- **Plik** `email_triage.log` - pełna historia operacji

## Bezpieczeństwo

- Hasła i klucze API przechowywane wyłącznie w `.env` (nigdy w kodzie)
- Plik `.env` powinien być dodany do `.gitignore`
- Treść wiadomości jest skracana przed wysyłką do API (max 2000 znaków)
- Połączenie IMAP jest szyfrowane (SSL)

## Struktura plików

```
tools/email-triage-agent/
├── main.py              # Główny skrypt agenta
├── requirements.txt     # Zależności Python
├── .env.example         # Przykładowa konfiguracja
├── .env                 # Konfiguracja (nie commitować!)
├── email_triage.log     # Log operacji (tworzony automatycznie)
└── README.md            # Ten plik
```

## Rozwój

Planowane rozszerzenia:
- Obsługa Google API (zamiast IMAP) dla lepszej kontroli etykiet
- Automatyczne odpowiedzi na typowe zapytania
- Dashboard webowy z historią klasyfikacji
- Uczenie się na podstawie korekt użytkownika
- Obsługa wielu skrzynek pocztowych
- Integracja z Microsoft Outlook / Office 365
