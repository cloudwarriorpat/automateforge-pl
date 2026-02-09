# BaseLinker InPost Tracker

Automatyczne sledzenie przesylek InPost i aktualizacja statusow zamowien w BaseLinker.

## Opis

Workflow n8n, ktory co 15 minut:
1. Pobiera zamowienia ze statusem "wyslane" z BaseLinker API
2. Filtruje zamowienia z przesylkami InPost
3. Sprawdza aktualny status kazdej przesylki w InPost ShipX API
4. Mapuje status InPost na odpowiedni status BaseLinker
5. Aktualizuje status zamowienia w BaseLinker
6. Wysyla powiadomienie na Slack o zmianach statusu

## Wymagania

- n8n w wersji >= 1.20.0
- Konto BaseLinker z aktywnym tokenem API
- Konto InPost z dostepem do ShipX API
- Konto Slack z botem posiadajacym uprawnienia `chat:write`

## Konfiguracja

### 1. BaseLinker API

W n8n przejdz do **Settings > Credentials** i dodaj:

- **Type**: Header Auth
- **Name**: `BaseLinker API Token`
- **Header Name**: `X-BLToken`
- **Header Value**: Token API z panelu BaseLinker (Moje konto > API)

### 2. InPost ShipX API

W nodzie "InPost - Sprawdz status" uzupelnij:

- **Authorization header**: `Bearer TWOJ_TOKEN_INPOST`
- Token uzyskasz rejestrujac aplikacje na https://manager.paczkomaty.pl

### 3. Mapowanie statusow

W nodzie "Mapuj status InPost na BaseLinker" dostosuj wartosci `TODO_STATUS_*` do swoich statusow w BaseLinker:

```
TODO_STATUS_W_TRANSPORCIE  -> ID statusu "W transporcie" z BaseLinker
TODO_STATUS_DO_ODBIORU     -> ID statusu "Do odbioru" z BaseLinker
TODO_STATUS_W_DOSTARCZANIU -> ID statusu "W dostarczaniu" z BaseLinker
TODO_STATUS_DOSTARCZONO    -> ID statusu "Dostarczono" z BaseLinker
TODO_STATUS_ZWROT          -> ID statusu "Zwrot" z BaseLinker
```

ID statusow znajdziesz w BaseLinker: Zamowienia > Ustawienia statusow.

### 4. Slack

Dodaj credentials typu **Slack API**. Bot musi byc dodany do kanalu `#zamowienia`.

### 5. Czestotliwosc odpytywania

Domyslnie workflow odpytuje API co 15 minut. Mozesz zmienic interwal w nodzie "Cron - Co 15 minut". Pamietaj o limitach API BaseLinker (100 zapytan/min) i InPost.

## Uzycie

1. Zaimportuj workflow do n8n
2. Uzupelnij credentials i statusy (patrz Konfiguracja)
3. Aktywuj workflow
4. Sledz powiadomienia na kanale `#zamowienia` w Slack

## Znane ograniczenia

- Limit BaseLinker API: 100 zapytan na minute - przy duzej ilosci zamowien moze byc wymagane zwiekszenie interwalu
- InPost ShipX API wymaga osobnej rejestracji aplikacji
- Mapowanie statusow wymaga recznej konfiguracji pod konkretna instalacje BaseLinker
- Workflow nie obsluguje przesylek kurierskich InPost (tylko paczkomaty) - w razie potrzeby rozszerz filtr w nodzie "Filtruj zamowienia InPost"
- Brak cache'owania - te same przesylki moga byc sprawdzane wielokrotnie
- Przy duzej liczbie zamowien (>100) moze byc wymagana paginacja odpowiedzi z BaseLinker
