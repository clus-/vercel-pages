import { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* ---------------------------------------------------------
   Daten: zweisprachiges Glossar (DE / EN)
--------------------------------------------------------- */
const TERMS = [
  // Rumpf & Ausrüstung
  { de: "Rumpf", en: "Hull", cat: "Rumpf & Ausrüstung", exDE: "Der Rumpf ist aus GFK gefertigt.", exEN: "The hull is made of fibreglass." },
  { de: "Kiel", en: "Keel", cat: "Rumpf & Ausrüstung", exDE: "Der Kiel verhindert, dass das Boot kentert.", exEN: "The keel prevents the boat from capsizing." },
  { de: "Ruder", en: "Rudder", cat: "Rumpf & Ausrüstung", exDE: "Das Ruder steuert den Kurs des Bootes.", exEN: "The rudder steers the boat's course." },
  { de: "Pinne", en: "Tiller", cat: "Rumpf & Ausrüstung", exDE: "Zieh die Pinne zu dir, um abzufallen.", exEN: "Pull the tiller toward you to bear away." },
  { de: "Bug", en: "Bow", cat: "Rumpf & Ausrüstung", exDE: "Der Bug schneidet durch die Wellen.", exEN: "The bow cuts through the waves." },
  { de: "Heck", en: "Stern", cat: "Rumpf & Ausrüstung", exDE: "Die Gangway liegt am Heck des Schiffes.", exEN: "The gangway is at the stern of the vessel." },
  { de: "Backbord", en: "Port", cat: "Rumpf & Ausrüstung", exDE: "Das rote Licht ist auf Backbordseite.", exEN: "The red light is on the port side." },
  { de: "Steuerbord", en: "Starboard", cat: "Rumpf & Ausrüstung", exDE: "Das grüne Licht ist auf Steuerbordseite.", exEN: "The green light is on the starboard side." },
  { de: "Reling", en: "Guardrail", cat: "Rumpf & Ausrüstung", exDE: "Halt dich an der Reling fest!", exEN: "Hold on to the guardrail!" },
  { de: "Mast", en: "Mast", cat: "Rumpf & Ausrüstung", exDE: "Der Mast ist 18 Meter hoch.", exEN: "The mast is 18 metres tall." },
  { de: "Winsch", en: "Winch", cat: "Rumpf & Ausrüstung", exDE: "Hol die Schot auf der Winsch ein!", exEN: "Haul the sheet in on the winch!" },
  { de: "Klampe", en: "Cleat", cat: "Rumpf & Ausrüstung", exDE: "Belege die Leine an der Klampe.", exEN: "Belay the line on the cleat." },
  { de: "Luk", en: "Hatch", cat: "Rumpf & Ausrüstung", exDE: "Schließ das Luk vor der Böe!", exEN: "Close the hatch before the squall!" },
  { de: "Tiefgang", en: "Draft", cat: "Rumpf & Ausrüstung", exDE: "Zu wenig Wasser für unseren Tiefgang.", exEN: "Not enough water for our draft." },
  { de: "Anker", en: "Anchor", cat: "Rumpf & Ausrüstung", exDE: "Der Anker hält auf sandigem Grund gut.", exEN: "The anchor holds well in sand." },
  { de: "Cockpit", en: "Cockpit", cat: "Rumpf & Ausrüstung", exDE: "Im Cockpit sitzt der Steuermann.", exEN: "The helmsman sits in the cockpit." },

  // Segel & Rigg
  { de: "Großsegel", en: "Mainsail", cat: "Segel & Rigg", exDE: "Wir setzen das Großsegel bei Wind 3.", exEN: "We hoist the mainsail in force 3." },
  { de: "Fock", en: "Jib", cat: "Segel & Rigg", exDE: "Roll die Fock bei dieser Brise aus!", exEN: "Unfurl the jib in this breeze!" },
  { de: "Genua", en: "Genoa", cat: "Segel & Rigg", exDE: "Die Genua überlappt den Mast weit.", exEN: "The genoa overlaps the mast considerably." },
  { de: "Spinnaker", en: "Spinnaker", cat: "Segel & Rigg", exDE: "Vor dem Wind setzen wir den Spinnaker.", exEN: "We set the spinnaker when running downwind." },
  { de: "Vorstag", en: "Forestay", cat: "Segel & Rigg", exDE: "Die Fock hängt am Vorstag.", exEN: "The jib is hanked to the forestay." },
  { de: "Wante", en: "Shroud", cat: "Segel & Rigg", exDE: "Die Wanten halten den Mast seitlich.", exEN: "The shrouds support the mast laterally." },
  { de: "Großschot", en: "Mainsheet", cat: "Segel & Rigg", exDE: "Fier die Großschot beim Abfallen!", exEN: "Ease the mainsheet when bearing away!" },
  { de: "Fall", en: "Halyard", cat: "Segel & Rigg", exDE: "Hiss das Großsegel am Fall hoch!", exEN: "Hoist the mainsail on the halyard!" },
  { de: "Baum", en: "Boom", cat: "Segel & Rigg", exDE: "Vorsicht – der Baum kommt beim Halsen!", exEN: "Watch out – the boom comes across when gybing!" },
  { de: "Dirk", en: "Topping lift", cat: "Segel & Rigg", exDE: "Spann den Dirk, bevor du das Großsegel rollst.", exEN: "Tension the topping lift before furling the mainsail." },
  { de: "Baumniederholer", en: "Kicker / Boom vang", cat: "Segel & Rigg", exDE: "Der Baumniederholer verhindert, dass der Baum aufsteigt.", exEN: "The boom vang prevents the boom from lifting." },
  { de: "Achterliek", en: "Leech", cat: "Segel & Rigg", exDE: "Das Achterliek flattert – Schot nachgeben!", exEN: "The leech is fluttering – ease the sheet!" },

  // Manöver
  { de: "Wende", en: "Tack", cat: "Manöver", note: "Wenden = Bug durch den Wind", exDE: "Klar zum Wenden – Lee-oh!", exEN: "Ready about – lee-oh!" },
  { de: "Halse", en: "Gybe / Jibe", cat: "Manöver", note: "Halsen = Heck durch den Wind", exDE: "Vorsicht beim Halsen – der Baum kommt!", exEN: "Watch out when gybing – the boom is coming!" },
  { de: "Anluven", en: "Head up / Luff up", cat: "Manöver", exDE: "Luf an und steuere enger an den Wind!", exEN: "Head up and sail closer to the wind!" },
  { de: "Abfallen", en: "Bear away", cat: "Manöver", exDE: "Fall ab und geh auf Raumschotkurs!", exEN: "Bear away and head onto a reach!" },
  { de: "Beidrehen", en: "Heave to", cat: "Manöver", exDE: "Wir drehen bei, um eine Pause zu machen.", exEN: "We heave to for a rest." },
  { de: "Mann über Bord", en: "Man overboard", cat: "Manöver", exDE: "Mann über Bord – sofort Rettungsring werfen!", exEN: "Man overboard – throw the lifebuoy immediately!" },
  { de: "Anlegen", en: "Coming alongside", cat: "Manöver", exDE: "Wir legen backbords an den Steg an.", exEN: "We're coming alongside the berth on the port side." },
  { de: "Ankern", en: "Anchoring", cat: "Manöver", exDE: "Wir ankern in der geschützten Bucht.", exEN: "We're anchoring in the sheltered bay." },
  { de: "Leine klar machen", en: "Clear the line", cat: "Manöver", exDE: "Mach die Leine klar, bevor wir ablegen!", exEN: "Clear the line before we cast off!" },
  { de: "Reffen", en: "To reef", cat: "Manöver", exDE: "Bei Stärke 6 müssen wir das Großsegel reffen.", exEN: "In force 6 we need to reef the mainsail." },
  { de: "Ablegen", en: "To cast off", cat: "Manöver", exDE: "Alle Leinen los – wir legen ab!", exEN: "Cast off all lines – we're departing!" },

  // Kurse zum Wind
  { de: "Am-Wind-Kurs", en: "Close-hauled", cat: "Kurse zum Wind", exDE: "Am-Wind-Kurs ist der schärfste Kurs.", exEN: "Close-hauled is the closest point of sail to the wind." },
  { de: "Halber Wind", en: "Beam reach", cat: "Kurse zum Wind", exDE: "Bei halbem Wind segeln wir schnell.", exEN: "On a beam reach we sail fast." },
  { de: "Raumschotskurs", en: "Broad reach", cat: "Kurse zum Wind", exDE: "Auf Raumschotskurs kommen wir gut voran.", exEN: "On a broad reach we make good progress." },
  { de: "Vor dem Wind", en: "Running", cat: "Kurse zum Wind", exDE: "Vor dem Wind läuft das Boot ruhig.", exEN: "Running before the wind the boat is stable." },
  { de: "Luv", en: "Windward", cat: "Kurse zum Wind", exDE: "Auf der Luvseite kommt der Wind an.", exEN: "The wind comes from the windward side." },
  { de: "Lee", en: "Leeward", cat: "Kurse zum Wind", exDE: "Auf der Leeseite ist es ruhiger.", exEN: "It's calmer on the leeward side." },
  { de: "Toter Winkel", en: "No-go zone", cat: "Kurse zum Wind", exDE: "Im toten Winkel kann das Segel nicht füllen.", exEN: "In the no-go zone the sail cannot fill." },
  { de: "Hoch am Wind", en: "Pinching", cat: "Kurse zum Wind", exDE: "Hoch am Wind flattert das Vorliek.", exEN: "When pinching the luff starts to flutter." },
  { de: "Scheinbarer Wind", en: "Apparent wind", cat: "Kurse zum Wind", note: "Wahrer Wind + Fahrtwind = Scheinbarer Wind", exDE: "Der scheinbare Wind kommt stärker und weiter vorn an.", exEN: "The apparent wind feels stronger and further forward." },
  { de: "Wahrer Wind", en: "True wind", cat: "Kurse zum Wind", exDE: "Der wahre Wind kommt aus Nordwest.", exEN: "The true wind is from the north-west." },

  // Knoten
  { de: "Achtknoten", en: "Figure-eight knot", cat: "Knoten", exDE: "Mach einen Achtknoten ans Schotende!", exEN: "Tie a figure-eight at the end of the sheet!" },
  { de: "Palstek", en: "Bowline", cat: "Knoten", exDE: "Ein Palstek lässt sich leicht lösen.", exEN: "A bowline is easy to untie even after loading." },
  { de: "Webleinstek", en: "Clove hitch", cat: "Knoten", exDE: "Befestige die Leine mit einem Webleinstek am Poller.", exEN: "Secure the line to the bollard with a clove hitch." },
  { de: "Kreuzknoten", en: "Reef knot", cat: "Knoten", exDE: "Binde die Reffleine mit einem Kreuzknoten.", exEN: "Tie the reefing line with a reef knot." },
  { de: "Schotstek", en: "Sheet bend", cat: "Knoten", exDE: "Der Schotstek verbindet zwei verschieden dicke Leinen.", exEN: "The sheet bend joins two lines of different thickness." },
  { de: "Rundtörn mit zwei halben Schlägen", en: "Round turn and two half hitches", cat: "Knoten", exDE: "Belege die Ankerleine mit einem Rundtörn.", exEN: "Secure the anchor line with a round turn and two half hitches." },
  { de: "Stopperstek", en: "Rolling hitch", cat: "Knoten", exDE: "Ein Stopperstek hält auf einer gespannten Leine.", exEN: "A rolling hitch holds firm on a loaded line." },
  { de: "Slipstek", en: "Slipped hitch", cat: "Knoten", exDE: "Ein Slipstek lässt sich blitzschnell lösen.", exEN: "A slipped hitch can be released instantly." },

  // Wetter
  { de: "Flaute", en: "Calm", cat: "Wetter", exDE: "In der Flaute hängen die Segel schlaff.", exEN: "In a calm the sails hang limp." },
  { de: "Böe", en: "Gust", cat: "Wetter", exDE: "Eine Böe ließ das Boot schlagartig krängen.", exEN: "A gust suddenly heeled the boat." },
  { de: "Windstärke", en: "Wind force", cat: "Wetter", exDE: "Windstärke 5 ist ideales Segelwetter.", exEN: "Force 5 is ideal sailing weather." },
  { de: "Hochdruckgebiet", en: "High-pressure area", cat: "Wetter", exDE: "Das Hoch bringt beständiges, ruhiges Wetter.", exEN: "The high brings settled, calm weather." },
  { de: "Tiefdruckgebiet", en: "Low-pressure area", cat: "Wetter", exDE: "Das Tief bringt Wind und Regen.", exEN: "The low brings wind and rain." },
  { de: "Seegang", en: "Sea state", cat: "Wetter", exDE: "Bei hohem Seegang war das Cockpit nass.", exEN: "In a high sea state the cockpit was wet." },
  { de: "Nebel", en: "Fog", cat: "Wetter", exDE: "Im Nebel immer das Nebelhorn benutzen!", exEN: "Always sound the fog horn in fog!" },
  { de: "Gewitter", en: "Thunderstorm", cat: "Wetter", exDE: "Gewitterfront im Anmarsch – in den Hafen!", exEN: "Thunderstorm approaching – head for port!" },
  { de: "Schwell", en: "Swell", cat: "Wetter", exDE: "Hoher Schwell aus Nordwest machte die Fahrt ungemütlich.", exEN: "Heavy swell from the north-west made the passage uncomfortable." },
  { de: "Windschatten", en: "Wind shadow", cat: "Wetter", exDE: "Im Windschatten der Insel herrscht Flaute.", exEN: "In the wind shadow of the island there is a calm." },

  // Navigation
  { de: "Seekarte", en: "Chart", cat: "Navigation", exDE: "Die Seekarte zeigt alle Untiefen.", exEN: "The chart shows all the shallows." },
  { de: "Kompass", en: "Compass", cat: "Navigation", exDE: "Steuere Kurs 270 Grad nach dem Kompass.", exEN: "Steer a course of 270 degrees by the compass." },
  { de: "Peilung", en: "Bearing", cat: "Navigation", exDE: "Nimm eine Peilung vom Leuchtturm!", exEN: "Take a bearing from the lighthouse!" },
  { de: "Kurs", en: "Course", cat: "Navigation", exDE: "Unser Kurs ist Südsüdwest.", exEN: "Our course is south-southwest." },
  { de: "Gezeiten", en: "Tides", cat: "Navigation", exDE: "Die Gezeiten wechseln alle sechs Stunden.", exEN: "The tides change every six hours." },
  { de: "Strömung", en: "Current", cat: "Navigation", exDE: "Die Strömung treibt uns vom Kurs ab.", exEN: "The current is setting us off course." },
  { de: "Wegpunkt", en: "Waypoint", cat: "Navigation", exDE: "Der nächste Wegpunkt liegt 12 Meilen entfernt.", exEN: "The next waypoint is 12 miles away." },
  { de: "Lotung", en: "Sounding", cat: "Navigation", exDE: "Nimm eine Lotung, bevor wir ankern!", exEN: "Take a sounding before we anchor!" },
  { de: "GPS", en: "GPS", cat: "Navigation", exDE: "Das GPS zeigt unsere genaue Position.", exEN: "The GPS shows our exact position." },
  { de: "Echolot", en: "Echo sounder", cat: "Navigation", exDE: "Das Echolot misst die Tiefe unter dem Kiel.", exEN: "The echo sounder measures the depth below the keel." },
  { de: "Leuchtturm", en: "Lighthouse", cat: "Navigation", exDE: "Der Leuchtturm blinkt alle fünf Sekunden.", exEN: "The lighthouse flashes every five seconds." },
  { de: "Fahrwasser", en: "Channel / Fairway", cat: "Navigation", exDE: "Im Fahrwasser haben wir genug Wasser unterm Kiel.", exEN: "In the channel we have enough water under the keel." },
  { de: "Knoten (Geschwindigkeit)", en: "Knot (speed)", cat: "Navigation", exDE: "Wir segeln mit 6 Knoten.", exEN: "We're sailing at 6 knots." },

  // Vorfahrt & Sicherheit
  { de: "Vorfahrt", en: "Right of way", cat: "Vorfahrt & Sicherheit", exDE: "Wer hat Vorfahrt beim Kreuzen?", exEN: "Who has right of way when crossing?" },
  { de: "Ausweichpflichtiges Fahrzeug", en: "Give-way vessel", cat: "Vorfahrt & Sicherheit", exDE: "Als Motorboot sind wir das ausweichpflichtige Fahrzeug.", exEN: "As a motorboat we are the give-way vessel." },
  { de: "Kursbeibehaltendes Fahrzeug", en: "Stand-on vessel", cat: "Vorfahrt & Sicherheit", exDE: "Als Segelboot sind wir kursbeibehaltendes Fahrzeug.", exEN: "As a sailing boat we are the stand-on vessel." },
  { de: "Rettungsweste", en: "Life jacket", cat: "Vorfahrt & Sicherheit", exDE: "Beim Nachtsegelei immer Rettungsweste anlegen!", exEN: "Always wear a life jacket when sailing at night!" },
  { de: "Rettungsring", en: "Lifebuoy", cat: "Vorfahrt & Sicherheit", exDE: "Der Rettungsring hängt griffbereit am Heck.", exEN: "The lifebuoy hangs within reach at the stern." },
  { de: "Signalkörper", en: "Shape (signal)", cat: "Vorfahrt & Sicherheit", exDE: "Das schwarze Rhombus-Signal zeigt: Boot unter Maschine.", exEN: "The black diamond shape indicates: vessel under power." },
  { de: "Seenotsignal", en: "Distress signal", cat: "Vorfahrt & Sicherheit", exDE: "Drei rote Leuchtkugeln = Seenotsignal.", exEN: "Three red flares = distress signal." },
  { de: "Festmacherleine", en: "Mooring line", cat: "Vorfahrt & Sicherheit", exDE: "Wirf die Festmacherleine an Land!", exEN: "Throw the mooring line ashore!" },
  { de: "Sicherheitsgurt", en: "Safety harness", cat: "Vorfahrt & Sicherheit", exDE: "Im Sturm immer den Sicherheitsgurt anlegen!", exEN: "Always wear a safety harness in a storm!" },
  { de: "Sicherheitsleine", en: "Jackline", cat: "Vorfahrt & Sicherheit", exDE: "Hak dich an die Sicherheitsleine ein, bevor du nach vorn gehst.", exEN: "Clip onto the jackline before going forward." },
  { de: "Überlebensinsel", en: "Life raft", cat: "Vorfahrt & Sicherheit", exDE: "Die Überlebensinsel ist die letzte Rettung.", exEN: "The life raft is the last resort." },
  { de: "EPIRB", en: "EPIRB", cat: "Vorfahrt & Sicherheit", exDE: "Der EPIRB wird bei echtem Notfall aktiviert.", exEN: "The EPIRB is activated in a genuine emergency." },
].map((t, i) => ({ ...t, id: `t${i}` }));

const CATEGORIES = [...new Set(TERMS.map((t) => t.cat))];

/* ---------------------------------------------------------
   Storage helpers (persistente Lernstände)
--------------------------------------------------------- */
const STORE_KEY = "seemannssprache:known-v1";

function useKnownStore() {
  const [known, setKnown] = useState(() => new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setKnown(new Set(JSON.parse(raw)));
    } catch (_) {
      // kein gespeicherter Stand vorhanden
    } finally {
      setReady(true);
    }
  }, []);

  const persist = useCallback((nextSet) => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify([...nextSet]));
    } catch (_) {
      /* still in-memory even if persistence fails */
    }
  }, []);

  const toggleKnown = useCallback(
    (id, value) => {
      setKnown((prev) => {
        const next = new Set(prev);
        if (value) next.add(id);
        else next.delete(id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const resetKnown = useCallback(() => {
    setKnown(new Set());
    persist(new Set());
  }, [persist]);

  return { known, ready, toggleKnown, resetKnown };
}

/* ---------------------------------------------------------
   Utilities
--------------------------------------------------------- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(term, pool, count) {
  const sameCat = pool.filter((t) => t.cat === term.cat && t.id !== term.id);
  const others = pool.filter((t) => t.cat !== term.cat && t.id !== term.id);
  const chosen = shuffle(sameCat).slice(0, count);
  if (chosen.length < count) {
    chosen.push(...shuffle(others).slice(0, count - chosen.length));
  }
  return chosen;
}

// FLIP_MS: Flip-Animation-Dauer, nur noch in CSS-Template referenziert
const FLIP_MS = 450;
// SLIDE_MS: Karte-wechseln-Animation — muss zu .card-slide-* in CSS passen
const SLIDE_MS = 380;

/* ---------------------------------------------------------
   Compass Rose — Signatur-Element
--------------------------------------------------------- */
function CompassRose({ size = 64, spin = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={spin ? "compass-spin" : ""}
      style={{ flexShrink: 0 }}
    >
      <circle cx="50" cy="50" r="47" fill="none" stroke="#C7A04B" strokeWidth="1" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="#C7A04B" strokeWidth="0.5" opacity="0.6" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const major = i % 4 === 0;
        const len = major ? 14 : 7;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + Math.sin(rad) * (47 - len);
        const y1 = 50 - Math.cos(rad) * (47 - len);
        const x2 = 50 + Math.sin(rad) * 47;
        const y2 = 50 - Math.cos(rad) * 47;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#C7A04B"
            strokeWidth={major ? 1.4 : 0.7}
          />
        );
      })}
      <polygon points="50,12 56,50 50,46 44,50" fill="#B5482F" />
      <polygon points="50,88 56,50 50,54 44,50" fill="#EFE7D8" />
      <circle cx="50" cy="50" r="2.5" fill="#C7A04B" />
    </svg>
  );
}

/* ---------------------------------------------------------
   Flashcard Mode
--------------------------------------------------------- */
function FlashcardMode({ pool, known, toggleKnown }) {
  const [order, setOrder] = useState(() => shuffle(pool).map((t) => t.id));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showKnownOnly, setShowKnownOnly] = useState("all"); // all | unknown | known
  const [slideOut, setSlideOut] = useState(false);
  const [prevIdx, setPrevIdx] = useState(null);
  const [prevFlipped, setPrevFlipped] = useState(false);
  const slideTimer = useRef(null);

  const filteredOrder = useMemo(() => {
    if (showKnownOnly === "all") return order;
    return order.filter((id) =>
      showKnownOnly === "known" ? known.has(id) : !known.has(id)
    );
  }, [order, showKnownOnly, known]);

  useEffect(() => {
    clearTimeout(slideTimer.current);
    setSlideOut(false);
    setPrevIdx(null);
    setIdx(0);
    setFlipped(false);
  }, [showKnownOnly, pool]);

  useEffect(() => () => clearTimeout(slideTimer.current), []);

  const current = useMemo(() => {
    const id = filteredOrder[idx % Math.max(filteredOrder.length, 1)];
    return pool.find((t) => t.id === id);
  }, [filteredOrder, idx, pool]);

  const prevCard = useMemo(() => {
    if (prevIdx === null) return null;
    const id = filteredOrder[prevIdx % Math.max(filteredOrder.length, 1)];
    return pool.find((t) => t.id === id);
  }, [filteredOrder, prevIdx, pool]);

  const next = () => {
    if (slideOut) return;
    setPrevIdx(idx);
    setPrevFlipped(flipped);
    setIdx((i) => i + 1);
    setFlipped(false);
    setSlideOut(true);
    slideTimer.current = setTimeout(() => {
      setPrevIdx(null);
      setSlideOut(false);
    }, SLIDE_MS);
  };

  const reshuffle = () => {
    clearTimeout(slideTimer.current);
    setSlideOut(false);
    setPrevIdx(null);
    setOrder(shuffle(pool).map((t) => t.id));
    setIdx(0);
    setFlipped(false);
  };

  if (!current) {
    return (
      <div className="empty-state">
        <p>Keine Karten in diesem Filter. Wechsle den Filter oder die Kategorie.</p>
      </div>
    );
  }

  return (
    <div className="mode-wrap">
      <div className="filter-row">
        {["all", "unknown", "known"].map((f) => (
          <button
            key={f}
            className={`pill ${showKnownOnly === f ? "pill-active" : ""}`}
            onClick={() => setShowKnownOnly(f)}
          >
            {f === "all" ? "Alle" : f === "unknown" ? "Noch lernen" : "Sicher"}
          </button>
        ))}
        <button className="pill" onClick={reshuffle} style={{ marginLeft: "auto" }}>
          ⟲ Mischen
        </button>
      </div>

      <div
        className="card-stage"
        onClick={() => { if (!slideOut) setFlipped((f) => !f); }}
      >
        {slideOut && prevCard && (
          <div className="card-wrapper card-slide-out">
            <div className={`flashcard ${prevFlipped ? "is-flipped" : ""}`}>
              <div className="face face-front">
                <span className="face-label">DE</span>
                <span className="face-term">{prevCard.de}</span>
                {prevCard.exDE && <span className="face-note">{prevCard.exDE}</span>}
                <span className="tap-hint">tippen zum umdrehen</span>
              </div>
              <div className="face face-back">
                <span className="face-label">EN</span>
                <span className="face-term">{prevCard.en}</span>
                {prevCard.exEN && <span className="face-note">{prevCard.exEN}</span>}
                {prevCard.note && <span className="face-note face-note-meta">{prevCard.note}</span>}
              </div>
            </div>
          </div>
        )}
        <div className={`card-wrapper ${slideOut ? "card-slide-in" : ""}`}>
          <div className={`flashcard ${!slideOut && flipped ? "is-flipped" : ""}`}>
            <div className="face face-front">
              <span className="face-label">DE</span>
              <span className="face-term">{current.de}</span>
              {current.exDE && <span className="face-note">{current.exDE}</span>}
              <span className="tap-hint">tippen zum umdrehen</span>
            </div>
            <div className="face face-back">
              <span className="face-label">EN</span>
              <span className="face-term">{current.en}</span>
              {current.exEN && <span className="face-note">{current.exEN}</span>}
              {current.note && <span className="face-note face-note-meta">{current.note}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="cat-tag">{current.cat}</div>

      <div className="action-row">
        <button
          className={`btn ${known.has(current.id) ? "btn-mark-unsafe" : "btn-mark-safe"}`}
          onClick={() => toggleKnown(current.id, !known.has(current.id))}
        >
          {known.has(current.id) ? "✓ Als unsicher markieren" : "Als sicher markieren"}
        </button>
        <button className="btn btn-primary" onClick={next} disabled={slideOut}>
          Nächste →
        </button>
      </div>

      <div className="depth-mark">
        {(idx % filteredOrder.length) + 1} / {filteredOrder.length}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Quiz Mode
--------------------------------------------------------- */
function QuizMode({ pool }) {
  const [direction, setDirection] = useState("de-en"); // de-en | en-de
  const [round, setRound] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const question = useMemo(() => {
    if (pool.length < 4) return null;
    const term = shuffle(pool)[round % pool.length];
    const wrongTerms = pickDistractors(term, pool, 3);
    const isDeEn = direction === "de-en";
    const prompt = isDeEn ? term.de : term.en;
    const correctAnswer = isDeEn ? term.en : term.de;
    const options = shuffle([
      correctAnswer,
      ...wrongTerms.map((t) => (isDeEn ? t.en : t.de)),
    ]);
    return { term, prompt, correctAnswer, options, isDeEn };
  }, [pool, round, direction]);

  const choose = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
    setScore((s) => ({
      correct: s.correct + (option === question.correctAnswer ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const nextRound = () => {
    setSelected(null);
    setRevealed(false);
    setRound((r) => r + 1);
  };

  if (!question) {
    return (
      <div className="empty-state">
        <p>Mindestens 4 Begriffe in der Auswahl nötig für den Quiz-Modus.</p>
      </div>
    );
  }

  return (
    <div className="mode-wrap">
      <div className="filter-row">
        <button
          className={`pill ${direction === "de-en" ? "pill-active" : ""}`}
          onClick={() => {
            setDirection("de-en");
            nextRound();
          }}
        >
          DE → EN
        </button>
        <button
          className={`pill ${direction === "en-de" ? "pill-active" : ""}`}
          onClick={() => {
            setDirection("en-de");
            nextRound();
          }}
        >
          EN → DE
        </button>
        <span className="score-tag" style={{ marginLeft: "auto" }}>
          {score.correct} / {score.total} richtig
        </span>
      </div>

      <div className="quiz-prompt">
        <span className="face-label">{question.isDeEn ? "DE" : "EN"}</span>
        <span className="quiz-term">{question.prompt}</span>
        <span className="cat-tag" style={{ marginTop: 8 }}>
          {question.term.cat}
        </span>
      </div>

      <div className="options-grid">
        {question.options.map((opt) => {
          let cls = "option-btn";
          if (revealed) {
            if (opt === question.correctAnswer) cls += " option-correct";
            else if (opt === selected) cls += " option-wrong";
          }
          return (
            <button key={opt} className={cls} onClick={() => choose(opt)}>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="action-row">
          {question.term.note && <div className="quiz-note">{question.term.note}</div>}
          <button className="btn btn-primary" onClick={nextRound}>
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Browse / Search Mode
--------------------------------------------------------- */
function BrowseMode({ pool }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter(
      (t) =>
        t.de.toLowerCase().includes(q) ||
        t.en.toLowerCase().includes(q) ||
        t.cat.toLowerCase().includes(q)
    );
  }, [pool, query]);

  return (
    <div className="mode-wrap">
      <input
        className="search-input"
        placeholder="Suche – Deutsch, Englisch oder Kategorie…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="table-wrap">
        <table className="term-table">
          <thead>
            <tr>
              <th>Deutsch</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.de}</td>
                <td>{t.en}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">Keine Treffer für „{query}“.</div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   App
--------------------------------------------------------- */
export default function App() {
  const [mode, setMode] = useState("flashcards");
  const [activeCat, setActiveCat] = useState("Alle");
  const { known, ready, toggleKnown, resetKnown } = useKnownStore();

  const pool = useMemo(
    () => (activeCat === "Alle" ? TERMS : TERMS.filter((t) => t.cat === activeCat)),
    [activeCat]
  );

  const knownInPool = pool.filter((t) => known.has(t.id)).length;

  return (
    <div className="app-root">
      <style>{CSS}</style>

      <header className="app-header">
        <CompassRose size={56} />
        <div className="header-text">
          <h1>Seemannssprache</h1>
          <p>Begriffe für Segeln &amp; RYA-Praxis — Deutsch &amp; Englisch im Vergleich</p>
        </div>
        <div className="depth-mark header-progress">
          {ready ? `${knownInPool} / ${pool.length} sicher` : "lädt…"}
        </div>
      </header>

      <nav className="mode-nav">
        {[
          ["flashcards", "Karteikarten"],
          ["quiz", "Quiz"],
          ["browse", "Nachschlagen"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`mode-btn ${mode === key ? "mode-btn-active" : ""}`}
            onClick={() => setMode(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="cat-row">
        <button
          className={`pill ${activeCat === "Alle" ? "pill-active" : ""}`}
          onClick={() => setActiveCat("Alle")}
        >
          Alle ({TERMS.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`pill ${activeCat === c ? "pill-active" : ""}`}
            onClick={() => setActiveCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <main className="app-main">
        {mode === "flashcards" && (
          <FlashcardMode pool={pool} known={known} toggleKnown={toggleKnown} />
        )}
        {mode === "quiz" && <QuizMode pool={pool} />}
        {mode === "browse" && <BrowseMode pool={pool} />}
      </main>

      <footer className="app-footer">
        <span>{TERMS.length} Begriffe · {CATEGORIES.length} Kategorien</span>
        <button className="link-btn" onClick={resetKnown}>
          Lernstand zurücksetzen
        </button>
      </footer>
    </div>
  );
}

/* ---------------------------------------------------------
   Styles — Seekarten-Ästhetik
--------------------------------------------------------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

:root {
  --navy: #0E2A3D;
  --navy-deep: #081A26;
  --paper: #EFE7D6;
  --paper-dim: #E2D8C2;
  --teal: #2F6F62;
  --rust: #B5482F;
  --brass: #C7A04B;
  --ink: #1C2A2E;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--navy-deep); }

.app-root {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 0%, #123349 0%, var(--navy-deep) 60%);
  color: var(--paper);
  font-family: 'IBM Plex Sans', sans-serif;
  padding: 24px 16px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid rgba(199,160,74,0.35);
  padding-bottom: 16px;
  min-width: 0;
}
.compass-spin { animation: spin 60s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .compass-spin { animation: none; } }

.header-text h1 {
  font-family: 'Spectral', serif;
  font-weight: 700;
  font-size: 28px;
  margin: 0;
  letter-spacing: 0.3px;
}
.header-text p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--paper-dim);
  opacity: 0.85;
}
.header-text {
  flex: 1;
  min-width: 0;
}
.header-progress {
  flex-shrink: 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--brass);
  white-space: nowrap;
}

.mode-nav {
  display: flex;
  gap: 8px;
}
.mode-btn {
  flex: 1;
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(199,160,74,0.3);
  color: var(--paper-dim);
  border-radius: 6px;
  font-size: 14px;
  font-family: 'IBM Plex Sans', sans-serif;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mode-btn:hover { border-color: var(--brass); color: var(--paper); }
.mode-btn-active {
  background: var(--teal);
  border-color: var(--teal);
  color: #fff;
  font-weight: 600;
}

.cat-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.pill {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(239,231,214,0.25);
  background: transparent;
  color: var(--paper-dim);
  font-size: 12.5px;
  cursor: pointer;
  white-space: nowrap;
}
.pill:hover { border-color: var(--brass); }
.pill-active {
  background: var(--brass);
  border-color: var(--brass);
  color: var(--navy-deep);
  font-weight: 600;
}

.app-main {
  background: var(--paper);
  color: var(--ink);
  border-radius: 10px;
  padding: 24px;
  min-height: 420px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.35);
  background-image:
    linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px);
  background-size: 24px 24px;
}

.mode-wrap { display: flex; flex-direction: column; gap: 18px; }

.filter-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.filter-row .pill { border-color: rgba(28,42,46,0.25); color: var(--ink); }
.filter-row .pill-active { background: var(--teal); border-color: var(--teal); color: #fff; }

.card-stage {
  position: relative;
  overflow: hidden;
  height: 240px;
  cursor: pointer;
}
.card-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  perspective: 1200px;
}
@keyframes slide-out-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-115%); }
}
@keyframes slide-in-right {
  from { transform: translateX(115%); }
  to   { transform: translateX(0); }
}
.card-slide-out { animation: slide-out-left ${SLIDE_MS / 1000}s ease-in forwards; }
.card-slide-in  { animation: slide-in-right ${SLIDE_MS / 1000}s ease-out forwards; }
.flashcard {
  position: relative;
  width: min(420px, 100%);
  height: 100%;
  transition: transform ${FLIP_MS / 1000}s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}
.flashcard.is-flipped { transform: rotateY(180deg); }
.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  text-align: center;
}
.face-front { background: var(--paper); box-shadow: inset 0 0 0 1px rgba(28,42,46,0.12); }
.face-back { background: var(--navy); color: var(--paper); transform: rotateY(180deg); box-shadow: inset 0 0 0 1px rgba(199,160,74,0.25); }
.face-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--rust);
  font-weight: 600;
}
.face-back .face-label { color: var(--brass); }
.face-term {
  font-family: 'Spectral', serif;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
}
.face-note { font-size: 12.5px; opacity: 0.85; max-width: 320px; }
.face-note-meta { font-size: 11px; opacity: 0.6; font-style: italic; }
.tap-hint { font-size: 11px; color: #8a8275; }

.cat-tag {
  align-self: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11.5px;
  color: var(--teal);
  border: 1px solid var(--teal);
  padding: 3px 10px;
  border-radius: 999px;
}

.action-row { display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap; }
.btn {
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.btn-primary { background: var(--rust); color: #fff; }
.btn-primary:hover { background: #9c3c25; }
.btn-ghost { background: transparent; border: 1px solid var(--ink); color: var(--ink); }
.btn-ghost:hover { background: rgba(28,42,46,0.06); }
.btn-mark-safe { background: var(--teal); color: #fff; border: none; }
.btn-mark-safe:hover { background: #245c50; }
.btn-mark-unsafe { background: var(--brass); color: var(--navy-deep); border: none; font-weight: 600; }
.btn-mark-unsafe:hover { background: #b08a3c; }

.depth-mark {
  align-self: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: #6b6354;
}

.empty-state { text-align: center; padding: 40px 10px; color: #6b6354; }

.quiz-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 28px 10px;
}
.quiz-term { font-family: 'Spectral', serif; font-size: 30px; font-weight: 600; }
.score-tag { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--teal); }

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
@media (max-width: 480px) { .options-grid { grid-template-columns: 1fr; } }
.option-btn {
  padding: 14px 12px;
  border-radius: 6px;
  border: 1.5px solid rgba(28,42,46,0.25);
  background: #fff;
  font-size: 14.5px;
  text-align: left;
  cursor: pointer;
}
.option-btn:hover { border-color: var(--teal); }
.option-correct { background: #e3efe9; border-color: var(--teal); font-weight: 600; }
.option-wrong { background: #f6e3dd; border-color: var(--rust); }
.quiz-note { font-size: 12.5px; color: #6b6354; text-align: center; max-width: 360px; }

.search-input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 6px;
  border: 1.5px solid rgba(28,42,46,0.25);
  font-size: 14px;
  font-family: 'IBM Plex Sans', sans-serif;
}
.table-wrap { max-height: 420px; overflow-y: auto; border-radius: 6px; border: 1px solid rgba(28,42,46,0.12); }
.term-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.term-table thead th {
  position: sticky; top: 0;
  background: var(--navy); color: var(--paper);
  text-align: left; padding: 10px 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11.5px; letter-spacing: 1px;
}
.term-table tbody td { padding: 9px 12px; border-bottom: 1px solid rgba(28,42,46,0.08); }
.term-table tbody tr:hover { background: rgba(47,111,98,0.06); }
.cat-cell { color: var(--teal); font-size: 12.5px; }

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--paper-dim);
  opacity: 0.7;
}
.link-btn {
  background: none; border: none; color: var(--brass);
  text-decoration: underline; cursor: pointer; font-size: 12px; opacity: 0.9;
}
.link-btn:hover { opacity: 1; }
`;
