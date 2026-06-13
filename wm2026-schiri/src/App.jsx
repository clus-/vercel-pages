import { useState } from "react";
import { MATCHES } from "./matches.js";

const KONFED_COLORS = {
  UEFA: "#3060cc", CONMEBOL: "#009B3A", CONCACAF: "#FF6600",
  CAF: "#cc9900", AFC: "#CC0000", OFC: "#009999",
};

const GRUPPE_COLORS = {
  A: "#e74c3c", B: "#e67e22", C: "#d4ac0d", D: "#2ecc71",
  E: "#1abc9c", F: "#3498db", G: "#9b59b6", H: "#e91e63",
  I: "#00bcd4", J: "#8bc34a", K: "#ff5722", L: "#607d8b",
};

function noteColor(note) {
  if (note <= 2.0) return "#4CAF50";
  if (note <= 3.0) return "#8bc34a";
  if (note <= 3.5) return "#FFD700";
  if (note <= 4.5) return "#FF9800";
  return "#f44336";
}

function noteToSterne(avg) {
  return Math.max(1, Math.min(5, Math.round(6 - avg)));
}

function avgNote(noten) {
  if (!noten || noten.length === 0) return null;
  return noten.reduce((s, n) => s + n.note, 0) / noten.length;
}

// Build ref list from all matches that have a named ref
function buildRefList() {
  const map = {};
  for (const m of MATCHES) {
    if (!m.schiedsrichter) continue;
    if (!map[m.schiedsrichter]) {
      map[m.schiedsrichter] = {
        name: m.schiedsrichter,
        land: m.sr_land,
        konfed: m.sr_konfed,
        spiele: [],
      };
    }
    map[m.schiedsrichter].spiele.push(m);
  }
  return Object.values(map);
}

function Sterne({ n, max = 5, size = 14 }) {
  return (
    <span>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ color: i < n ? "#FFD700" : "#3a3a5a", fontSize: size }}>&#9733;</span>
      ))}
    </span>
  );
}

function NoteBadge({ quelle, note, size = "normal" }) {
  const color = noteColor(note);
  const dim = size === "small" ? 36 : 48;
  const fs = size === "small" ? 14 : 18;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{
        background: color, color: "#000", fontWeight: 800, fontSize: fs,
        width: dim, height: dim, borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {note.toFixed(1).replace(".", ",")}
      </div>
      <div style={{ color: "#666", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {quelle}
      </div>
    </div>
  );
}

function KonfedBadge({ konfed }) {
  if (!konfed) return null;
  return (
    <span style={{
      background: KONFED_COLORS[konfed] || "#555",
      color: "#fff", fontSize: 10, fontWeight: 700,
      padding: "2px 5px", borderRadius: 3, marginLeft: 6, verticalAlign: "middle",
    }}>{konfed}</span>
  );
}

// ── Matches page ─────────────────────────────────────────────────────────────

function MatchCard({ match, expanded, onToggle }) {
  const gc = GRUPPE_COLORS[match.gruppe] || "#888";
  const avg = match.bewertung ? avgNote(match.bewertung.noten) : null;
  const sterne = avg !== null ? noteToSterne(avg) : null;
  const hasRating = match.bewertung && match.bewertung.noten && match.bewertung.noten.length > 0;

  return (
    <div style={{
      background: "#16162e", border: "1px solid #22224a",
      borderLeft: `3px solid ${gc}`, borderRadius: 6, marginBottom: 7,
      overflow: "hidden", opacity: match.abgeschlossen ? 1 : 0.6,
    }}>
      <div
        onClick={() => match.bewertung && onToggle(match.id)}
        style={{
          display: "flex", alignItems: "center", padding: "9px 12px",
          gap: 8, cursor: match.bewertung ? "pointer" : "default", flexWrap: "wrap",
        }}
      >
        <span style={{
          background: gc, color: "#fff", fontWeight: 800, fontSize: 10,
          width: 20, height: 20, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>{match.gruppe}</span>

        <span style={{ color: "#555", fontSize: 11, flexShrink: 0, minWidth: 90 }}>
          {match.datum} {match.uhrzeit}
        </span>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, minWidth: 180 }}>
          <span style={{ color: "#dde", fontWeight: 600, fontSize: 13, textAlign: "right", flex: 1 }}>{match.heim}</span>
          <span style={{
            color: match.abgeschlossen ? "#fff" : "#3a3a5a",
            fontWeight: 700, fontSize: match.abgeschlossen ? 14 : 12,
            background: match.abgeschlossen ? "#0c0c1e" : "transparent",
            borderRadius: 4, padding: "1px 7px", minWidth: 40, textAlign: "center",
          }}>
            {match.ergebnis || "-:-"}
          </span>
          <span style={{ color: "#dde", fontWeight: 600, fontSize: 13, flex: 1 }}>{match.gast}</span>
        </div>

        <div style={{ minWidth: 160, textAlign: "right", flexShrink: 0 }}>
          {match.schiedsrichter
            ? <span style={{ color: "#a0a8cc", fontSize: 12 }}>{match.schiedsrichter}<KonfedBadge konfed={match.sr_konfed} /></span>
            : <span style={{ color: "#2a2a3a", fontSize: 11, fontStyle: "italic" }}>SR noch nicht bekanntgegeben</span>
          }
        </div>

        {hasRating && avg !== null && (
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              background: noteColor(avg), color: "#000", fontWeight: 800, fontSize: 13,
              padding: "3px 8px", borderRadius: 5, minWidth: 34, textAlign: "center",
            }}>
              {avg.toFixed(1).replace(".", ",")}
            </span>
            <Sterne n={sterne} />
            <span style={{ color: "#444", fontSize: 11 }}>{expanded ? "▲" : "▼"}</span>
          </div>
        )}
        {match.bewertung && !hasRating && (
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#555", fontSize: 11, fontStyle: "italic" }}>bewertet</span>
            <span style={{ color: "#444", fontSize: 11 }}>{expanded ? "▲" : "▼"}</span>
          </div>
        )}
      </div>

      {expanded && match.bewertung && (
        <div style={{ borderTop: "1px solid #22224a", padding: "12px 14px 14px 36px", background: "#10102a" }}>
          <div style={{ marginBottom: 10, display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ color: "#FFD700", fontWeight: 700, fontSize: 13 }}>{match.schiedsrichter}</span>
                <span style={{ color: "#555", fontSize: 12 }}>({match.sr_land})</span>
                {sterne !== null && <Sterne n={sterne} />}
              </div>
              <div style={{ color: "#c0c8e8", fontSize: 13, fontStyle: "italic", marginBottom: 8 }}>
                {match.bewertung.kurzfazit}
              </div>
              <div style={{ color: "#8888aa", fontSize: 12, lineHeight: 1.65, marginBottom: 8 }}>
                {match.bewertung.details}
              </div>
              <div style={{ color: "#333", fontSize: 11 }}>Quellen: {match.bewertung.quellen}</div>
            </div>

            {hasRating && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <div style={{ color: "#444", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                  Bewertungen (1–6)
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {match.bewertung.noten.map(n => (
                    <NoteBadge key={n.quelle} quelle={n.quelle} note={n.note} />
                  ))}
                </div>
                {match.bewertung.noten.length > 1 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: 4 }}>
                    <div style={{
                      background: noteColor(avg), color: "#000", fontWeight: 800, fontSize: 15,
                      width: 48, height: 48, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "2px solid rgba(255,255,255,0.2)",
                    }}>
                      {avg.toFixed(1).replace(".", ",")}
                    </div>
                    <div style={{ color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Schnitt</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MatchesPage() {
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("alle");
  const [gruppeFilter, setGruppeFilter] = useState("alle");

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const gruppen = ["alle", ...Array.from(new Set(MATCHES.map(m => m.gruppe))).sort()];

  const filtered = MATCHES.filter(m => {
    const f1 = filter === "alle" || (filter === "bewertet" && !!m.bewertung) || (filter === "ausstehend" && !m.abgeschlossen);
    const f2 = gruppeFilter === "alle" || m.gruppe === gruppeFilter;
    return f1 && f2;
  });

  return (
    <>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "10px 20px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {[["alle", "Alle"], ["bewertet", "Bewertet"], ["ausstehend", "Ausstehend"]].map(([f, l]) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? "#2a2a5a" : "transparent",
            border: `1px solid ${filter === f ? "#4a4a9a" : "#222"}`,
            color: filter === f ? "#fff" : "#555",
            padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
            fontWeight: filter === f ? 600 : 400,
          }}>{l}</button>
        ))}
        <div style={{ width: 1, height: 18, background: "#222", margin: "0 4px" }} />
        {gruppen.map(g => (
          <button key={g} onClick={() => setGruppeFilter(g)} style={{
            background: gruppeFilter === g ? (g === "alle" ? "#2a2a5a" : GRUPPE_COLORS[g] + "33") : "transparent",
            border: `1px solid ${gruppeFilter === g ? (GRUPPE_COLORS[g] || "#4a4a9a") : "#222"}`,
            color: gruppeFilter === g ? "#fff" : "#555",
            padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontSize: 12,
          }}>{g === "alle" ? "Alle Gruppen" : `Gr. ${g}`}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {Object.entries(KONFED_COLORS).map(([k, c]) => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: "#444" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }} />{k}
            </span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 4px", color: "#2a2a3a", fontSize: 11 }}>
        Spiele mit &#9660; enthalten eine SR-Bewertung. Noten nach kicker-Skala (1 = ausgezeichnet, 6 = ungenuegend).
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        {filtered.length === 0
          ? <div style={{ color: "#333", textAlign: "center", padding: 40, fontSize: 14 }}>Keine Spiele fuer diesen Filter.</div>
          : filtered.map(m => <MatchCard key={m.id} match={m} expanded={!!expanded[m.id]} onToggle={toggle} />)
        }
      </div>
    </>
  );
}

// ── Refs page ─────────────────────────────────────────────────────────────────

function RefGameRow({ match }) {
  const gc = GRUPPE_COLORS[match.gruppe] || "#888";
  const avg = match.bewertung ? avgNote(match.bewertung.noten) : null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
      borderBottom: "1px solid #1a1a30", flexWrap: "wrap",
      opacity: match.abgeschlossen ? 1 : 0.5,
    }}>
      <span style={{
        background: gc, color: "#fff", fontWeight: 800, fontSize: 9,
        width: 17, height: 17, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>{match.gruppe}</span>
      <span style={{ color: "#555", fontSize: 11, minWidth: 80, flexShrink: 0 }}>{match.datum}</span>
      <span style={{ color: "#aab", fontSize: 12, flex: 1, minWidth: 140 }}>
        {match.heim} <span style={{ color: "#555" }}>vs</span> {match.gast}
      </span>
      <span style={{
        color: match.abgeschlossen ? "#fff" : "#3a3a5a",
        fontWeight: 700, fontSize: 12,
        background: match.abgeschlossen ? "#0c0c1e" : "transparent",
        borderRadius: 4, padding: "1px 6px", minWidth: 36, textAlign: "center", flexShrink: 0,
      }}>
        {match.ergebnis || "–:–"}
      </span>
      {avg !== null ? (
        <span style={{
          background: noteColor(avg), color: "#000", fontWeight: 800, fontSize: 12,
          padding: "2px 7px", borderRadius: 5, flexShrink: 0,
        }}>
          {avg.toFixed(1).replace(".", ",")}
        </span>
      ) : match.abgeschlossen ? (
        <span style={{ color: "#333", fontSize: 11, fontStyle: "italic", flexShrink: 0 }}>keine Note</span>
      ) : (
        <span style={{ color: "#2a2a3a", fontSize: 11, flexShrink: 0 }}>ausstehend</span>
      )}
    </div>
  );
}

function RefGameDetail({ match }) {
  const avg = match.bewertung ? avgNote(match.bewertung.noten) : null;

  if (!match.bewertung) return null;

  return (
    <div style={{ padding: "10px 12px 12px 36px", background: "#0e0e26", borderBottom: "1px solid #1a1a30" }}>
      <div style={{ color: "#c0c8e8", fontSize: 12, fontStyle: "italic", marginBottom: 6 }}>
        {match.bewertung.kurzfazit}
      </div>
      <div style={{ color: "#888", fontSize: 11, lineHeight: 1.65, marginBottom: 8 }}>
        {match.bewertung.details}
      </div>
      {match.bewertung.noten && match.bewertung.noten.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {match.bewertung.noten.map(n => (
            <NoteBadge key={n.quelle} quelle={n.quelle} note={n.note} size="small" />
          ))}
          {match.bewertung.noten.length > 1 && avg !== null && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginLeft: 4 }}>
              <div style={{
                background: noteColor(avg), color: "#000", fontWeight: 800, fontSize: 12,
                width: 36, height: 36, borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.15)",
              }}>
                {avg.toFixed(1).replace(".", ",")}
              </div>
              <div style={{ color: "#555", fontSize: 9, textTransform: "uppercase" }}>Schnitt</div>
            </div>
          )}
        </div>
      )}
      <div style={{ color: "#2a2a3a", fontSize: 10, marginTop: 6 }}>Quellen: {match.bewertung.quellen}</div>
    </div>
  );
}

function RefCard({ ref: r }) {
  const [expanded, setExpanded] = useState(false);
  const [expandedGame, setExpandedGame] = useState(null);

  const ratedGames = r.spiele.filter(m => m.bewertung && m.bewertung.noten && m.bewertung.noten.length > 0);
  const allNoten = ratedGames.flatMap(m => m.bewertung.noten);
  const overallAvg = allNoten.length > 0
    ? allNoten.reduce((s, n) => s + n.note, 0) / allNoten.length
    : null;
  const sterne = overallAvg !== null ? noteToSterne(overallAvg) : null;

  const toggleGame = (id) => setExpandedGame(prev => prev === id ? null : id);

  return (
    <div style={{
      background: "#16162e", border: "1px solid #22224a", borderRadius: 8,
      marginBottom: 8, overflow: "hidden",
    }}>
      {/* Ref header row */}
      <div
        onClick={() => setExpanded(p => !p)}
        style={{
          display: "flex", alignItems: "center", padding: "12px 14px",
          gap: 12, cursor: "pointer", flexWrap: "wrap",
        }}
      >
        {/* Big grade badge */}
        <div style={{ flexShrink: 0 }}>
          {overallAvg !== null ? (
            <div style={{
              background: noteColor(overallAvg), color: "#000", fontWeight: 900,
              fontSize: 20, width: 54, height: 54, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {overallAvg.toFixed(1).replace(".", ",")}
            </div>
          ) : (
            <div style={{
              background: "#1a1a30", color: "#333", fontWeight: 700,
              fontSize: 12, width: 54, height: 54, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid #22224a",
            }}>
              –
            </div>
          )}
        </div>

        {/* Name + info */}
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 3 }}>
            {r.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ color: "#666", fontSize: 12 }}>{r.land}</span>
            <KonfedBadge konfed={r.konfed} />
            {sterne !== null && <Sterne n={sterne} size={13} />}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexShrink: 0 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#FFD700", lineHeight: 1 }}>{r.spiele.length}</div>
            <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", marginTop: 2 }}>Spiele</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#4CAF50", lineHeight: 1 }}>{ratedGames.length}</div>
            <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", marginTop: 2 }}>Bewertet</div>
          </div>
        </div>

        <span style={{ color: "#444", fontSize: 13 }}>{expanded ? "▲" : "▼"}</span>
      </div>

      {/* Games list */}
      {expanded && (
        <div style={{ borderTop: "1px solid #22224a" }}>
          {r.spiele.map(m => (
            <div key={m.id}>
              <div
                onClick={() => m.bewertung && toggleGame(m.id)}
                style={{ cursor: m.bewertung ? "pointer" : "default" }}
              >
                <RefGameRow match={m} />
              </div>
              {expandedGame === m.id && <RefGameDetail match={m} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RefsPage() {
  const [sortBy, setSortBy] = useState("note");
  const [konfedFilter, setKonfedFilter] = useState("alle");

  const refs = buildRefList();

  const filtered = konfedFilter === "alle" ? refs : refs.filter(r => r.konfed === konfedFilter);

  const sorted = [...filtered].sort((a, b) => {
    const avgA = (() => {
      const n = a.spiele.flatMap(m => m.bewertung?.noten ?? []);
      return n.length ? n.reduce((s, x) => s + x.note, 0) / n.length : null;
    })();
    const avgB = (() => {
      const n = b.spiele.flatMap(m => m.bewertung?.noten ?? []);
      return n.length ? n.reduce((s, x) => s + x.note, 0) / n.length : null;
    })();

    if (sortBy === "note") {
      if (avgA === null && avgB === null) return 0;
      if (avgA === null) return 1;
      if (avgB === null) return -1;
      return avgA - avgB; // lower note = better = first
    }
    if (sortBy === "spiele") return b.spiele.length - a.spiele.length;
    return a.name.localeCompare(b.name);
  });

  const konfeds = ["alle", ...Array.from(new Set(refs.map(r => r.konfed).filter(Boolean))).sort()];

  return (
    <>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "10px 20px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ color: "#444", fontSize: 11, marginRight: 4 }}>Sortierung:</span>
        {[["note", "Note"], ["spiele", "Spiele"], ["name", "Name"]].map(([s, l]) => (
          <button key={s} onClick={() => setSortBy(s)} style={{
            background: sortBy === s ? "#2a2a5a" : "transparent",
            border: `1px solid ${sortBy === s ? "#4a4a9a" : "#222"}`,
            color: sortBy === s ? "#fff" : "#555",
            padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12,
            fontWeight: sortBy === s ? 600 : 400,
          }}>{l}</button>
        ))}
        <div style={{ width: 1, height: 18, background: "#222", margin: "0 4px" }} />
        {konfeds.map(k => (
          <button key={k} onClick={() => setKonfedFilter(k)} style={{
            background: konfedFilter === k
              ? (k === "alle" ? "#2a2a5a" : (KONFED_COLORS[k] || "#555") + "44")
              : "transparent",
            border: `1px solid ${konfedFilter === k ? (KONFED_COLORS[k] || "#4a4a9a") : "#222"}`,
            color: konfedFilter === k ? "#fff" : "#555",
            padding: "4px 10px", borderRadius: 20, cursor: "pointer", fontSize: 12,
          }}>{k === "alle" ? "Alle Konfed." : k}</button>
        ))}
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 4px", color: "#2a2a3a", fontSize: 11 }}>
        Durchschnittsnote aus allen bewerteten Spielen. Klicken zum Aufklappen.
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        {sorted.length === 0
          ? <div style={{ color: "#333", textAlign: "center", padding: 40, fontSize: 14 }}>Keine Schiedsrichter gefunden.</div>
          : sorted.map(r => <RefCard key={r.name} ref={r} />)
        }
      </div>
    </>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("spiele");

  const gespielt  = MATCHES.filter(m => m.abgeschlossen).length;
  const bewertet  = MATCHES.filter(m => m.bewertung).length;
  const ausstehend = MATCHES.length - gespielt;
  const refCount = new Set(MATCHES.map(m => m.schiedsrichter).filter(Boolean)).size;

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c1e", fontFamily: "system-ui, -apple-system, sans-serif", color: "#e0e0f0" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #08081a 0%, #180830 100%)", borderBottom: "1px solid #22224a", padding: "18px 20px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>FIFA World Cup 2026</div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Schiedsrichter-Uebersicht</h1>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {[["Gespielt", gespielt, "#FFD700"], ["Bewertet", bewertet, "#4CAF50"], ["Ausstehend", ausstehend, "#3498db"], ["SRs", refCount, "#9b59b6"]].map(([l, v, c]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: c, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 10, background: "rgba(255,200,0,0.06)", border: "1px solid rgba(255,200,0,0.15)", borderRadius: 4, padding: "5px 10px", fontSize: 11, color: "#997700" }}>
            &#9889; SR-Zuteilung durch FIFA erst 24-48 Std. vor Spielbeginn offiziell
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 6 }}>
            {[["spiele", "Spiele"], ["schiedsrichter", "Schiedsrichter"]].map(([t, l]) => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: "transparent",
                border: "none",
                borderBottom: tab === t ? "2px solid #7b61ff" : "2px solid transparent",
                color: tab === t ? "#fff" : "#555",
                padding: "8px 18px",
                cursor: "pointer", fontSize: 13, fontWeight: tab === t ? 700 : 400,
                marginBottom: -1,
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {tab === "spiele" ? <MatchesPage /> : <RefsPage />}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 20px", color: "#2a2a3a", fontSize: 10, borderTop: "1px solid #16162e", marginTop: 8 }}>
        Stand: 13.06.2026 | SR-Bewertungen aus deutschen und internationalen Medien (kicker, MagentaTV, ZDF, Sportschau, Tagesspiegel, ORF)
      </div>
    </div>
  );
}
