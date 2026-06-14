// ============================================================
// MATCHES.JS – Hier pflegst du alle Spieldaten
// Neue Spiele einfach unten anfügen, Schiedsrichter + Bewertung
// ergänzen sobald bekannt. Dann: git add . && git commit -m "Spieltag X" && git push
//
// noten-Format:
//   { quelle: "kicker", note: 3.5 }   -> kicker-Skala 1-6 (1=ausgezeichnet, 6=ungenuegend)
//   { quelle: "Sportschau", note: 3.0 } -> gleiche Skala, wenn Quelle vergleichbare Note gibt
// sterne werden automatisch aus dem Noten-Durchschnitt berechnet (muss nicht mehr manuell gesetzt werden)
// ============================================================

export const MATCHES = [
  {
    id: 1,
    datum: "11.06.2026", uhrzeit: "21:00", gruppe: "A",
    heim: "Mexiko", gast: "Suedafrika", ergebnis: "2:0",
    abgeschlossen: true,
    schiedsrichter: "Wilton Pereira Sampaio",
    sr_land: "Brasilien",
    sr_konfed: "CONMEBOL",
    bewertung: {
      kurzfazit: "Umstrittene Leistung - im Mittelpunkt statt im Hintergrund",
      details: "3 Rote Karten (WM-Rekord im Eroeffnungsspiel): Sithole (50. Min, berechtigt), Zwane (84. Min, nach VAR - strittig), Montes (90+2. Min, berechtigt). Die Rote Karte gegen Zwane wegen angeblicher Taetlichkeit loeste Kritik aus. TV-Experte Patrick Ittrich (MagentaTV): \"Das bleibt leider haengen. Jetzt reden alle ueber den Schiedsrichter, und das nach einem WM-Eroeffnungsspiel.\" Letztmals so viele Platzverweise gab es 2006 (Schlacht von Nuernberg).",
      noten: [
        { quelle: "kicker", note: 4.5 },
      ],
      quellen: "Tagesspiegel, 20min, stimme.de, t-online.de"
    }
  },
  {
    id: 2,
    datum: "12.06.2026", uhrzeit: "04:00", gruppe: "A",
    heim: "Suedkorea", gast: "Tschechien", ergebnis: "2:1",
    abgeschlossen: true,
    schiedsrichter: "Amin Mohamed Omar",
    sr_land: "Aegypten",
    sr_konfed: "CAF",
    bewertung: {
      kurzfazit: "Solide WM-Premiere - kluge Abseitsentscheidung per VAR",
      details: "WM-Debuet des Aegypters. Hob einen vermeintlichen Soucek-Treffer (78. Min) korrekt wegen Abseits auf. Leitete eine lebendige Partie ohne groessere Kontroversen - unauffaellig im positiven Sinne.",
      noten: [
        { quelle: "kicker", note: 2.5 },
      ],
      quellen: "Sportschau, audimax.de"
    }
  },
  {
    id: 3,
    datum: "12.06.2026", uhrzeit: "21:00", gruppe: "B",
    heim: "Kanada", gast: "Bosnien-Herzegowina", ergebnis: "1:1",
    abgeschlossen: true,
    schiedsrichter: "Facundo Tello",
    sr_land: "Argentinien",
    sr_konfed: "CONMEBOL",
    bewertung: {
      kurzfazit: "Unauffaellige Leistung bei ausgeglichenem Spiel",
      details: "Der Argentinier leitete das Spiel ohne groessere Kontroversen. Kanada traf spaet zum 1:1-Ausgleich durch Larin (78. Min). Keine umstrittenen Entscheidungen gemeldet.",
      noten: [
        { quelle: "kicker", note: 3.0 },
      ],
      quellen: "fussballdaten.de, t-online.de"
    }
  },
  {
    id: 4,
    datum: "13.06.2026", uhrzeit: "03:00", gruppe: "D",
    heim: "USA", gast: "Paraguay", ergebnis: "4:1",
    abgeschlossen: true,
    schiedsrichter: "Danny Makkelie",
    sr_land: "Niederlande",
    sr_konfed: "UEFA",
    bewertung: {
      kurzfazit: "Gelungener Einsatz - erste VAR-Korrektur der WM souveraen gehandhabt",
      details: "Makkelie nutzte erstmals bei dieser WM die neue VAR-Befugnis zur Spielerverwechslung: Nahm Gelbe Karte von US-Kapitaen Ream zurueck und zeigte stattdessen Almiron wegen Schwalbe (53. Min). Allgemein als korrekt bewertet. Leitete ein klares Spiel ohne weitere Kontroversen professionell.",
      noten: [
        { quelle: "kicker", note: 2.0 },
      ],
      quellen: "ZDF, ORF Sport, sportschau.de, SN.at"
    }
  },
  {
    id: 5,
    datum: "13.06.2026", uhrzeit: "21:00", gruppe: "B",
    heim: "Katar", gast: "Schweiz", ergebnis: "1:1",
    abgeschlossen: true,
    schiedsrichter: "Hector Said Martinez",
    sr_land: "Honduras",
    sr_konfed: "CONCACAF",
    bewertung: {
      kurzfazit: "Solider Einstand - langer VAR-Check sorgte kurz fuer Unruhe",
      details: "Erster honduranischer Schiedsrichter ueberhaupt bei einer WM. Zeigte in der ersten Halbzeit nach laengerer VAR-Pruefung auf den Elfmeterpunkt fuer die Schweiz (Embolo traf). Katar rettete sich in der 94. Minute durch ein Eigentor zum 1:1-Ausgleich. Die VAR-Entscheidung wurde als korrekt eingestuft, der zeitliche Aufwand jedoch kritisch bemerkt. Ansonsten ohne grosse Kontroversen.",
      noten: [
        { quelle: "kicker", note: 3.5 },
      ],
      quellen: "Yahoo Sports, athlonsports.com, GMA News"
    }
  },
  {
    id: 6,
    datum: "14.06.2026", uhrzeit: "00:00", gruppe: "C",
    heim: "Brasilien", gast: "Marokko", ergebnis: "1:1",
    abgeschlossen: true,
    schiedsrichter: "Slavko Vincic",
    sr_land: "Slowenien",
    sr_konfed: "UEFA",
    bewertung: {
      kurzfazit: "Erfahrener Topschiedsrichter meistert Hochkaraeter souveraen",
      details: "Vincic gilt als einer der besten Schiedsrichter der Welt und leitete das Duell zweier starker Nationen ohne nennenswerte Kontroversen. Das Spiel endete 1:1 nach einer lebhaften Partie. Keine umstrittenen Entscheidungen gemeldet - der Slowene im positiven Sinne unsichtbar.",
      noten: [
        { quelle: "kicker", note: 2.0 },
      ],
      quellen: "SRF Sport, sofascore.com"
    }
  },
  {
    id: 7,
    datum: "14.06.2026", uhrzeit: "03:00", gruppe: "C",
    heim: "Haiti", gast: "Schottland", ergebnis: "0:1",
    abgeschlossen: true,
    schiedsrichter: "Mustapha Ghorbal",
    sr_land: "Algerien",
    sr_konfed: "CAF",
    bewertung: {
      kurzfazit: "Ruhige Partie, Schiedsrichter ohne Fehlgriff",
      details: "Der algerische SR leitete eine ueberschaubare Partie, in der sich Schottland muehsam mit 1:0 durchsetzte. Ghorbal traf keine auffaellig umstrittenen Entscheidungen. Neben Amin Omar einer der afrikanischen Stammkraefte bei dieser WM.",
      noten: [
        { quelle: "kicker", note: 3.0 },
      ],
      quellen: "Sportschau, athlonsports.com"
    }
  },
  {
    id: 8,
    datum: "14.06.2026", uhrzeit: "06:00", gruppe: "D",
    heim: "Australien", gast: "Tuerkei", ergebnis: "2:0",
    abgeschlossen: true,
    schiedsrichter: "Jesus Valenzuela",
    sr_land: "Venezuela",
    sr_konfed: "CONMEBOL",
    bewertung: {
      kurzfazit: "Klares Spiel, Valenzuela mit sicherer Hand",
      details: "Der Venezolaner leitete ein eindeutiges Spiel, das Australien mit 2:0 fuer sich entschied. Valenzuela ist ein erfahrener CONMEBOL-Referee und hatte bei diesem Spiel wenig grosse Entscheidungen zu treffen. Keine bemerkenswerten Kontroversen.",
      noten: [
        { quelle: "kicker", note: 2.5 },
      ],
      quellen: "Yahoo Sports, FourFourTwo, beinsports.com"
    }
  },
  {
    id: 9,
    datum: "14.06.2026", uhrzeit: "19:00", gruppe: "E",
    heim: "Deutschland", gast: "Curacao", ergebnis: "7:1",
    abgeschlossen: true,
    schiedsrichter: "Jalal Jayed",
    sr_land: "Marokko",
    sr_konfed: "CAF",
    bewertung: {
      kurzfazit: "WM-Debut ohne Patzer - klares Spiel erleichterte Aufgabe",
      details: "Jalal Jayed feierte seinen WM-Einstand beim deutschen Kanatersieg. Der 39-jaehrige Marokkaner steht seit 2019 auf der FIFA-Liste, hatte aber vor diesem Spiel erst vier Einsaetze beim Afrika-Cup. Das klare Ergebnis (7:1 durch Tore von Nmecha, Schlotterbeck, Havertz 2x, Musiala, Brown, Undav - fuer Curacao traf Comenencia) erleichterte die Aufgabe. Keine nennenswerten Fehlentscheidungen.",
      noten: [
        { quelle: "kicker", note: 3.0 },
      ],
      quellen: "kicker.de, heidelberg24.de, nationalmannschaft.net"
    }
  },
  {
    id: 10,
    datum: "14.06.2026", uhrzeit: "22:00", gruppe: "F",
    heim: "Niederlande", gast: "Japan", ergebnis: "2:2",
    abgeschlossen: true,
    schiedsrichter: "Ismail Elfath",
    sr_land: "USA",
    sr_konfed: "CONCACAF",
    bewertung: {
      kurzfazit: "Dramatisches Spiel gut im Griff - kein Fehlgriff bei Kamada-Ausgleich",
      details: "Elfath, marokkanisch-staemmiger US-Referee und 2022 bereits als vierter Offizieller im WM-Finale, leitete einen packenden 2:2-Krimi. Van Dijk (50.), Nakamura (57.), Summerville (64.) und Kamada (88.) trafen. Der dramatische Ausgleich in der 88. Minute war regelkonform. Elfath galt in der MLS als Referee des Jahres 2020 und 2022 - zeigte auch hier Klasse.",
      noten: [
        { quelle: "kicker", note: 2.0 },
      ],
      quellen: "Outlook India, NBC Sports, bolavip.com"
    }
  },
  { id: 11, datum: "15.06.2026", uhrzeit: "01:00", gruppe: "E", heim: "Cote d'Ivoire", gast: "Ecuador",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 12, datum: "15.06.2026", uhrzeit: "04:00", gruppe: "F", heim: "Schweden",      gast: "Tunesien",    ergebnis: null, abgeschlossen: false, schiedsrichter: "Yael Falcon Perez", sr_land: "Argentinien", sr_konfed: "CONMEBOL", bewertung: null },
  { id: 13, datum: "15.06.2026", uhrzeit: "18:00", gruppe: "H", heim: "Spanien",       gast: "Kap Verde",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 14, datum: "15.06.2026", uhrzeit: "21:00", gruppe: "G", heim: "Belgien",       gast: "Aegypten",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 15, datum: "16.06.2026", uhrzeit: "00:00", gruppe: "H", heim: "Saudi-Arabien", gast: "Uruguay",     ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 16, datum: "16.06.2026", uhrzeit: "03:00", gruppe: "G", heim: "Iran",          gast: "Neuseeland",  ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 17, datum: "16.06.2026", uhrzeit: "21:00", gruppe: "I", heim: "Frankreich",    gast: "Senegal",     ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 18, datum: "17.06.2026", uhrzeit: "00:00", gruppe: "I", heim: "Irak",          gast: "Norwegen",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 19, datum: "17.06.2026", uhrzeit: "03:00", gruppe: "J", heim: "Argentinien",   gast: "Algerien",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 20, datum: "17.06.2026", uhrzeit: "06:00", gruppe: "J", heim: "Oesterreich",   gast: "Jordanien",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 21, datum: "17.06.2026", uhrzeit: "19:00", gruppe: "K", heim: "Portugal",      gast: "DR Kongo",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 22, datum: "17.06.2026", uhrzeit: "22:00", gruppe: "L", heim: "England",       gast: "Kroatien",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 23, datum: "18.06.2026", uhrzeit: "01:00", gruppe: "L", heim: "Ghana",         gast: "Panama",      ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
  { id: 24, datum: "18.06.2026", uhrzeit: "04:00", gruppe: "K", heim: "Usbekistan",    gast: "Kolumbien",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,             sr_land: null,         sr_konfed: null,       bewertung: null },
];
