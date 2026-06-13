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
  // --- Ab hier: SR noch nicht bekanntgegeben / Spiele noch nicht gespielt ---
  { id: 5,  datum: "13.06.2026", uhrzeit: "21:00", gruppe: "B", heim: "Katar",        gast: "Schweiz",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 6,  datum: "14.06.2026", uhrzeit: "00:00", gruppe: "C", heim: "Brasilien",    gast: "Marokko",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 7,  datum: "14.06.2026", uhrzeit: "03:00", gruppe: "C", heim: "Haiti",        gast: "Schottland",      ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 8,  datum: "14.06.2026", uhrzeit: "06:00", gruppe: "D", heim: "Australien",   gast: "Tuerkei",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 9,  datum: "14.06.2026", uhrzeit: "19:00", gruppe: "E", heim: "Deutschland",  gast: "Curacao",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 10, datum: "14.06.2026", uhrzeit: "22:00", gruppe: "F", heim: "Niederlande",  gast: "Japan",           ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 11, datum: "15.06.2026", uhrzeit: "01:00", gruppe: "E", heim: "Cote d'Ivoire",gast: "Ecuador",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 12, datum: "15.06.2026", uhrzeit: "04:00", gruppe: "F", heim: "Schweden",     gast: "Tunesien",        ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 13, datum: "15.06.2026", uhrzeit: "18:00", gruppe: "H", heim: "Spanien",      gast: "Kap Verde",       ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 14, datum: "15.06.2026", uhrzeit: "21:00", gruppe: "G", heim: "Belgien",      gast: "Aegypten",        ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 15, datum: "16.06.2026", uhrzeit: "00:00", gruppe: "H", heim: "Saudi-Arabien",gast: "Uruguay",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 16, datum: "16.06.2026", uhrzeit: "03:00", gruppe: "G", heim: "Iran",         gast: "Neuseeland",      ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 17, datum: "16.06.2026", uhrzeit: "21:00", gruppe: "I", heim: "Frankreich",   gast: "Senegal",         ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 18, datum: "17.06.2026", uhrzeit: "00:00", gruppe: "I", heim: "Irak",         gast: "Norwegen",        ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 19, datum: "17.06.2026", uhrzeit: "03:00", gruppe: "J", heim: "Argentinien",  gast: "Algerien",        ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 20, datum: "17.06.2026", uhrzeit: "06:00", gruppe: "J", heim: "Oesterreich",  gast: "Jordanien",       ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 21, datum: "17.06.2026", uhrzeit: "19:00", gruppe: "K", heim: "Portugal",     gast: "DR Kongo",        ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 22, datum: "17.06.2026", uhrzeit: "22:00", gruppe: "L", heim: "England",      gast: "Kroatien",        ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 23, datum: "18.06.2026", uhrzeit: "01:00", gruppe: "L", heim: "Ghana",        gast: "Panama",          ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
  { id: 24, datum: "18.06.2026", uhrzeit: "04:00", gruppe: "K", heim: "Usbekistan",   gast: "Kolumbien",       ergebnis: null, abgeschlossen: false, schiedsrichter: null, sr_land: null, sr_konfed: null, bewertung: null },
];
