# Runbook: Wdrożenie agenta AI dla klienta

**Autor:** AutomateForge.pl
**Wersja:** 1.0
**Ostatnia aktualizacja:** 2025-01
**Właściciel procesu:** Zespół AI / DevOps

---

## Cel dokumentu

Niniejszy runbook opisuje kompletny proces wdrożenia agenta AI (np. agent triażu email,
agent dokumentów, agent raportowania) u klienta AutomateForge.pl. Obejmuje zbieranie
wymagań, konfigurację, testy, wdrożenie produkcyjne i monitoring.

---

## Przegląd procesu

| Etap | Czas trwania | Odpowiedzialny |
|------|-------------|----------------|
| Zbieranie wymagań | 2-3 dni | Konsultant + Architekt AI |
| Konfiguracja środowiska | 1-2 dni | DevOps |
| Konfiguracja agenta | 3-5 dni | Developer AI |
| Testy z danymi przykładowymi | 2-3 dni | QA + Klient |
| Wdrożenie produkcyjne | 1 dzień | DevOps |
| Konfiguracja monitoringu | 1 dzień | DevOps |
| Śledzenie SLA | ciągłe | Zespół wsparcia |

**Łączny czas:** 2-3 tygodnie

---

## Etap 1: Zbieranie wymagań

### Informacje ogólne

- [ ] Typ agenta do wdrożenia:
  - [ ] Agent triażu email
  - [ ] Agent zarządzania dokumentami
  - [ ] Agent raportowania
  - [ ] Agent obsługi klienta
  - [ ] Inny (opisać): _______________
- [ ] Cel biznesowy agenta (co ma osiągnąć?)
- [ ] Oczekiwane KPI (np. czas reakcji, dokładność, przepustowość)
- [ ] Kto będzie użytkownikiem końcowym agenta?
- [ ] Godziny pracy agenta (24/7, godziny biurowe, inne)

### Wymagania funkcjonalne

- [ ] Szczegółowy opis procesów do zautomatyzowania
- [ ] Kategorie/klasy do rozpoznawania (np. kategorie emaili)
- [ ] Oczekiwane akcje agenta (klasyfikacja, odpowiedź, eskalacja)
- [ ] Reguły biznesowe i wyjątki
- [ ] Język komunikacji (polski, angielski, wielojęzyczny)
- [ ] Format danych wejściowych i wyjściowych

### Wymagania integracyjne

- [ ] Systemy źródłowe (skąd agent pobiera dane):
  - [ ] Gmail / Outlook / inny klient email
  - [ ] System ERP
  - [ ] CRM
  - [ ] Baza dokumentów
  - [ ] Inne: _______________
- [ ] Systemy docelowe (gdzie agent wysyła wyniki):
  - [ ] Slack / Teams
  - [ ] System ticketowy
  - [ ] Baza danych
  - [ ] Dashboard
  - [ ] Inne: _______________
- [ ] Dostępne API i dokumentacja
- [ ] Metody autoryzacji (OAuth, API key, token)

### Wymagania bezpieczeństwa

- [ ] Czy agent ma dostęp do danych osobowych (RODO)?
- [ ] Czy dane mogą opuszczać infrastrukturę klienta?
- [ ] Wymagania dotyczące szyfrowania
- [ ] Polityka retencji danych
- [ ] Wymagane audyty / logi dostępu

### Wymagania wydajnościowe

- [ ] Oczekiwany wolumen (ile wiadomości/dokumentów dziennie?)
- [ ] Oczekiwany czas przetwarzania (max latency)
- [ ] Wymagana dostępność (SLA %)
- [ ] Przerwy serwisowe (okno utrzymaniowe)

### Dokumentacja wymagań

- [ ] Dokument wymagań (Requirements Specification) - przygotowany i zatwierdzony
- [ ] Schemat architektury - przygotowany
- [ ] Plan projektu z kamieniami milowymi

---

## Etap 2: Konfiguracja środowiska

### Infrastruktura

- [ ] Wybrać środowisko uruchomieniowe:
  - [ ] Serwer klienta (on-premise)
  - [ ] Chmura AutomateForge (domyślna)
  - [ ] Chmura klienta (AWS / GCP / Azure)
- [ ] Provisioning serwera / kontenera
  - [ ] CPU: min. 2 vCPU (rekomendowane 4 vCPU)
  - [ ] RAM: min. 4 GB (rekomendowane 8 GB)
  - [ ] Dysk: min. 20 GB SSD
  - [ ] System: Ubuntu 22.04 LTS lub nowszy
- [ ] Konfiguracja sieci
  - [ ] Dostęp do internetu (API AI, systemy klienta)
  - [ ] Firewall: otwarcie wymaganych portów
  - [ ] VPN (jeśli wymagany dostęp do sieci klienta)
- [ ] Instalacja Docker / Python environment

### Klucze API i poświadczenia

- [ ] Anthropic API key (Claude)
  - Utworzenie konta: https://console.anthropic.com/
  - Generowanie klucza API
  - Ustawienie limitów budżetowych
- [ ] Poświadczenia systemu źródłowego (np. Gmail App Password)
- [ ] Poświadczenia systemu docelowego (np. Slack Webhook)
- [ ] Przechowywanie secrets:
  - [ ] Konfiguracja vault / secret manager
  - [ ] Plik `.env` (tylko dla środowisk dev/test)
  - [ ] Zmienne środowiskowe w systemie CI/CD

### Weryfikacja środowiska

- [ ] Test połączenia z API Anthropic
- [ ] Test połączenia z systemem źródłowym
- [ ] Test połączenia z systemem docelowym
- [ ] Test zapisu logów
- [ ] Test dostępu do dysku (odczyt/zapis)

---

## Etap 3: Konfiguracja agenta

### Parametry agenta

- [ ] Wybór modelu AI:
  - [ ] Claude Sonnet (zalecany - dobry stosunek jakości do ceny)
  - [ ] Claude Haiku (szybszy, tańszy, mniejsza dokładność)
  - [ ] Claude Opus (najwyższa jakość, wyższy koszt)
- [ ] Konfiguracja promptu systemowego
  - [ ] Instrukcje klasyfikacji / przetwarzania
  - [ ] Reguły biznesowe w prompcie
  - [ ] Format odpowiedzi (JSON / tekst)
  - [ ] Obsługa edge case'ów
- [ ] Parametry modelu:
  - [ ] max_tokens: dostosowane do zadania
  - [ ] temperature: 0.0-0.3 (dla klasyfikacji)
- [ ] Konfiguracja kategorii / klas
  - [ ] Lista kategorii z opisami
  - [ ] Priorytety kategorii
  - [ ] Akcje przypisane do kategorii

### Integracje

- [ ] Konfiguracja połączenia ze źródłem danych
  - [ ] Parametry połączenia (host, port, protokół)
  - [ ] Autoryzacja
  - [ ] Filtry danych (np. tylko nieprzeczytane, z ostatnich 24h)
  - [ ] Limit przetwarzania (max items per run)
- [ ] Konfiguracja połączenia z systemem docelowym
  - [ ] Parametry webhook / API
  - [ ] Format wiadomości / raportu
  - [ ] Częstotliwość raportowania
- [ ] Konfiguracja logowania
  - [ ] Poziom logowania (INFO / DEBUG)
  - [ ] Lokalizacja logów
  - [ ] Rotacja logów (max rozmiar, retencja)

### Harmonogram

- [ ] Konfiguracja schedulera (cron / systemd timer)
  - [ ] Częstotliwość uruchomień (np. co 15 min, co godzinę)
  - [ ] Godziny aktywności (np. 6:00-22:00)
  - [ ] Dni aktywności (np. pon-pt)
- [ ] Konfiguracja timeout'ów
- [ ] Obsługa nakładających się uruchomień (lock file)

---

## Etap 4: Testy z danymi przykładowymi

### Przygotowanie danych testowych

- [ ] Uzyskanie od klienta próbki danych (min. 50 rekordów)
- [ ] Anonimizacja danych osobowych (jeśli potrzebna)
- [ ] Oznaczenie danych referencyjnych (oczekiwane kategorie/wyniki)
- [ ] Podział na zestaw treningowy i testowy

### Testy dokładności

- [ ] Uruchomienie agenta na danych testowych
- [ ] Porównanie wyników z danymi referencyjnymi
- [ ] Obliczenie metryk:
  - [ ] Dokładność (accuracy): cel min. 90%
  - [ ] Precyzja (precision) per kategoria
  - [ ] Czułość (recall) per kategoria
  - [ ] F1-score
- [ ] Analiza błędnych klasyfikacji
- [ ] Korekta promptu na podstawie wyników
- [ ] Powtórzenie testów po korekcie

### Testy integracyjne

- [ ] Test pełnego przepływu (end-to-end):
  1. Pobranie danych ze źródła
  2. Klasyfikacja / przetworzenie
  3. Akcja w systemie docelowym
  4. Logowanie i raportowanie
- [ ] Test obsługi błędów:
  - [ ] Brak połączenia ze źródłem danych
  - [ ] Brak połączenia z API AI
  - [ ] Brak połączenia z systemem docelowym
  - [ ] Nieprawidłowe dane wejściowe
  - [ ] Przekroczenie timeout'u

### Testy wydajnościowe

- [ ] Test z pełnym wolumenem danych (szacowany dzienny wolumen)
- [ ] Pomiar czasu przetwarzania per element
- [ ] Pomiar kosztów API per element
- [ ] Szacunek kosztów miesięcznych

### Akceptacja klienta

- [ ] Prezentacja wyników testów klientowi
- [ ] Demo agenta na żywo
- [ ] Omówienie wyników i ewentualnych korekt
- [ ] Podpisanie protokołu akceptacji testów

---

## Etap 5: Wdrożenie produkcyjne

### Checklist przed wdrożeniem

- [ ] Testy akceptacyjne zaliczone i podpisane
- [ ] Środowisko produkcyjne przygotowane i zweryfikowane
- [ ] Klucze API produkcyjne skonfigurowane
- [ ] Limity budżetowe API ustawione
- [ ] Monitoring skonfigurowany (patrz Etap 6)
- [ ] Plan rollback przygotowany
- [ ] Zespół wsparcia poinformowany
- [ ] Klient poinformowany o dacie go-live

### Procedura wdrożenia

1. [ ] Deploy kodu agenta na środowisko produkcyjne
   ```bash
   # Przykład dla Docker
   docker build -t autoforge-agent:v1.0 .
   docker run -d --name agent --env-file .env autoforge-agent:v1.0
   ```
2. [ ] Weryfikacja uruchomienia (logi, health check)
3. [ ] Uruchomienie agenta w trybie "obserwacji" (dry-run) - bez akcji
4. [ ] Weryfikacja wyników z klientem
5. [ ] Przełączenie na tryb produkcyjny (pełne akcje)
6. [ ] Potwierdzenie poprawności z klientem
7. [ ] Włączenie harmonogramu (scheduler)

### W przypadku problemów

1. [ ] Ocena krytyczności (P1-P4)
2. [ ] P1/P2: natychmiastowy rollback
   ```bash
   docker stop agent
   docker run -d --name agent --env-file .env autoforge-agent:v0.9  # poprzednia wersja
   ```
3. [ ] Komunikacja z klientem
4. [ ] Root cause analysis
5. [ ] Plan naprawczy

---

## Etap 6: Konfiguracja monitoringu

### Metryki do monitorowania

#### Metryki operacyjne
- [ ] Status agenta (running / stopped / error)
- [ ] Liczba przetworzonych elementów / godzinę
- [ ] Liczba błędów / godzinę
- [ ] Czas przetwarzania per element (p50, p95, p99)
- [ ] Wykorzystanie zasobów (CPU, RAM, dysk)

#### Metryki biznesowe
- [ ] Dokładność klasyfikacji (jeśli mierzalna)
- [ ] Liczba eskalacji / interwencji ręcznych
- [ ] Czas oszczędzony (szacowany)
- [ ] Koszty API (dzienny, miesięczny)

#### Metryki dostępności
- [ ] Uptime agenta (%)
- [ ] Liczba restartów
- [ ] Czas niedostępności

### Konfiguracja alertów

| Alert | Warunek | Kanał | Priorytet |
|-------|---------|-------|-----------|
| Agent nie działa | Status != running | Slack + Email | P1 |
| Wysoki error rate | Błędy > 10% | Slack | P2 |
| Wolne przetwarzanie | p95 > 30s | Slack | P3 |
| Wysokie koszty API | Dzienny koszt > limit | Email | P3 |
| Brak aktywności | 0 przetworzonych > 2h | Slack | P2 |
| Niski dysk | Dysk > 80% | Slack + Email | P2 |

### Narzędzia monitoringu

- [ ] Konfiguracja logów (plik + centralne logowanie)
- [ ] Dashboard (Grafana / wbudowany)
- [ ] Alerty Slack (webhook)
- [ ] Alerty email (SMTP)
- [ ] Health check endpoint (jeśli agent ma API)

### Raportowanie

- [ ] Raport dzienny (automatyczny, Slack)
- [ ] Raport tygodniowy (automatyczny, email do klienta)
- [ ] Raport miesięczny (przygotowany przez zespół, spotkanie z klientem)

---

## Etap 7: Śledzenie SLA

### Definicja SLA

| Parametr | Starter | Professional | Enterprise |
|----------|---------|-------------|------------|
| Dostępność | 95% | 99% | 99.9% |
| Czas reakcji (P1) | 4h | 2h | 1h |
| Czas reakcji (P2) | 8h | 4h | 2h |
| Czas naprawy (P1) | 24h | 8h | 4h |
| Czas naprawy (P2) | 48h | 24h | 8h |
| Okno utrzymaniowe | weekendy | niedz. 2-6 | ustalane indywidualnie |

### Priorytety incydentów

| Priorytet | Opis | Przykład |
|-----------|------|---------|
| P1 - Krytyczny | Agent całkowicie nie działa | Brak klasyfikacji, utrata danych |
| P2 - Wysoki | Agent działa z ograniczeniami | Wolne przetwarzanie, częściowe błędy |
| P3 - Średni | Drobne problemy | Błędy formatowania, opóźnione raporty |
| P4 - Niski | Zapytania, usprawnienia | Prośba o nową kategorię, zmiana raportu |

### Pomiar SLA

- [ ] Automatyczne zbieranie metryk dostępności
- [ ] Rejestrowanie incydentów i czasów reakcji/naprawy
- [ ] Miesięczny raport SLA dla klienta
- [ ] Kwartalny przegląd SLA z klientem

### Procedura eskalacji

| Czas od zgłoszenia | Akcja |
|---------------------|-------|
| 0 min | Automatyczny alert do zespołu wsparcia |
| 15 min (P1) / 1h (P2) | Eskalacja do senior inżyniera |
| 1h (P1) / 4h (P2) | Eskalacja do team leada |
| 2h (P1) / 8h (P2) | Eskalacja do CTO |

---

## Dokumenty powiązane

- Raport diagnostyczny (generowany przez `tools/diagnosis-report/`)
- Agent triażu email (MVP) - `tools/email-triage-agent/`
- Runbook onboardingu KSeF - `ops/runbooks/ksef-onboarding.md`
- Checklist kickoff - `ops/onboarding/kickoff-checklist.md`
