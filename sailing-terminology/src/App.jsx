import { useState, useEffect, useMemo, useCallback } from "react";

/* ---------------------------------------------------------
   Daten: zweisprachiges Glossar (DE / EN)
--------------------------------------------------------- */
const TERMS = [
  // Rumpf & Ausrüstung
  { de: "Rumpf", en: "Hull", cat: "Rumpf & Ausrüstung" },
  { de: "Kiel", en: "Keel", cat: "Rumpf & Ausrüstung" },
  { de: "Ruder", en: "Rudder", cat: "Rumpf & Ausrüstung" },
  { de: "Pinne", en: "Tiller", cat: "Rumpf & Ausrüstung" },
  { de: "Bug", en: "Bow", cat: "Rumpf & Ausrüstung" },
  { de: "Heck", en: "Stern", cat: "Rumpf & Ausrüstung" },
  { de: "Backbord", en: "Port", cat: "Rumpf & Ausrüstung" },
  { de: "Steuerbord", en: "Starboard", cat: "Rumpf & Ausrüstung" },

  // Segel & Rigg
  { de: "Großsegel", en: "Mainsail", cat: "Segel & Rigg" },
  { de: "Fock", en: "Jib", cat: "Segel & Rigg" },
  { de: "Genua", en: "Genoa", cat: "Segel & Rigg" },
  { de: "Spinnaker", en: "Spinnaker", cat: "Segel & Rigg" },
  { de: "Vorstag", en: "Forestay", cat: "Segel & Rigg" },
  { de: "Wante", en: "Shroud", cat: "Segel & Rigg" },
  { de: "Großschot", en: "Mainsheet", cat: "Segel & Rigg" },
  { de: "Fall", en: "Halyard", cat: "Segel & Rigg" },

  // Manöver
  { de: "Wende", en: "Tack", cat: "Manöver", note: "Wenden = Bug durch den Wind" },
  { de: "Halse", en: "Gybe / Jibe", cat: "Manöver", note: "Halsen = Heck durch den Wind" },
  { de: "Anluven", en: "Head up / Luff up", cat: "Manöver" },
  { de: "Abfallen", en: "Bear away", cat: "Manöver" },
  { de: "Beidrehen", en: "Heave to", cat: "Manöver" },
  { de: "Mann über Bord", en: "Man overboard", cat: "Manöver" },
  { de: "Anlegen", en: "Coming alongside", cat: "Manöver" },
  { de: "Ankern", en: "Anchoring", cat: "Manöver" },

  // Kurse zum Wind
  { de: "Am-Wind-Kurs", en: "Close-hauled", cat: "Kurse zum Wind" },
  { de: "Halber Wind", en: "Beam reach", cat: "Kurse zum Wind" },
  { de: "Raumschotskurs", en: "Broad reach", cat: "Kurse zum Wind" },
  { de: "Vor dem Wind", en: "Running", cat: "Kurse zum Wind" },
  { de: "Luv", en: "Windward", cat: "Kurse zum Wind" },
  { de: "Lee", en: "Leeward", cat: "Kurse zum Wind" },
  { de: "Toter Winkel", en: "No-go zone", cat: "Kurse zum Wind" },
  { de: "Hoch am Wind", en: "Pinching", cat: "Kurse zum Wind" },
  {
    de: "Fahrtwind",
    en: "Boat's motion wind",
    cat: "Kurse zum Wind",
    note: "Wahrer Wind + Fahrtwind = Scheinbarer Wind (apparent wind) — kein exaktes 1-Wort-Äquivalent im Englischen",
  },

  // Knoten
  { de: "Achtknoten", en: "Figure-eight knot", cat: "Knoten" },
  { de: "Palstek", en: "Bowline", cat: "Knoten" },
  { de: "Webleinstek", en: "Clove hitch", cat: "Knoten" },
  { de: "Kreuzknoten", en: "Reef knot", cat: "Knoten" },
  { de: "Schotstek", en: "Sheet bend", cat: "Knoten" },
  { de: "Rundtörn mit zwei halben Schlägen", en: "Round turn and two half hitches", cat: "Knoten" },
  { de: "Stopperstek", en: "Rolling hitch", cat: "Knoten" },
  { de: "Slipstek", en: "Slipped hitch", cat: "Knoten" },

  // Wetter
  { de: "Flaute", en: "Calm", cat: "Wetter" },
  { de: "Böe", en: "Gust", cat: "Wetter" },
  { de: "Windstärke", en: "Wind force", cat: "Wetter" },
  { de: "Hochdruckgebiet", en: "High-pressure area", cat: "Wetter" },
  { de: "Tiefdruckgebiet", en: "Low-pressure area", cat: "Wetter" },
  { de: "Seegang", en: "Sea state", cat: "Wetter" },
  { de: "Nebel", en: "Fog", cat: "Wetter" },
  { de: "Gewitter", en: "Thunderstorm", cat: "Wetter" },

  // Navigation
  { de: "Seekarte", en: "Chart", cat: "Navigation" },
  { de: "Kompass", en: "Compass", cat: "Navigation" },
  { de: "Peilung", en: "Bearing", cat: "Navigation" },
  { de: "Kurs", en: "Course", cat: "Navigation" },
  { de: "Gezeiten", en: "Tides", cat: "Navigation" },
  { de: "Strömung", en: "Current", cat: "Navigation" },
  { de: "Wegpunkt", en: "Waypoint", cat: "Navigation" },
  { de: "Lotung", en: "Sounding", cat: "Navigation" },

  // Vorfahrt & Sicherheit
  { de: "Vorfahrt", en: "Right of way", cat: "Vorfahrt & Sicherheit" },
  { de: "Ausweichpflichtiges Fahrzeug", en: "Give-way vessel", cat: "Vorfahrt & Sicherheit" },
  { de: "Kursbeibehaltendes Fahrzeug", en: "Stand-on vessel", cat: "Vorfahrt & Sicherheit" },
  { de: "Rettungsweste", en: "Life jacket", cat: "Vorfahrt & Sicherheit" },
  { de: "Rettungsring", en: "Lifebuoy", cat: "Vorfahrt & Sicherheit" },
  { de: "Signalkörper", en: "Shape (signal)", cat: "Vorfahrt & Sicherheit" },
  { de: "Seenotsignal", en: "Distress signal", cat: "Vorfahrt & Sicherheit" },
  { de: "Festmacherleine", en: "Mooring line", cat: "Vorfahrt & Sicherheit" },
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

  const filteredOrder = useMemo(() => {
    if (showKnownOnly === "all") return order;
    return order.filter((id) =>
      showKnownOnly === "known" ? known.has(id) : !known.has(id)
    );
  }, [order, showKnownOnly, known]);

  useEffect(() => {
    setIdx(0);
    setFlipped(false);
  }, [showKnownOnly, pool]);

  const current = useMemo(() => {
    const id = filteredOrder[idx % Math.max(filteredOrder.length, 1)];
    return pool.find((t) => t.id === id);
  }, [filteredOrder, idx, pool]);

  const next = () => {
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  const reshuffle = () => {
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

      <div className="card-stage" onClick={() => setFlipped((f) => !f)}>
        <div className={`flashcard ${flipped ? "is-flipped" : ""}`}>
          <div className="face face-front">
            <span className="face-label">DE</span>
            <span className="face-term">{current.de}</span>
            <span className="tap-hint">tippen zum umdrehen</span>
          </div>
          <div className="face face-back">
            <span className="face-label">EN</span>
            <span className="face-term">{current.en}</span>
            {current.note && <span className="face-note">{current.note}</span>}
          </div>
        </div>
      </div>

      <div className="cat-tag">{current.cat}</div>

      <div className="action-row">
        <button
          className="btn btn-ghost"
          onClick={() => {
            toggleKnown(current.id, !known.has(current.id));
          }}
        >
          {known.has(current.id) ? "✓ Als unsicher markieren" : "Als sicher markieren"}
        </button>
        <button className="btn btn-primary" onClick={next}>
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
              <th>Kategorie</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.de}</td>
                <td>{t.en}</td>
                <td className="cat-cell">{t.cat}</td>
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

* { box-sizing: border-box; }

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
.header-progress {
  margin-left: auto;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
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
  perspective: 1200px;
  height: 240px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.flashcard {
  position: relative;
  width: min(420px, 100%);
  height: 100%;
  transition: transform 0.45s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}
.flashcard.is-flipped { transform: rotateY(180deg); }
.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1.5px solid var(--navy);
  padding: 20px;
  text-align: center;
}
.face-front { background: #fff; }
.face-back { background: var(--navy); color: var(--paper); transform: rotateY(180deg); }
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
.face-note { font-size: 12.5px; opacity: 0.8; max-width: 320px; }
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
