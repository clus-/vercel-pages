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
      details: "3 Rote Karten (WM-Rekord im Eroeffnungsspiel): Sithole (50. Min, berechtigt), Zwane (84. Min, nach VAR - strittig), Montes (90+2. Min, berechtigt). Lag in einer an sich leicht zu leitenden Partie mit dem ersten Platzverweis richtig. Die Rote Karte gegen Zwane wegen angeblicher Taetlichkeit loeste Kritik aus. TV-Experte Patrick Ittrich (MagentaTV): Das bleibt leider haengen. Letztmals so viele Platzverweise gab es 2006 (Schlacht von Nuernberg).",
      noten: [
        { quelle: "kicker", note: 4.0 },
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
        { quelle: "kicker", note: 2.0 },
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
      kurzfazit: "Grundsaetzlich im Griff - VAR-Spielerverwechslung sorgte fuer Ungereimtheit",
      details: "Hatte die Partie bis auf Kleinigkeiten grundsaetzlich im Griff. Sorgte allerdings fuer eine groessere Ungereimtheit, als er Ream fuer ein vermeintliches Foul an Almiron Gelb zeigte, dieses aber nach VAR-Eingriff wegen Spielerverwechslung in Gelb fuer Almiron wegen Schwalbe umwandelte. Relevanz fuers Spiel hatte dies aber nicht.",
      noten: [
        { quelle: "kicker", note: 4.0 },
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
      kurzfazit: "VAR-Kontroverse - fehlende Transparenz bei Elfmeter-Ueberpruefung sorgt weltweit fuer Aerger",
      details: "Said Martinez vergab Elfmeter nach Foul von Torhueter Abunada an Freuler - VAR ueberprueft auf Abseits, zeigte aber weder Grafiken noch halbautomatische Abseitslinie. Embolo traf per Strafstoss zur Fuehrung. Gary Neville wuetend: FIFA verhalte sich wie eine Diktatur. Ex-Schiedsrichter Keith Hackett: Technologie hat versagt. Erst drei Stunden spaeter erklaerte FIFA den technischen Fehler. Katar rettete in der 90+5 durch Khoukhi den Ausgleich.",
      noten: [
        { quelle: "kicker", note: 3.5 },
      ],
      quellen: "Sportbible, GiveMeSport, STARNEWS, Eurosport, SRF Sport"
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
      kurzfazit: "Solide Leistung - Nachspielzeit zu lang, Verwarnungsluecke bei Guimaraes",
      details: "Zehn Minuten Nachspielzeit waren zu lange. Haette Bruno Guimaraes fuer das Stempeln gegen Hakimi (49.) verwarnen muessen. Marokko durch Saibari (21.) in Fuehrung, Vinicius Jr. glich in der 32. Minute fuer Brasilien aus. Vincic als erfahrener UEFA-Schiedsrichter ansonsten souveraen.",
      noten: [
        { quelle: "kicker", note: 3.0 },
      ],
      quellen: "ESPN, Mirror, CBS Sports, Morocco World News"
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
      kurzfazit: "Nicht immer souveraen - fehlende Verwarnungen und Einheitlichkeit",
      details: "Nicht immer souveraen: Experience haette fuer sein Foul gegen Gannon-Doak zwingend verwarnt werden muessen (49.), Gelb statt Rot war bei McLeans Einsteigen gegen Casimir gerade noch vertretbar (90.+5). Bei zwei potenziellen Strafstoss-Szenen (Hanley gegen Isidor, 22.; Jean Jacques gegen McTominay, 71.) mit einheitlicher Linie.",
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
      kurzfazit: "Angenehm unaufgeregt - kleinere Fehler in der Zweikampfbeurteilung",
      details: "Leitete die Partie angenehm unaufgeregt und unauffaellig. Mit kleineren Fehlern in der Zweikampfbeurteilung, hatte aber insgesamt alles im Griff. Korrekt, bei Bos' unabsichtlichem Handspiel infolge des Schusses von Yildiz aus kurzer Distanz nicht auf Strafstoss zu entscheiden (76.).",
      noten: [
        { quelle: "kicker", note: 2.0 },
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
      details: "Jalal Jayed feierte seinen WM-Einstand beim deutschen Kanatersieg. Der 39-jaehrige Marokkaner steht seit 2019 auf der FIFA-Liste, hatte aber vor diesem Spiel erst vier Einsaetze beim Afrika-Cup. Tore: Nmecha (6.), Schlotterbeck (38.), Havertz (45.+5, 88.), Musiala (47.), Brown (68.), Undav (78.) - fuer Curacao traf Comenencia (21.). Keine nennenswerten Fehlentscheidungen.",
      noten: [],
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
      kurzfazit: "Dramatisches Spiel gut im Griff - kein Fehlgriff beim Kamada-Ausgleich",
      details: "Elfath, marokkanisch-staemmiger US-Referee und 2022 vierter Offizieller im WM-Finale, leitete einen packenden 2:2-Krimi. Van Dijk (50.), Nakamura (57.), Summerville (64.) und Kamada (88.) trafen. Der dramatische Ausgleich in der 88. Minute war regelkonform. Elfath galt in der MLS als Referee des Jahres 2020 und 2022.",
      noten: [],
      quellen: "Outlook India, NBC Sports, bolavip.com"
    }
  },
  {
    id: 11,
    datum: "15.06.2026", uhrzeit: "01:00", gruppe: "E",
    heim: "Cote d'Ivoire", gast: "Ecuador", ergebnis: "1:0",
    abgeschlossen: true,
    schiedsrichter: "Francois Letexier",
    sr_land: "Frankreich",
    sr_konfed: "UEFA",
    bewertung: {
      kurzfazit: "Neue Behandlungsregel erstmals eingesetzt - Ecuador-Protest nach Sieg der Elfenbeinkueste",
      details: "Letexier sprang kurzfristig fuer den verletzten Michael Oliver ein. Setzte erstmals bei dieser WM die neue Regel um, wonach behandelte Spieler das Feld fuer mindestens eine Minute verlassen muessen (Caicedo, 18. Min). Ecuador verlor trotz viermaligem Pfosten-/Lattentreffern mit 0:1 - Amad erzielte in der 90. Minute den Siegtreffer. Ecuadors Spieler protestierten lautstark gegen mehrere Entscheidungen.",
      noten: [],
      quellen: "t-online.de, fussball-nachschlagewerk.de, weekend.at"
    }
  },
  {
    id: 12,
    datum: "15.06.2026", uhrzeit: "04:00", gruppe: "F",
    heim: "Schweden", gast: "Tunesien", ergebnis: "5:1",
    abgeschlossen: true,
    schiedsrichter: "Yael Falcon Perez",
    sr_land: "Argentinien",
    sr_konfed: "CONMEBOL",
    bewertung: {
      kurzfazit: "Klare Angelegenheit - Chip-im-Ball-Technologie bei Isak-Tor entscheidend",
      details: "Falcon Perez nutzte erstmals bei dieser WM den Chip im Ball, um eine kleine Beruehrung Isaks auf einer Hereingabe nachzuweisen und eine Abseits-Entscheidung zu kippen - Tor gueltig (30. Min). Schweden dominierte mit einem Galaauftritt: Ayari (7.), Isak (30.), Gyoekeres (59.), Svanberg sowie Ayari erneut (90.+6) - Tunesien traf durch Rekik (43.).",
      noten: [],
      quellen: "srf.ch, sportschau.de, zdf.de, fussball-nachschlagewerk.de"
    }
  },
  { id: 13, datum: "15.06.2026", uhrzeit: "18:00", gruppe: "H", heim: "Spanien",        gast: "Kap Verde",  ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 14, datum: "15.06.2026", uhrzeit: "21:00", gruppe: "G", heim: "Belgien",        gast: "Aegypten",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 15, datum: "16.06.2026", uhrzeit: "00:00", gruppe: "H", heim: "Saudi-Arabien",  gast: "Uruguay",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 16, datum: "16.06.2026", uhrzeit: "03:00", gruppe: "G", heim: "Iran",           gast: "Neuseeland", ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 17, datum: "16.06.2026", uhrzeit: "21:00", gruppe: "I", heim: "Frankreich",     gast: "Senegal",    ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 18, datum: "17.06.2026", uhrzeit: "00:00", gruppe: "I", heim: "Irak",           gast: "Norwegen",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 19, datum: "17.06.2026", uhrzeit: "03:00", gruppe: "J", heim: "Argentinien",    gast: "Algerien",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 20, datum: "17.06.2026", uhrzeit: "06:00", gruppe: "J", heim: "Oesterreich",    gast: "Jordanien",  ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 21, datum: "17.06.2026", uhrzeit: "19:00", gruppe: "K", heim: "Portugal",       gast: "DR Kongo",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 22, datum: "17.06.2026", uhrzeit: "22:00", gruppe: "L", heim: "England",        gast: "Kroatien",   ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 23, datum: "18.06.2026", uhrzeit: "01:00", gruppe: "L", heim: "Ghana",          gast: "Panama",     ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
  { id: 24, datum: "18.06.2026", uhrzeit: "04:00", gruppe: "K", heim: "Usbekistan",     gast: "Kolumbien",  ergebnis: null, abgeschlossen: false, schiedsrichter: null,                sr_land: null,          sr_konfed: null,       bewertung: null },
];
