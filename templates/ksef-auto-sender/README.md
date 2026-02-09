# KSeF Auto Sender

Automatyczny nadawca faktur do Krajowego Systemu e-Faktur (KSeF).

## Opis

Workflow n8n, ktory:
1. Odbiera faktury XML przez webhook (POST)
2. Waliduje strukture XML przeciwko schematowi FA(2)
3. Inicjalizuje sesje z KSeF API
4. Wysyla fakture do KSeF
5. Powiadamia na Slack o sukcesie lub bledzie walidacji

## Wymagania

- n8n w wersji >= 1.20.0
- Token autoryzacyjny KSeF (wygenerowany w srodowisku testowym lub produkcyjnym)
- Konto Slack z botem posiadajacym uprawnienia `chat:write`
- Faktury w formacie XML zgodnym ze schema FA(2) wersja 1-0E

## Konfiguracja

### 1. Dane uwierzytelniajace KSeF

W n8n przejdz do **Settings > Credentials** i dodaj nowe dane typu **Header Auth**:

- **Name**: `KSeF API Token`
- **Header Name**: `Authorization`
- **Header Value**: `Bearer TWOJ_TOKEN_KSEF`

> **Srodowisko testowe**: `https://ksef-test.mf.gov.pl/api/`
> **Srodowisko produkcyjne**: `https://ksef.mf.gov.pl/api/`

Aby zmienic srodowisko, zaktualizuj URL-e w nodach "KSeF - Inicjalizacja sesji" oraz "KSeF - Wyslij fakture".

### 2. Slack

Dodaj credentials typu **Slack API** z tokenem bota. Bot musi byc dodany do kanalow:
- `#faktury` - powiadomienia o udanych wysylkach
- `#faktury-bledy` - powiadomienia o bledach walidacji

### 3. Webhook

Po aktywacji workflow, n8n udostepni endpoint:
```
POST https://TWOJ_N8N/webhook/ksef-invoice
Content-Type: application/json

{
  "invoiceXml": "<Faktura xmlns=...>...</Faktura>"
}
```

## Uzycie

### Wysylanie faktury

```bash
curl -X POST https://TWOJ_N8N/webhook/ksef-invoice \
  -H "Content-Type: application/json" \
  -d '{"invoiceXml": "<Faktura xmlns=\"http://crd.gov.pl/wzor/2023/06/29/12648/\">...</Faktura>"}'
```

### Integracja z systemem ERP

Skonfiguruj system ERP tak, aby po wygenerowaniu faktury wysylal POST na adres webhooka z XML w ciele zadania.

### Monitoring

Sprawdzaj kanal `#faktury` na Slack, aby sledzic status wysylanych faktur. Bledy walidacji sa raportowane na `#faktury-bledy`.

## Znane ograniczenia

- Workflow obsluguje jedna fakture na zadanie (brak batch processing)
- Walidacja XML jest uproszczona - sprawdza obecnosc kluczowych elementow, nie pelna walidacje XSD
- Token KSeF ma ograniczony czas zycia - nalezy go odswiezac zgodnie z dokumentacja MF
- Brak automatycznego retry przy bledach sieciowych - w razie potrzeby nalezy dodac node "Retry" lub skonfigurowac retry w ustawieniach n8n
- Srodowisko testowe KSeF moze byc niedostepne w godzinach konserwacji (zwykle weekendy)
- Maksymalny rozmiar faktury XML: ograniczony przez ustawienia n8n (domyslnie 16 MB)
