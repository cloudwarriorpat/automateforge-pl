#!/usr/bin/env python3
"""
AutomateForge.pl - Generator Raportu Diagnostycznego
=====================================================

Narzędzie CLI do generowania profesjonalnych raportów diagnostycznych w formacie PDF
dla klientów AutomateForge.pl. Raport zawiera analizę obecnego stanu procesów,
możliwości automatyzacji oraz szacunkowy zwrot z inwestycji (ROI).

Autor: AutomateForge.pl
"""

import argparse
import os
import sys
from datetime import datetime
from io import BytesIO

try:
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
    from reportlab.lib.units import cm, mm
    from reportlab.platypus import (
        BaseDocTemplate,
        Frame,
        Image,
        NextPageTemplate,
        PageBreak,
        PageTemplate,
        Paragraph,
        SimpleDocTemplate,
        Spacer,
        Table,
        TableStyle,
    )
except ImportError:
    print("Błąd: Brak biblioteki reportlab. Zainstaluj ją poleceniem:")
    print("  pip install reportlab>=4.0")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Stałe i konfiguracja
# ---------------------------------------------------------------------------

BRAND_PRIMARY = colors.HexColor("#1a56db")
BRAND_SECONDARY = colors.HexColor("#0e9f6e")
BRAND_DARK = colors.HexColor("#1f2937")
BRAND_LIGHT = colors.HexColor("#f3f4f6")
BRAND_ACCENT = colors.HexColor("#ff5a1f")

PAGE_WIDTH, PAGE_HEIGHT = A4

# Szacunkowe parametry ROI (konfigurowalne)
HOURLY_RATE_PLN = 80  # średni koszt godziny pracy pracownika
AUTOMATION_EFFICIENCY = {
    "ksef": {"hours_saved_monthly": 20, "error_reduction_pct": 90},
    "invoicing": {"hours_saved_monthly": 15, "error_reduction_pct": 85},
    "document_management": {"hours_saved_monthly": 25, "error_reduction_pct": 75},
    "email_triage": {"hours_saved_monthly": 10, "error_reduction_pct": 70},
    "reporting": {"hours_saved_monthly": 12, "error_reduction_pct": 80},
}

PACKAGES = {
    "starter": {
        "name": "Starter",
        "price": "2 500 PLN/mies.",
        "features": [
            "Integracja z KSeF (wysyłka/odbiór)",
            "Podstawowa automatyzacja faktur",
            "Dashboard monitoringu",
            "Wsparcie email 48h",
        ],
    },
    "professional": {
        "name": "Professional",
        "price": "5 500 PLN/mies.",
        "features": [
            "Wszystko z pakietu Starter",
            "Agent triażu email",
            "Automatyzacja obiegu dokumentów",
            "Raportowanie i analityka",
            "Wsparcie priorytetowe 24h",
        ],
    },
    "enterprise": {
        "name": "Enterprise",
        "price": "Indywidualnie",
        "features": [
            "Wszystko z pakietu Professional",
            "Dedykowane agenty AI",
            "Integracje z dowolnym ERP",
            "SLA 99.9%",
            "Dedykowany opiekun",
            "Szkolenia dla zespołu",
        ],
    },
}


# ---------------------------------------------------------------------------
# Style dokumentu
# ---------------------------------------------------------------------------


def get_styles():
    """Zwraca słownik stylów używanych w raporcie."""
    styles = getSampleStyleSheet()

    styles.add(
        ParagraphStyle(
            name="ReportTitle",
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=34,
            textColor=BRAND_PRIMARY,
            alignment=TA_LEFT,
            spaceAfter=6 * mm,
        )
    )

    styles.add(
        ParagraphStyle(
            name="ReportSubtitle",
            fontName="Helvetica",
            fontSize=14,
            leading=18,
            textColor=BRAND_DARK,
            alignment=TA_LEFT,
            spaceAfter=12 * mm,
        )
    )

    styles.add(
        ParagraphStyle(
            name="SectionHeading",
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=24,
            textColor=BRAND_PRIMARY,
            spaceBefore=10 * mm,
            spaceAfter=4 * mm,
            borderWidth=0,
            borderPadding=0,
        )
    )

    styles.add(
        ParagraphStyle(
            name="SubHeading",
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=BRAND_DARK,
            spaceBefore=6 * mm,
            spaceAfter=3 * mm,
        )
    )

    styles.add(
        ParagraphStyle(
            name="BodyTextCustom",
            fontName="Helvetica",
            fontSize=10,
            leading=15,
            textColor=BRAND_DARK,
            alignment=TA_JUSTIFY,
            spaceAfter=3 * mm,
        )
    )

    styles.add(
        ParagraphStyle(
            name="BulletItem",
            fontName="Helvetica",
            fontSize=10,
            leading=15,
            textColor=BRAND_DARK,
            leftIndent=10 * mm,
            spaceAfter=2 * mm,
            bulletIndent=4 * mm,
        )
    )

    styles.add(
        ParagraphStyle(
            name="FooterStyle",
            fontName="Helvetica",
            fontSize=8,
            leading=10,
            textColor=colors.gray,
            alignment=TA_CENTER,
        )
    )

    styles.add(
        ParagraphStyle(
            name="HighlightBox",
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=16,
            textColor=BRAND_PRIMARY,
            backColor=BRAND_LIGHT,
            borderWidth=1,
            borderColor=BRAND_PRIMARY,
            borderPadding=8,
            spaceAfter=4 * mm,
            spaceBefore=4 * mm,
        )
    )

    styles.add(
        ParagraphStyle(
            name="TableHeader",
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=colors.white,
            alignment=TA_CENTER,
        )
    )

    styles.add(
        ParagraphStyle(
            name="TableCell",
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BRAND_DARK,
            alignment=TA_LEFT,
        )
    )

    styles.add(
        ParagraphStyle(
            name="TableCellCenter",
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=BRAND_DARK,
            alignment=TA_CENTER,
        )
    )

    return styles


# ---------------------------------------------------------------------------
# Nagłówek i stopka strony
# ---------------------------------------------------------------------------


def header_footer(canvas, doc):
    """Rysuje nagłówek i stopkę na każdej stronie."""
    canvas.saveState()

    # Nagłówek - linia
    canvas.setStrokeColor(BRAND_PRIMARY)
    canvas.setLineWidth(2)
    canvas.line(2 * cm, PAGE_HEIGHT - 1.5 * cm, PAGE_WIDTH - 2 * cm, PAGE_HEIGHT - 1.5 * cm)

    # Nagłówek - tekst
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(BRAND_PRIMARY)
    canvas.drawString(2 * cm, PAGE_HEIGHT - 1.3 * cm, "AutomateForge.pl")

    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.gray)
    canvas.drawRightString(
        PAGE_WIDTH - 2 * cm,
        PAGE_HEIGHT - 1.3 * cm,
        "Raport Diagnostyczny - Poufne",
    )

    # Stopka - linia
    canvas.setStrokeColor(BRAND_LIGHT)
    canvas.setLineWidth(1)
    canvas.line(2 * cm, 1.5 * cm, PAGE_WIDTH - 2 * cm, 1.5 * cm)

    # Stopka - tekst
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.gray)
    canvas.drawString(
        2 * cm,
        1.0 * cm,
        f"Wygenerowano: {datetime.now().strftime('%d.%m.%Y %H:%M')}",
    )
    canvas.drawRightString(
        PAGE_WIDTH - 2 * cm,
        1.0 * cm,
        f"Strona {doc.page}",
    )
    canvas.drawCentredString(
        PAGE_WIDTH / 2,
        1.0 * cm,
        "automateforge.pl | kontakt@automateforge.pl",
    )

    canvas.restoreState()


# ---------------------------------------------------------------------------
# Budowanie zawartości raportu
# ---------------------------------------------------------------------------


def build_cover_page(styles, company_name, contact_person):
    """Buduje stronę tytułową raportu."""
    elements = []

    elements.append(Spacer(1, 4 * cm))

    elements.append(
        Paragraph("RAPORT DIAGNOSTYCZNY", styles["ReportTitle"])
    )
    elements.append(
        Paragraph(
            "Analiza procesów i możliwości automatyzacji",
            styles["ReportSubtitle"],
        )
    )

    elements.append(Spacer(1, 1 * cm))

    # Informacje o kliencie w tabeli
    info_data = [
        ["Firma:", company_name],
        ["Osoba kontaktowa:", contact_person],
        ["Data raportu:", datetime.now().strftime("%d.%m.%Y")],
        ["Przygotował:", "AutomateForge.pl"],
        ["Status:", "POUFNE"],
    ]

    info_table = Table(info_data, colWidths=[5 * cm, 10 * cm])
    info_table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 11),
                ("TEXTCOLOR", (0, 0), (0, -1), BRAND_PRIMARY),
                ("TEXTCOLOR", (1, 0), (1, -1), BRAND_DARK),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("LINEBELOW", (0, 0), (-1, -2), 0.5, BRAND_LIGHT),
                ("LINEBELOW", (0, -1), (-1, -1), 1, BRAND_PRIMARY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )

    elements.append(info_table)
    elements.append(Spacer(1, 2 * cm))

    disclaimer = (
        "Niniejszy raport został przygotowany na podstawie informacji "
        "przekazanych przez klienta podczas rozmowy diagnostycznej. "
        "Zawarte szacunki ROI opierają się na danych rynkowych i doświadczeniu "
        "zespołu AutomateForge.pl. Rzeczywiste wyniki mogą się różnić "
        "w zależności od specyfiki wdrożenia."
    )
    elements.append(Paragraph(disclaimer, styles["BodyTextCustom"]))

    elements.append(PageBreak())
    return elements


def build_company_overview(styles, company_name, systems, invoice_volume, pain_points):
    """Sekcja: Przegląd firmy i obecnego stanu."""
    elements = []

    elements.append(Paragraph("1. Przegląd firmy", styles["SectionHeading"]))

    overview_text = (
        f"Firma <b>{company_name}</b> zgłosiła się do AutomateForge.pl "
        f"w celu przeprowadzenia analizy możliwości automatyzacji procesów "
        f"biznesowych. Poniżej przedstawiamy podsumowanie obecnego stanu "
        f"operacyjnego firmy."
    )
    elements.append(Paragraph(overview_text, styles["BodyTextCustom"]))

    # Tabela z danymi firmy
    elements.append(Paragraph("Kluczowe parametry operacyjne", styles["SubHeading"]))

    systems_str = ", ".join(systems) if systems else "Brak danych"
    pain_points_str = ", ".join(pain_points) if pain_points else "Brak danych"

    overview_data = [
        [
            Paragraph("Parametr", styles["TableHeader"]),
            Paragraph("Wartość", styles["TableHeader"]),
        ],
        [
            Paragraph("Wykorzystywane systemy", styles["TableCell"]),
            Paragraph(systems_str, styles["TableCell"]),
        ],
        [
            Paragraph("Miesięczny wolumen faktur", styles["TableCell"]),
            Paragraph(str(invoice_volume), styles["TableCellCenter"]),
        ],
        [
            Paragraph("Główne problemy", styles["TableCell"]),
            Paragraph(pain_points_str, styles["TableCell"]),
        ],
    ]

    overview_table = Table(overview_data, colWidths=[6 * cm, 10 * cm])
    overview_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND_PRIMARY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("ALIGN", (0, 0), (-1, 0), "CENTER"),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BRAND_LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )

    elements.append(overview_table)
    elements.append(Spacer(1, 5 * mm))

    return elements


def build_current_state_assessment(styles, systems, pain_points, invoice_volume):
    """Sekcja: Ocena obecnego stanu."""
    elements = []

    elements.append(
        Paragraph("2. Ocena obecnego stanu procesów", styles["SectionHeading"])
    )

    intro_text = (
        "Na podstawie przeprowadzonej rozmowy diagnostycznej zidentyfikowaliśmy "
        "następujące obszary wymagające uwagi:"
    )
    elements.append(Paragraph(intro_text, styles["BodyTextCustom"]))

    # Analiza systemów
    elements.append(Paragraph("Infrastruktura IT", styles["SubHeading"]))

    if systems:
        for system in systems:
            elements.append(
                Paragraph(
                    f"&#8226; <b>{system}</b> - wykorzystywany w bieżących procesach",
                    styles["BulletItem"],
                )
            )
    else:
        elements.append(
            Paragraph(
                "Nie przekazano informacji o wykorzystywanych systemach.",
                styles["BodyTextCustom"],
            )
        )

    # Analiza problemów
    elements.append(Paragraph("Zidentyfikowane problemy", styles["SubHeading"]))

    pain_point_descriptions = {
        "ręczne fakturowanie": (
            "Ręczne wystawianie i przetwarzanie faktur generuje ryzyko błędów "
            "oraz wymaga znacznych nakładów czasu pracowników."
        ),
        "brak integracji ksef": (
            "Brak integracji z Krajowym Systemem e-Faktur (KSeF) — od 2026 roku "
            "obowiązkowy dla wszystkich przedsiębiorców. Konieczne pilne wdrożenie."
        ),
        "chaos w dokumentach": (
            "Rozproszone zarządzanie dokumentami utrudnia wyszukiwanie, "
            "generuje duplikaty i spowalnia procesy decyzyjne."
        ),
        "za dużo maili": (
            "Przeciążenie skrzynki pocztowej powoduje opóźnienia w reakcji "
            "na pilne sprawy i utratę ważnych wiadomości."
        ),
        "brak raportowania": (
            "Brak automatycznego raportowania uniemożliwia bieżący wgląd "
            "w kluczowe wskaźniki operacyjne firmy."
        ),
        "wolne procesy": (
            "Nieefektywne procesy manualne spowalniają operacje firmy "
            "i zwiększają koszty operacyjne."
        ),
    }

    if pain_points:
        for pp in pain_points:
            pp_lower = pp.lower().strip()
            description = pain_point_descriptions.get(
                pp_lower,
                f"Problem '{pp}' wymaga szczegółowej analizy i opracowania "
                f"dedykowanego rozwiązania automatyzacyjnego.",
            )
            elements.append(
                Paragraph(f"&#8226; <b>{pp}</b>", styles["BulletItem"])
            )
            elements.append(Paragraph(description, styles["BodyTextCustom"]))
    else:
        elements.append(
            Paragraph(
                "Nie zidentyfikowano konkretnych problemów podczas rozmowy.",
                styles["BodyTextCustom"],
            )
        )

    # Ocena wolumenu faktur
    elements.append(Paragraph("Ocena wolumenu faktur", styles["SubHeading"]))

    if invoice_volume < 50:
        vol_assessment = (
            f"Przy wolumenie {invoice_volume} faktur miesięcznie firma "
            f"znajduje się w segmencie małego wolumenu. Automatyzacja przyniesie "
            f"korzyści głównie w zakresie eliminacji błędów i zgodności z KSeF."
        )
    elif invoice_volume < 200:
        vol_assessment = (
            f"Wolumen {invoice_volume} faktur miesięcznie plasuje firmę "
            f"w segmencie średnim. Automatyzacja przyniesie znaczące oszczędności "
            f"czasu i redukcję kosztów operacyjnych."
        )
    else:
        vol_assessment = (
            f"Przy wolumenie {invoice_volume} faktur miesięcznie firma "
            f"znajduje się w segmencie dużego wolumenu. Automatyzacja jest "
            f"krytyczna dla utrzymania efektywności operacyjnej i jest "
            f"bezwzględnie rekomendowana."
        )

    elements.append(Paragraph(vol_assessment, styles["BodyTextCustom"]))

    return elements


def build_automation_opportunities(styles, pain_points, invoice_volume):
    """Sekcja: Możliwości automatyzacji."""
    elements = []

    elements.append(
        Paragraph("3. Możliwości automatyzacji", styles["SectionHeading"])
    )

    intro = (
        "Na podstawie przeprowadzonej analizy rekomendujemy następujące "
        "rozwiązania automatyzacyjne:"
    )
    elements.append(Paragraph(intro, styles["BodyTextCustom"]))

    # KSeF
    elements.append(
        Paragraph("Integracja z KSeF (Krajowy System e-Faktur)", styles["SubHeading"])
    )
    ksef_text = (
        "Krajowy System e-Faktur staje się obowiązkowy dla wszystkich "
        "przedsiębiorców. AutomateForge.pl oferuje pełną integrację z KSeF, "
        "obejmującą:"
    )
    elements.append(Paragraph(ksef_text, styles["BodyTextCustom"]))

    ksef_features = [
        "Automatyczne wysyłanie faktur sprzedażowych do KSeF",
        "Pobieranie i przetwarzanie faktur zakupowych z KSeF",
        "Walidacja danych przed wysyłką (NIP, kwoty, daty)",
        "Archiwizacja i raportowanie statusów faktur",
        "Integracja z istniejącym systemem ERP/księgowym",
    ]
    for feature in ksef_features:
        elements.append(
            Paragraph(f"&#8226; {feature}", styles["BulletItem"])
        )

    # Automatyzacja fakturowania
    elements.append(
        Paragraph("Automatyzacja procesów fakturowania", styles["SubHeading"])
    )
    inv_text = (
        f"Przy wolumenie {invoice_volume} faktur miesięcznie automatyzacja "
        f"procesu fakturowania pozwoli na:"
    )
    elements.append(Paragraph(inv_text, styles["BodyTextCustom"]))

    inv_features = [
        "Automatyczne generowanie faktur na podstawie zamówień",
        "OCR i ekstrakcja danych z faktur przychodzących",
        "Automatyczne księgowanie i kategoryzacja",
        "Powiadomienia o terminach płatności",
        "Automatyczne monitory i wezwania do zapłaty",
    ]
    for feature in inv_features:
        elements.append(
            Paragraph(f"&#8226; {feature}", styles["BulletItem"])
        )

    # Zarządzanie dokumentami
    elements.append(
        Paragraph("Inteligentne zarządzanie dokumentami", styles["SubHeading"])
    )
    doc_text = (
        "System automatycznego zarządzania dokumentami oparty na AI, "
        "który eliminuje chaos dokumentowy:"
    )
    elements.append(Paragraph(doc_text, styles["BodyTextCustom"]))

    doc_features = [
        "Automatyczna klasyfikacja i tagowanie dokumentów",
        "Inteligentne wyszukiwanie pełnotekstowe",
        "Automatyczne workflow zatwierdzania",
        "Wersjonowanie i historia zmian",
        "Bezpieczne przechowywanie w chmurze",
    ]
    for feature in doc_features:
        elements.append(
            Paragraph(f"&#8226; {feature}", styles["BulletItem"])
        )

    # Agent email (jeśli jest taki problem)
    pain_lower = [p.lower().strip() for p in pain_points] if pain_points else []
    if any("mail" in p or "email" in p for p in pain_lower):
        elements.append(
            Paragraph("Agent triażu email (AI)", styles["SubHeading"])
        )
        email_text = (
            "Inteligentny agent AI do automatycznej klasyfikacji i priorytetyzacji "
            "wiadomości email:"
        )
        elements.append(Paragraph(email_text, styles["BodyTextCustom"]))

        email_features = [
            "Automatyczna klasyfikacja: pilne, faktury, wsparcie, spam, newsletter",
            "Priorytetyzacja na podstawie treści i nadawcy",
            "Automatyczne odpowiedzi na typowe zapytania",
            "Podsumowanie dzienne na Slack/Teams",
            "Eskalacja pilnych spraw do odpowiednich osób",
        ]
        for feature in email_features:
            elements.append(
                Paragraph(f"&#8226; {feature}", styles["BulletItem"])
            )

    return elements


def build_roi_estimation(styles, invoice_volume, pain_points):
    """Sekcja: Szacunkowy ROI."""
    elements = []

    elements.append(
        Paragraph("4. Szacunkowy zwrot z inwestycji (ROI)", styles["SectionHeading"])
    )

    intro = (
        "Poniższe szacunki opierają się na danych rynkowych oraz doświadczeniu "
        "zespołu AutomateForge.pl z podobnych wdrożeń. Rzeczywiste wyniki mogą "
        "się różnić w zależności od specyfiki organizacji."
    )
    elements.append(Paragraph(intro, styles["BodyTextCustom"]))

    # Kalkulacja ROI
    applicable_areas = ["ksef", "invoicing"]  # Zawsze rekomendowane

    pain_lower = [p.lower().strip() for p in pain_points] if pain_points else []
    if any("dokument" in p or "chaos" in p for p in pain_lower):
        applicable_areas.append("document_management")
    if any("mail" in p or "email" in p for p in pain_lower):
        applicable_areas.append("email_triage")
    if any("raport" in p for p in pain_lower):
        applicable_areas.append("reporting")

    # Skalowanie na podstawie wolumenu
    volume_multiplier = max(1.0, invoice_volume / 100)

    area_names = {
        "ksef": "Integracja KSeF",
        "invoicing": "Automatyzacja faktur",
        "document_management": "Zarządzanie dokumentami",
        "email_triage": "Triaż email",
        "reporting": "Raportowanie",
    }

    roi_data = [
        [
            Paragraph("Obszar", styles["TableHeader"]),
            Paragraph("Godz./mies.", styles["TableHeader"]),
            Paragraph("Oszczędność PLN/mies.", styles["TableHeader"]),
            Paragraph("Redukcja błędów", styles["TableHeader"]),
        ]
    ]

    total_hours = 0
    total_savings = 0

    for area in applicable_areas:
        params = AUTOMATION_EFFICIENCY[area]
        hours = round(params["hours_saved_monthly"] * min(volume_multiplier, 3), 1)
        savings = round(hours * HOURLY_RATE_PLN)
        error_reduction = params["error_reduction_pct"]

        total_hours += hours
        total_savings += savings

        roi_data.append(
            [
                Paragraph(area_names[area], styles["TableCell"]),
                Paragraph(f"{hours}", styles["TableCellCenter"]),
                Paragraph(f"{savings:,} PLN".replace(",", " "), styles["TableCellCenter"]),
                Paragraph(f"{error_reduction}%", styles["TableCellCenter"]),
            ]
        )

    # Wiersz sumaryczny
    roi_data.append(
        [
            Paragraph("<b>RAZEM</b>", styles["TableCell"]),
            Paragraph(f"<b>{total_hours}</b>", styles["TableCellCenter"]),
            Paragraph(
                f"<b>{total_savings:,} PLN</b>".replace(",", " "),
                styles["TableCellCenter"],
            ),
            Paragraph("<b>-</b>", styles["TableCellCenter"]),
        ]
    )

    roi_table = Table(roi_data, colWidths=[5.5 * cm, 3 * cm, 4.5 * cm, 3 * cm])
    roi_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND_PRIMARY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
                ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, BRAND_LIGHT]),
                ("BACKGROUND", (0, -1), (-1, -1), BRAND_LIGHT),
                ("LINEABOVE", (0, -1), (-1, -1), 1.5, BRAND_PRIMARY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )

    elements.append(roi_table)
    elements.append(Spacer(1, 5 * mm))

    # Podsumowanie ROI
    annual_savings = total_savings * 12
    highlight_text = (
        f"Szacunkowa roczna oszczędność: {annual_savings:,} PLN | "
        f"Oszczędność czasu: {total_hours:.0f} godzin miesięcznie"
    ).replace(",", " ")

    elements.append(Paragraph(highlight_text, styles["HighlightBox"]))

    return elements


def build_recommended_packages(styles, invoice_volume, pain_points):
    """Sekcja: Rekomendowane pakiety."""
    elements = []

    elements.append(
        Paragraph("5. Rekomendowane pakiety", styles["SectionHeading"])
    )

    intro = (
        "Na podstawie przeprowadzonej analizy rekomendujemy następujące "
        "pakiety usług AutomateForge.pl:"
    )
    elements.append(Paragraph(intro, styles["BodyTextCustom"]))

    # Określenie rekomendowanego pakietu
    pain_count = len(pain_points) if pain_points else 0
    if invoice_volume > 200 or pain_count > 3:
        recommended = "enterprise"
    elif invoice_volume > 50 or pain_count > 1:
        recommended = "professional"
    else:
        recommended = "starter"

    for key, pkg in PACKAGES.items():
        is_recommended = key == recommended
        prefix = "*** REKOMENDOWANY *** " if is_recommended else ""

        heading_style = styles["SubHeading"]
        elements.append(
            Paragraph(f"{prefix}Pakiet {pkg['name']} - {pkg['price']}", heading_style)
        )

        for feature in pkg["features"]:
            bullet_style = styles["BulletItem"]
            elements.append(
                Paragraph(f"&#8226; {feature}", bullet_style)
            )

        if is_recommended:
            rec_text = (
                f"<b>Ten pakiet jest rekomendowany</b> na podstawie analizy "
                f"potrzeb Państwa firmy i zidentyfikowanych obszarów do automatyzacji."
            )
            elements.append(Paragraph(rec_text, styles["HighlightBox"]))

        elements.append(Spacer(1, 3 * mm))

    return elements


def build_next_steps(styles):
    """Sekcja: Następne kroki."""
    elements = []

    elements.append(Paragraph("6. Następne kroki", styles["SectionHeading"]))

    intro = (
        "Aby rozpocząć proces automatyzacji, proponujemy następujący plan działania:"
    )
    elements.append(Paragraph(intro, styles["BodyTextCustom"]))

    steps = [
        (
            "Spotkanie omawiające raport (tydzień 1)",
            "Omówienie wyników diagnozy, doprecyzowanie priorytetów i wybór pakietu.",
        ),
        (
            "Podpisanie umowy i kick-off (tydzień 2)",
            "Formalizacja współpracy, ustalenie harmonogramu i przydzielenie zespołu.",
        ),
        (
            "Audyt techniczny (tydzień 2-3)",
            "Szczegółowa analiza systemów IT, dostępów i integracji.",
        ),
        (
            "Konfiguracja środowiska sandbox (tydzień 3-4)",
            "Przygotowanie środowiska testowego KSeF i pozostałych narzędzi.",
        ),
        (
            "Wdrożenie pilotażowe (tydzień 4-6)",
            "Uruchomienie automatyzacji na wybranym procesie pilotażowym.",
        ),
        (
            "Szkolenie zespołu (tydzień 6-7)",
            "Przeszkolenie pracowników z obsługi nowych narzędzi.",
        ),
        (
            "Go-live i monitoring (tydzień 8)",
            "Pełne uruchomienie produkcyjne z aktywnym monitoringiem.",
        ),
    ]

    step_data = [
        [
            Paragraph("Krok", styles["TableHeader"]),
            Paragraph("Etap", styles["TableHeader"]),
            Paragraph("Opis", styles["TableHeader"]),
        ]
    ]

    for i, (step_name, step_desc) in enumerate(steps, 1):
        step_data.append(
            [
                Paragraph(f"{i}", styles["TableCellCenter"]),
                Paragraph(f"<b>{step_name}</b>", styles["TableCell"]),
                Paragraph(step_desc, styles["TableCell"]),
            ]
        )

    step_table = Table(step_data, colWidths=[1.5 * cm, 5.5 * cm, 9 * cm])
    step_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), BRAND_PRIMARY),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.lightgrey),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, BRAND_LIGHT]),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        )
    )

    elements.append(step_table)
    elements.append(Spacer(1, 8 * mm))

    # Kontakt
    elements.append(Paragraph("Kontakt", styles["SubHeading"]))

    contact_text = (
        "Zapraszamy do kontaktu w celu omówienia raportu i rozpoczęcia współpracy:<br/><br/>"
        "<b>AutomateForge.pl</b><br/>"
        "Email: kontakt@automateforge.pl<br/>"
        "Strona: https://automateforge.pl<br/><br/>"
        "Dziękujemy za zainteresowanie naszymi usługami!"
    )
    elements.append(Paragraph(contact_text, styles["BodyTextCustom"]))

    return elements


# ---------------------------------------------------------------------------
# Główna funkcja generowania PDF
# ---------------------------------------------------------------------------


def generate_report(
    company_name: str,
    contact_person: str,
    systems: list[str],
    invoice_volume: int,
    pain_points: list[str],
    output_path: str | None = None,
) -> str:
    """
    Generuje kompletny raport diagnostyczny w formacie PDF.

    Args:
        company_name: Nazwa firmy klienta.
        contact_person: Osoba kontaktowa po stronie klienta.
        systems: Lista wykorzystywanych systemów (np. ['SAP', 'Excel']).
        invoice_volume: Miesięczny wolumen faktur.
        pain_points: Lista zidentyfikowanych problemów.
        output_path: Ścieżka wyjściowa PDF (opcjonalna).

    Returns:
        Ścieżka do wygenerowanego pliku PDF.
    """
    if output_path is None:
        safe_name = company_name.replace(" ", "_").replace("/", "_")
        date_str = datetime.now().strftime("%Y%m%d")
        output_path = f"raport_diagnostyczny_{safe_name}_{date_str}.pdf"

    styles = get_styles()

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        topMargin=2.2 * cm,
        bottomMargin=2 * cm,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        title=f"Raport Diagnostyczny - {company_name}",
        author="AutomateForge.pl",
        subject="Analiza procesów i możliwości automatyzacji",
    )

    # Budujemy zawartość
    elements = []

    elements.extend(build_cover_page(styles, company_name, contact_person))
    elements.extend(
        build_company_overview(styles, company_name, systems, invoice_volume, pain_points)
    )
    elements.extend(
        build_current_state_assessment(styles, systems, pain_points, invoice_volume)
    )
    elements.extend(PageBreak().__class__([PageBreak()]))
    elements.extend(
        build_automation_opportunities(styles, pain_points, invoice_volume)
    )
    elements.extend(PageBreak().__class__([PageBreak()]))
    elements.extend(build_roi_estimation(styles, invoice_volume, pain_points))
    elements.extend(build_recommended_packages(styles, invoice_volume, pain_points))
    elements.extend(PageBreak().__class__([PageBreak()]))
    elements.extend(build_next_steps(styles))

    # Generujemy PDF
    doc.build(elements, onFirstPage=header_footer, onLaterPages=header_footer)

    return output_path


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def parse_csv_arg(value: str) -> list[str]:
    """Parsuje argument CSV do listy stringów."""
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


def main():
    parser = argparse.ArgumentParser(
        description="AutomateForge.pl - Generator Raportu Diagnostycznego",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Przykłady użycia:
  %(prog)s --company "Firma ABC" --contact "Jan Kowalski" --systems "SAP,Excel" --invoices 150 --pain-points "ręczne fakturowanie,brak integracji KSeF"
  %(prog)s -c "XYZ Sp. z o.o." -p "Anna Nowak" -s "Comarch ERP,Outlook" -i 80 -pp "chaos w dokumentach,za dużo maili" -o raport_xyz.pdf
        """,
    )

    parser.add_argument(
        "-c",
        "--company",
        required=True,
        help="Nazwa firmy klienta",
    )

    parser.add_argument(
        "-p",
        "--contact",
        "--contact-person",
        required=True,
        help="Imię i nazwisko osoby kontaktowej",
    )

    parser.add_argument(
        "-s",
        "--systems",
        default="",
        help="Wykorzystywane systemy (oddzielone przecinkami), np. 'SAP,Excel,Outlook'",
    )

    parser.add_argument(
        "-i",
        "--invoices",
        "--invoice-volume",
        type=int,
        default=100,
        help="Miesięczny wolumen faktur (domyślnie: 100)",
    )

    parser.add_argument(
        "-pp",
        "--pain-points",
        default="",
        help="Problemy klienta (oddzielone przecinkami), np. 'ręczne fakturowanie,brak integracji KSeF'",
    )

    parser.add_argument(
        "-o",
        "--output",
        default=None,
        help="Ścieżka do pliku wyjściowego PDF (domyślnie: raport_diagnostyczny_<firma>_<data>.pdf)",
    )

    args = parser.parse_args()

    systems = parse_csv_arg(args.systems)
    pain_points = parse_csv_arg(args.pain_points)

    print(f"{'=' * 60}")
    print(f"  AutomateForge.pl - Generator Raportu Diagnostycznego")
    print(f"{'=' * 60}")
    print(f"  Firma:           {args.company}")
    print(f"  Kontakt:         {args.contact}")
    print(f"  Systemy:         {', '.join(systems) if systems else 'brak danych'}")
    print(f"  Wolumen faktur:  {args.invoices}/mies.")
    print(f"  Problemy:        {', '.join(pain_points) if pain_points else 'brak danych'}")
    print(f"{'=' * 60}")
    print()

    try:
        output_path = generate_report(
            company_name=args.company,
            contact_person=args.contact,
            systems=systems,
            invoice_volume=args.invoices,
            pain_points=pain_points,
            output_path=args.output,
        )
        print(f"Raport wygenerowany pomyślnie!")
        print(f"Plik: {os.path.abspath(output_path)}")
    except Exception as e:
        print(f"Błąd podczas generowania raportu: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
