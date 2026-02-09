# Invoice Duplicate Detector

Wykrywanie duplikatow faktur na podstawie NIP, kwoty i daty.

## Opis

Workflow n8n, ktory:
1. Odbiera dane faktury przez webhook (POST)
2. Normalizuje dane wejsciowe (NIP, kwota, data)
3. Rownolegle przeszukuje baze danych:
   - Po dokladnym numerze faktury + NIP sprzedawcy
   - Po NIP sprzedawcy + zblizonej kwocie (+/- 1%) + zblizonej dacie (+/- 5 dni)
4. Oblicza wskaznik pewnosci duplikatu (score 0-100%)
5. Klasyfikuje ryzyko: BRAK / NISKI / SREDNI / WYSOKI
6. Przy wykryciu duplikatu wysyla alert na Slack
7. Zwraca wynik przez webhook response

## Wymagania

- n8n w wersji >= 1.20.0
- Baza danych PostgreSQL z tabela faktur
- Konto Slack z botem posiadajacym uprawnienia `chat:write`

### Schemat tabeli

Workflow oczekuje tabeli `faktury` o nastepujacej strukturze:

```sql
CREATE TABLE faktury (
    id SERIAL PRIMARY KEY,
    nip_sprzedawcy VARCHAR(10) NOT NULL,
    nip_nabywcy VARCHAR(10),
    nr_faktury VARCHAR(100) NOT NULL,
    data_faktury DATE NOT NULL,
    kwota_brutto NUMERIC(12, 2) NOT NULL,
    data_wprowadzenia TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faktury_nip_kwota ON faktury (nip_sprzedawcy, kwota_brutto);
CREATE INDEX idx_faktury_nr ON faktury (nr_faktury, nip_sprzedawcy);
```

## Konfiguracja

### 1. Baza danych PostgreSQL

W n8n przejdz do **Settings > Credentials** i dodaj:

- **Type**: Postgres
- **Host**: adres serwera bazy danych
- **Database**: nazwa bazy danych
- **User / Password**: dane logowania
- **SSL**: wlacz jesli wymagane

### 2. Slack

Dodaj credentials typu **Slack API**. Bot musi byc dodany do kanalu `#ksiegowosc-alerty`.

### 3. Progi wykrywania

W nodzie "Analiza duplikatow" mozesz dostosowac:

- **Tolerancja kwoty**: domyslnie +/- 1% (`kwota * 0.99` do `kwota * 1.01`)
- **Tolerancja daty**: domyslnie +/- 5 dni
- **Prog duplikatu**: domyslnie score >= 70%
- **Wagi punktacji**:
  - Dokladna kwota: 40 pkt
  - Zblizona kwota: 15-30 pkt
  - Ta sama data: 30 pkt
  - Zblizona data (1-3 dni): 10-20 pkt
  - Ten sam NIP nabywcy: 20 pkt
  - Dokladny numer faktury: 100 pkt (natychmiastowe wykrycie)

## Uzycie

### Sprawdzanie faktury

```bash
curl -X POST https://TWOJ_N8N/webhook/check-invoice-duplicate \
  -H "Content-Type: application/json" \
  -d '{
    "nip": "1234567890",
    "nipNabywcy": "0987654321",
    "nrFaktury": "FV/2025/001",
    "kwotaBrutto": 1230.00,
    "dataFaktury": "2025-01-15"
  }'
```

### Przykladowa odpowiedz (duplikat)

```json
{
  "status": "DUPLIKAT_WYKRYTY",
  "riskLevel": "WYSOKI",
  "duplicateScore": "90",
  "message": "UWAGA: Wykryto 1 potencjalny(ch) duplikat(ow). Poziom pewnosci: 90%"
}
```

### Przykladowa odpowiedz (brak duplikatu)

```json
{
  "status": "OK",
  "riskLevel": "BRAK",
  "message": "Nie wykryto duplikatow."
}
```

### Integracja z systemem ERP/ksiegowym

Podlacz webhook jako krok walidacji przed zatwierdzeniem faktury w systemie ksiegowym. Na podstawie odpowiedzi mozna automatycznie wstrzymac lub oznaczyc fakture do weryfikacji.

## Znane ograniczenia

- Wymaga tabeli `faktury` w PostgreSQL - jesli uzywasz innej bazy (MySQL, MSSQL), dostosuj skladnie SQL w nodach
- Walidacja opiera sie na heurystyce punktowej - mozliwe sa falszywe alarmy (false positives)
- Nie obsluguje faktur korygujacych jako osobnej kategorii
- Porownanie numerow faktur jest dokladne (case-sensitive) - rozne formaty (np. "FV/2025/001" vs "FV-2025-001") nie beda dopasowane
- Przy duzej bazie faktur (>100 000) rozważ dodanie partycjonowania tabeli po dacie
- Brak wbudowanego mechanizmu uczenia sie z blednych wykryc
