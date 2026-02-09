# Lead Enrichment Pipeline

Automatyczne wzbogacanie leadow CRM danymi z REGON/KRS ze scoringiem i routingiem do Slack.

## Opis

Workflow n8n, ktory:
1. Odbiera nowego leada przez webhook (POST) - np. z formularza na stronie lub CRM
2. Waliduje NIP (suma kontrolna)
3. Rownolegle pobiera dane z:
   - **REGON** (GUS BIR) - nazwa, adres, PKD, typ podmiotu
   - **KRS** (API Ministerstwa Sprawiedliwosci) - forma organizacyjna, kapital zakladowy, data rejestracji
4. Oblicza scoring leada (0-100 pkt) na podstawie wielu czynnikow
5. Klasyfikuje leada: Tier A / B / C / D
6. Routuje powiadomienie na odpowiedni kanal Slack
7. Zwraca wynik wzbogacania przez webhook response

## Wymagania

- n8n w wersji >= 1.20.0
- Klucz API do REGON (BIR) - darmowy, uzyskasz na https://api.stat.gov.pl/Home/BirIndex
- Dostep do API KRS (publiczne, bez klucza)
- Konto Slack z botem posiadajacym uprawnienia `chat:write`

## Konfiguracja

### 1. API REGON (GUS BIR)

W nodzie "REGON - Zaloguj" zamien `TODO_KLUCZ_API_REGON` na swoj klucz API.

Klucz testowy (srodowisko testowe): `abcde12345abcde12345`
Klucz produkcyjny uzyskasz po rejestracji na https://api.stat.gov.pl/Home/BirIndex

> **Uwaga**: Srodowisko testowe: `https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzwornik.svc`
> Srodowisko produkcyjne: `https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzwornik.svc`

### 2. Slack

Dodaj credentials typu **Slack API**. Bot musi byc dodany do kanalow:
- `#sales-hot-leads` - leady Tier A (score >= 70)
- `#sales-warm-leads` - leady Tier B (score >= 50)
- `#sales-cold-leads` - leady Tier C/D oraz leady z niepoprawnym NIP

### 3. Scoring - dostosowanie wag

W nodzie "Wzbogac i scoruj leada" mozesz dostosowac wagi punktacji:

| Czynnik | Punkty | Opis |
|---------|--------|------|
| REGON zweryfikowany | +20 | Firma istnieje w rejestrze REGON |
| KRS zarejestrowany | +15 | Firma zarejestrowana w KRS |
| Kapital >= 100k PLN | +20 | Duza firma |
| Kapital >= 50k PLN | +15 | Srednia firma |
| Kapital >= 5k PLN | +10 | Mala firma |
| Email firmowy | +15 | Domena firmowa (nie gmail/wp/onet) |
| Email darmowy | +5 | Gmail, WP, Onet itp. |
| Telefon podany | +5 | Numer telefonu w danych |
| Osoba kontaktowa | +10 | Imie i nazwisko podane |
| Zrodlo: referral | +15 | Polecenie |
| Zrodlo: organic | +10 | Ruch organiczny |
| Zrodlo: paid | +5 | Reklama platna |

## Uzycie

### Wysylanie leada

```bash
curl -X POST https://TWOJ_N8N/webhook/new-lead \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Przykladowa Sp. z o.o.",
    "nip": "1234567890",
    "email": "jan.kowalski@przykladowa.pl",
    "phone": "+48 600 123 456",
    "contactName": "Jan Kowalski",
    "source": "organic"
  }'
```

### Przykladowa odpowiedz

```json
{
  "status": "OK",
  "tier": "A",
  "score": 75,
  "routed_to": "#sales-hot-leads"
}
```

### Integracja z CRM

- **HubSpot**: Uzyj HubSpot Webhook przy tworzeniu kontaktu
- **Pipedrive**: Skonfiguruj Webhook w Pipedrive na tworzenie nowego deala
- **Formularz www**: Dodaj POST na webhook w obsludze formularza kontaktowego

## Znane ograniczenia

- API REGON (BIR) bywa niestabilne - sesja wygasa po 60 minutach, mozliwe timeouty
- API KRS jest publiczne, ale ma limity zapytan (brak oficjalnej dokumentacji limitow)
- Scoring jest statyczny - nie uczy sie z wynikow sprzedazy
- Walidacja NIP sprawdza tylko sume kontrolna, nie weryfikuje czy NIP jest aktywny w VAT
- Parsowanie odpowiedzi REGON (SOAP/XML) moze wymagac dostosowania do konkretnych typow podmiotow
- Brak obslugu firm zagranicznych (NIP nie-polski)
- Przy duzym wolumenie leadow (>100/h) rozważ cache'owanie wynikow REGON/KRS
