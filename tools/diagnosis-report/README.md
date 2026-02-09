# Generator Raportu Diagnostycznego

Narzędzie CLI do generowania profesjonalnych raportów diagnostycznych w formacie PDF
dla klientów AutomateForge.pl.

## Opis

Raport diagnostyczny jest pierwszym krokiem w procesie współpracy z klientem.
Na podstawie danych zebranych podczas rozmowy diagnostycznej, narzędzie generuje
kompletny dokument PDF zawierający:

- **Przegląd firmy** - podsumowanie kluczowych parametrów operacyjnych
- **Ocena obecnego stanu** - analiza systemów, procesów i zidentyfikowanych problemów
- **Możliwości automatyzacji** - rekomendowane rozwiązania (KSeF, fakturowanie, dokumenty, email)
- **Szacunkowy ROI** - przewidywane oszczędności czasu i kosztów
- **Rekomendowane pakiety** - propozycja pakietu dopasowanego do potrzeb klienta
- **Następne kroki** - harmonogram wdrożenia

## Wymagania

- Python 3.10+
- reportlab >= 4.0

## Instalacja

```bash
cd tools/diagnosis-report
pip install -r requirements.txt
```

## Użycie

### Podstawowe

```bash
python main.py \
  --company "Firma ABC Sp. z o.o." \
  --contact "Jan Kowalski" \
  --systems "SAP,Excel,Outlook" \
  --invoices 150 \
  --pain-points "ręczne fakturowanie,brak integracji KSeF,chaos w dokumentach"
```

### Z określoną ścieżką wyjściową

```bash
python main.py \
  -c "XYZ Sp. z o.o." \
  -p "Anna Nowak" \
  -s "Comarch ERP,Outlook" \
  -i 80 \
  -pp "chaos w dokumentach,za dużo maili" \
  -o raporty/raport_xyz.pdf
```

### Parametry

| Parametr | Skrót | Wymagany | Opis |
|----------|-------|----------|------|
| `--company` | `-c` | Tak | Nazwa firmy klienta |
| `--contact` | `-p` | Tak | Imię i nazwisko osoby kontaktowej |
| `--systems` | `-s` | Nie | Systemy IT (przecinkami), np. `SAP,Excel` |
| `--invoices` | `-i` | Nie | Wolumen faktur/mies. (domyślnie: 100) |
| `--pain-points` | `-pp` | Nie | Problemy klienta (przecinkami) |
| `--output` | `-o` | Nie | Ścieżka pliku PDF |

### Rozpoznawane problemy (pain points)

Narzędzie rozpoznaje i opisuje następujące kategorie problemów:

- `ręczne fakturowanie`
- `brak integracji KSeF`
- `chaos w dokumentach`
- `za dużo maili`
- `brak raportowania`
- `wolne procesy`

Można podać dowolny tekst - nierozpoznane problemy otrzymają ogólny opis.

## Przykładowy wynik

Plik PDF w formacie A4 z profesjonalnym formatowaniem, zawierający:
- Stronę tytułową z danymi klienta
- 6 sekcji merytorycznych
- Tabele z danymi i szacunkami
- Nagłówki i stopki z brandingiem AutomateForge.pl
- Numerację stron

## Struktura plików

```
tools/diagnosis-report/
├── main.py              # Główny skrypt CLI
├── requirements.txt     # Zależności Python
└── README.md            # Ten plik
```

## Rozwój

Planowane rozszerzenia:
- Integracja z CRM (automatyczne pobieranie danych klienta)
- Szablony raportów dla różnych branż
- Generowanie wykresów i diagramów
- Wersja webowa z formularzem
