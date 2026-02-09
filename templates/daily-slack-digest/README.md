# Daily Slack Digest

Codzienny raport biznesowy agregujacy dane z wielu zrodel, wysylany na Slack.

## Opis

Workflow n8n uruchamiany codziennie o 8:00 (Pn-Pt), ktory:
1. Rownolegle pobiera dane z czterech zrodel:
   - **BaseLinker** - zamowienia z ostatnich 24h (liczba, przychod, srednia wartosc)
   - **PostgreSQL** - faktury (wystawione, suma brutto, wyslane do KSeF, bledy)
   - **n8n API** - bledy wykonan workflow z ostatnich 24h
   - **Analytics** - statystyki strony www (odslony, unikalni, bounce rate)
2. Przetwarza i agreguje dane z kazdego zrodla
3. Buduje sformatowany raport Slack z emoji statusow
4. Wysyla raport na kanal `#daily-digest`
5. Jesli liczba bledow n8n > 5, wysyla dodatkowy alert na `#ops-alerts`

## Wymagania

- n8n w wersji >= 1.20.0
- Token API BaseLinker
- Baza danych PostgreSQL z tabela faktur
- Klucz API n8n (Settings > API > Create API key)
- API analytics (opcjonalnie - Plausible, Matomo, lub inne)
- Konto Slack z botem posiadajacym uprawnienia `chat:write`

## Konfiguracja

### 1. BaseLinker

W nodzie "BaseLinker - Zamowienia z wczoraj" zamien `TODO_BASELINKER_TOKEN` na token API z panelu BaseLinker.

### 2. Baza danych PostgreSQL

Dodaj credentials typu **Postgres** w n8n. Workflow oczekuje tabeli `faktury` z kolumnami:
- `kwota_brutto` (NUMERIC)
- `status` (VARCHAR) - wartosci: 'wyslana_ksef', 'blad', itp.
- `data_wprowadzenia` (TIMESTAMP)

Dostosuj zapytanie SQL w nodzie "SQL - Faktury z wczoraj" do swojego schematu bazy.

### 3. n8n API

W nodzie "n8n API - Bledy wykonan":
- Zamien `TODO_N8N_INSTANCE` na adres Twojej instancji n8n (np. `n8n.twojafirma.pl`)
- Zamien `TODO_N8N_API_KEY` na klucz API (Settings > API)

### 4. Analytics (opcjonalnie)

W nodzie "Analytics - Statystyki www":
- Zamien `TODO_ANALYTICS_API` na adres API analytics
- Zamien `TODO_ANALYTICS_TOKEN` na token dostepu

Jesli nie korzystasz z analytics, mozesz usunac nody "Analytics - Statystyki www" i "Przetworz analytics" - raport bedzie dzialal bez tej sekcji.

### 5. Slack

Dodaj credentials typu **Slack API**. Bot musi byc dodany do kanalow:
- `#daily-digest` - codzienny raport
- `#ops-alerts` - alerty o duzej liczbie bledow (>5)

### 6. Godzina wysylki

Domyslnie raport jest wysylany o 8:00 w dni robocze (Pn-Pt). Zmien wyrazenie cron w nodzie "Cron - Codziennie 8:00 Pn-Pt":

```
0 8 * * 1-5    # Pn-Pt o 8:00
0 9 * * 1-5    # Pn-Pt o 9:00
0 8 * * *      # Codziennie o 8:00 (z weekendami)
```

### 7. Prog alertu bledow

W nodzie "Duzo bledow?" zmien wartosc `5` na pozadany prog. Przy przekroczeniu progu, dodatkowy alert jest wysylany na `#ops-alerts`.

## Uzycie

1. Zaimportuj workflow do n8n
2. Uzupelnij wszystkie credentials i tokeny (patrz Konfiguracja)
3. Aktywuj workflow
4. Raport pojawi sie automatycznie na Slack o ustawionej godzinie

### Testowanie

Aby przetestowac workflow bez czekania na cron, kliknij "Execute Workflow" w edytorze n8n. Raport zostanie wygenerowany na podstawie danych z ostatnich 24h.

### Dodawanie nowych zrodel danych

Aby dodac nowe zrodlo danych do raportu:
1. Dodaj nowy node HTTP Request pobierajacy dane
2. Podlacz go do noda "Cron" (rownolegle z istniejacymi)
3. Dodaj node Function przetwarzajacy dane
4. Podlacz do noda "Polacz wszystkie dane"
5. Zaktualizuj node "Zbuduj raport" o nowa sekcje

## Znane ograniczenia

- Merge node w trybie "multiplex" moze powodowac problemy jesli jedno ze zrodel zwroci blad - rozważ dodanie error handling per zrodlo
- Godzina cron jest w strefie czasowej serwera n8n - upewnij sie, ze jest ustawiona na Europe/Warsaw
- BaseLinker API zwraca max 100 zamowien na zapytanie - przy wiekszej liczbie dodaj paginacje
- Raport nie zawiera danych porownawczych (np. vs. poprzedni dzien/tydzien) - mozna to dodac rozszerzajac zapytania
- Przy braku polaczenia z jednym ze zrodel, caly workflow moze sie nie wykonac - dodaj try/catch w nodach Function
- Formatowanie Slack (mrkdwn) ma ograniczenia - dlugie raporty moga byc obciete (limit 4000 znakow na wiadomosc)
