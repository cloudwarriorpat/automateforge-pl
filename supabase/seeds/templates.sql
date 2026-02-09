-- Seed: 5 automation templates for the templates marketplace
-- These match the planned templates shown on the Templates "coming soon" page

INSERT INTO templates (title, description, category, price, tools, integrations, popular) VALUES
(
  'KSeF Auto-Sender',
  'Automatyczna wysylka faktur do KSeF. Monitoruje folder z nowymi fakturami, waliduje XML, wysyla do API KSeF i loguje statusy. Obsluguje bledy i ponowne proby.',
  'finance',
  29900,
  ARRAY['n8n'],
  ARRAY['KSeF API', 'Fakturownia', 'wFirma'],
  true
),
(
  'BaseLinker-InPost Tracker',
  'Automatyczne sledzenie przesylek InPost dla zamowien z BaseLinker. Pobiera nowe zamowienia, sprawdza status paczek, aktualizuje status w BaseLinker i powiadamia klienta.',
  'e-commerce',
  19900,
  ARRAY['n8n'],
  ARRAY['BaseLinker', 'InPost API', 'Slack'],
  true
),
(
  'Invoice Duplicate Detector',
  'Wykrywanie duplikatow faktur przychodzacych. Porownuje NIP, kwote i date z istniejacymi fakturami, flaguje podejrzane duplikaty i wysyla alert do zespolu finansowego.',
  'finance',
  14900,
  ARRAY['n8n'],
  ARRAY['Fakturownia', 'Google Sheets', 'Slack'],
  false
),
(
  'Lead Enrichment Pipeline',
  'Automatyczne wzbogacanie i scoring leadow. Pobiera nowe leady z CRM, wzbogaca o dane REGON/KRS, oblicza score, routuje do odpowiedniego handlowca na Slack.',
  'crm',
  24900,
  ARRAY['n8n'],
  ARRAY['REGON API', 'KRS API', 'Slack', 'Google Sheets'],
  true
),
(
  'Daily Slack Digest',
  'Poranny raport ze wszystkich zrodel. Agreguje dane z e-commerce, finansow, supportu i social media. Generuje czytelne podsumowanie i postuje na Slack o wybranej godzinie.',
  'marketing',
  14900,
  ARRAY['n8n'],
  ARRAY['Slack', 'Google Analytics', 'BaseLinker', 'Freshdesk'],
  false
);
