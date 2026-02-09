# Runbook: Onboarding klienta KSeF

**Autor:** AutomateForge.pl
**Wersja:** 1.0
**Ostatnia aktualizacja:** 2025-01
**Właściciel procesu:** Zespół wdrożeniowy

---

## Cel dokumentu

Niniejszy runbook opisuje kompletny proces onboardingu nowego klienta na integrację
z Krajowym Systemem e-Faktur (KSeF). Dokument obejmuje wszystkie kroki od pierwszego
kontaktu do uruchomienia produkcyjnego i monitoringu po wdrożeniu.

---

## Przegląd procesu

| Etap | Czas trwania | Odpowiedzialny |
|------|-------------|----------------|
| Discovery call | 1 dzień | Konsultant |
| Audyt systemowy | 2-3 dni | Architekt |
| Sandbox KSeF | 1-2 dni | DevOps |
| Konfiguracja integracji | 3-5 dni | Developer |
| Testy i walidacja | 3-5 dni | QA + Klient |
| Go-live | 1 dzień | DevOps + Developer |
| Monitoring po wdrożeniu | 14 dni | Zespół wsparcia |

**Łączny czas:** 2-4 tygodnie (w zależności od złożoności)

---

## Etap 1: Discovery Call (Rozmowa diagnostyczna)

### Checklist przed rozmową

- [ ] Potwierdzenie terminu spotkania z klientem
- [ ] Przygotowanie ankiety diagnostycznej
- [ ] Sprawdzenie branży klienta i specyficznych wymagań KSeF
- [ ] Przygotowanie prezentacji możliwości AutomateForge.pl

### Pytania do klienta

#### Informacje o firmie
- [ ] Pełna nazwa firmy i NIP
- [ ] Branża i profil działalności
- [ ] Liczba pracowników w dziale księgowości/finansów
- [ ] Osoba decyzyjna i osoba techniczna do kontaktu

#### Obecny proces fakturowania
- [ ] Jaki system ERP/księgowy jest używany? (nazwa, wersja)
- [ ] Ile faktur sprzedażowych wystawianych jest miesięcznie?
- [ ] Ile faktur zakupowych jest przetwarzanych miesięcznie?
- [ ] Czy faktury są wystawiane ręcznie czy automatycznie?
- [ ] Czy istnieje integracja z innymi systemami (CRM, magazyn)?
- [ ] Jakie formaty faktur są obecnie używane (PDF, papier, XML)?

#### Gotowość na KSeF
- [ ] Czy klient ma już konto w KSeF?
- [ ] Czy klient posiada certyfikat kwalifikowany lub profil zaufany?
- [ ] Czy obecny system ERP ma moduł KSeF?
- [ ] Czy klient testował już wysyłkę/odbiór w sandbox KSeF?

#### Wymagania specjalne
- [ ] Czy są faktury w walutach obcych?
- [ ] Czy są faktury korygujące w dużym wolumenie?
- [ ] Czy potrzebna jest obsługa faktur zaliczkowych?
- [ ] Czy są wymagania dotyczące przechowywania/archiwizacji?

### Po rozmowie

- [ ] Uzupełnienie notatek w CRM
- [ ] Wygenerowanie raportu diagnostycznego (tools/diagnosis-report)
- [ ] Przygotowanie oferty handlowej
- [ ] Wysłanie raportu i oferty do klienta
- [ ] Zaplanowanie follow-up (max 3 dni robocze)

---

## Etap 2: Audyt systemowy

### Cel

Szczegółowa analiza techniczna systemów IT klienta w kontekście integracji z KSeF.

### Checklist audytu

#### System ERP / księgowy
- [ ] Nazwa i wersja systemu
- [ ] Dostępne API (REST, SOAP, inne)
- [ ] Format danych faktur (wewnętrzny schemat)
- [ ] Możliwość eksportu danych w formacie XML/JSON
- [ ] Dokumentacja API (uzyskanie od dostawcy ERP)
- [ ] Dane testowe (przykładowe faktury z systemu)

#### Infrastruktura IT
- [ ] Hosting: on-premise / chmura (jaki dostawca?)
- [ ] System operacyjny serwerów
- [ ] Dostępność VPN lub innego bezpiecznego połączenia
- [ ] Firewall - czy wymaga otwarcia portów do KSeF?
- [ ] Certyfikaty SSL/TLS

#### Bezpieczeństwo
- [ ] Polityka bezpieczeństwa klienta
- [ ] Wymagania dotyczące przechowywania danych
- [ ] Zgodność z RODO
- [ ] Procedura nadawania dostępów

#### Wynik audytu
- [ ] Dokument: "Raport audytu technicznego" (szablon w ops/templates/)
- [ ] Zidentyfikowane ryzyka i ograniczenia
- [ ] Plan integracji z estymacją czasu
- [ ] Akceptacja planu przez klienta

---

## Etap 3: Konfiguracja środowiska sandbox KSeF

### Przygotowanie

- [ ] Uzyskanie dostępu do środowiska testowego KSeF
  - URL: https://ksef-test.mf.gov.pl/
  - Dokumentacja: https://www.podatki.gov.pl/ksef/
- [ ] Wygenerowanie tokenu autoryzacyjnego dla środowiska testowego
- [ ] Przygotowanie certyfikatu testowego (jeśli wymagany)

### Konfiguracja

- [ ] Utworzenie konta organizacji w sandbox KSeF
- [ ] Konfiguracja autoryzacji (token / certyfikat)
- [ ] Test połączenia z API KSeF (wysyłka testowej faktury)
- [ ] Weryfikacja odbioru faktur testowych
- [ ] Konfiguracja webhooków (jeśli dostępne)

### Weryfikacja sandbox

- [ ] Wysyłka faktury sprzedażowej - sukces
- [ ] Odbiór faktury zakupowej - sukces
- [ ] Wysyłka faktury korygującej - sukces
- [ ] Sprawdzenie statusu faktury - sukces
- [ ] Pobranie UPO (Urzędowe Potwierdzenie Odbioru) - sukces
- [ ] Test obsługi błędów (nieprawidłowe dane) - prawidłowa obsługa

---

## Etap 4: Konfiguracja integracji

### Architektura rozwiązania

- [ ] Schemat integracji (system klienta <-> AutomateForge <-> KSeF)
- [ ] Wybór metody integracji:
  - [ ] API bezpośrednie (REST)
  - [ ] Middleware / kolejka (RabbitMQ, Kafka)
  - [ ] Plikowa (import/eksport XML)
- [ ] Konfiguracja mapowania danych (format klienta -> schemat KSeF FA(2))

### Implementacja

- [ ] Moduł wysyłki faktur do KSeF
  - [ ] Generowanie XML zgodnego ze schematem FA(2)
  - [ ] Walidacja XML przed wysyłką
  - [ ] Podpisywanie faktur (token/certyfikat)
  - [ ] Obsługa odpowiedzi (numer referencyjny, UPO)
  - [ ] Obsługa błędów i retry

- [ ] Moduł odbioru faktur z KSeF
  - [ ] Pobieranie nowych faktur (polling / webhook)
  - [ ] Parsowanie XML z KSeF
  - [ ] Mapowanie na format systemu klienta
  - [ ] Import do systemu klienta
  - [ ] Potwierdzenie przetworzenia

- [ ] Moduł monitoringu
  - [ ] Dashboard statusu faktur
  - [ ] Alerty o błędach
  - [ ] Logi operacji
  - [ ] Raportowanie (dzienny/tygodniowy)

### Konfiguracja środowiska

- [ ] Zmienne środowiskowe (API keys, endpoints)
- [ ] Konfiguracja bazy danych (logi, cache)
- [ ] Harmonogram zadań (cron / scheduler)
- [ ] Konfiguracja alertów (email, Slack)

---

## Etap 5: Testy i walidacja

### Testy funkcjonalne

- [ ] Test wysyłki faktury prostej (towar)
- [ ] Test wysyłki faktury za usługę
- [ ] Test faktury z wieloma pozycjami (>10 pozycji)
- [ ] Test faktury w walucie obcej (EUR, USD)
- [ ] Test faktury korygującej
- [ ] Test faktury zaliczkowej
- [ ] Test odbioru faktury zakupowej
- [ ] Test pobierania UPO
- [ ] Test sprawdzania statusu faktury

### Testy wydajnościowe

- [ ] Test wysyłki partii faktur (10, 50, 100)
- [ ] Pomiar czasu odpowiedzi API
- [ ] Test obciążenia w godzinach szczytu

### Testy błędów

- [ ] Brak połączenia z KSeF - prawidłowa obsługa
- [ ] Nieprawidłowe dane faktury - walidacja i komunikat
- [ ] Timeout API - retry z backoff
- [ ] Duplikat faktury - wykrycie i ostrzeżenie

### Testy akceptacyjne (z klientem)

- [ ] Prezentacja rozwiązania klientowi
- [ ] Wspólne przeprowadzenie scenariuszy testowych
- [ ] Weryfikacja poprawności danych w systemie klienta
- [ ] Podpisanie protokołu testów akceptacyjnych

---

## Etap 6: Go-live (Uruchomienie produkcyjne)

### Checklist przed go-live

- [ ] Wszystkie testy akceptacyjne zaliczone
- [ ] Protokół testów podpisany przez klienta
- [ ] Konfiguracja środowiska produkcyjnego KSeF
- [ ] Tokeny/certyfikaty produkcyjne skonfigurowane
- [ ] Backup systemu klienta przed uruchomieniem
- [ ] Plan rollback przygotowany i przetestowany
- [ ] Zespół wsparcia poinformowany i dostępny
- [ ] Klient poinformowany o dacie i godzinie go-live

### Procedura go-live

1. [ ] Przełączenie na środowisko produkcyjne KSeF
2. [ ] Wysyłka pierwszej faktury testowej (produkcja)
3. [ ] Weryfikacja poprawności w KSeF i systemie klienta
4. [ ] Odbiór pierwszej faktury testowej (produkcja)
5. [ ] Potwierdzenie poprawności z klientem
6. [ ] Włączenie automatycznej synchronizacji
7. [ ] Włączenie monitoringu i alertów
8. [ ] Potwierdzenie go-live z klientem

### W przypadku problemów

1. [ ] Ocena krytyczności problemu
2. [ ] Jeśli krytyczny: rollback do poprzedniej konfiguracji
3. [ ] Komunikacja z klientem o statusie
4. [ ] Analiza przyczyny (root cause analysis)
5. [ ] Plan naprawczy z nowym terminem go-live

---

## Etap 7: Monitoring po wdrożeniu

### Pierwszy tydzień (intensywny monitoring)

- [ ] Codzienny przegląd logów (rano, wieczorem)
- [ ] Codzienny kontakt z klientem (email lub telefon)
- [ ] Monitorowanie wskaźników:
  - Liczba wysłanych faktur / dzień
  - Liczba odebranych faktur / dzień
  - Liczba błędów / dzień
  - Średni czas przetwarzania
  - Dostępność systemu (%)
- [ ] Natychmiastowa reakcja na alerty

### Drugi tydzień (stabilizacja)

- [ ] Przegląd logów raz dziennie
- [ ] Kontakt z klientem co 2-3 dni
- [ ] Analiza trendów i optymalizacja
- [ ] Dokumentacja lessons learned

### Po dwóch tygodniach

- [ ] Raport podsumowujący wdrożenie
- [ ] Przekazanie do zespołu wsparcia (BAU)
- [ ] Ustalenie harmonogramu regularnych przeglądów
- [ ] Ankieta satysfakcji klienta

---

## Eskalacja i kontakty

| Poziom | Opis | Kontakt | Czas reakcji |
|--------|------|---------|-------------|
| L1 | Problemy operacyjne | wsparcie@automateforge.pl | 4h |
| L2 | Problemy techniczne | devops@automateforge.pl | 2h |
| L3 | Problemy krytyczne | cto@automateforge.pl | 1h |
| KSeF | Problemy po stronie MF | ksef@mf.gov.pl | N/A |

---

## Dokumenty powiązane

- Raport diagnostyczny (generowany przez `tools/diagnosis-report/`)
- Szablon umowy wdrożeniowej
- Dokumentacja API KSeF: https://www.podatki.gov.pl/ksef/
- Schemat FA(2): https://www.podatki.gov.pl/ksef/schemat-fa/
