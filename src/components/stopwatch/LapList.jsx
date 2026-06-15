function formatTime(ms) {
  const centisecs = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
  const secs = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
  const mins = Math.floor((ms / 60000) % 60).toString().padStart(2, "0");
  return `${mins}:${secs}.${centisecs}`;
}

export default function LapList({ laps, onClear }) {
  if (laps.length === 0) return null;

  const times = laps.map(l => l.lapTime);
  const best = Math.min(...times);
  const worst = Math.max(...times);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <span style={styles.title}>Laps <span style={styles.count}>{laps.length}</span></span>
        <div style={styles.legend}>
          <span style={{ ...styles.dot, background: "#10b981" }} /> Best
          <span style={{ ...styles.dot, background: "#f43f5e", marginLeft: 12 }} /> Worst
        </div>
        <button
          onClick={onClear}
          style={styles.clearBtn}
          onMouseEnter={e => (e.currentTarget.style.color = "#f87171")}
          onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}
        >
          Clear
        </button>
      </div>

      <div style={styles.list}>
        {[...laps].reverse().map((lap, i) => {
          const isBest = laps.length > 1 && lap.lapTime === best;
          const isWorst = laps.length > 1 && lap.lapTime === worst;
          return (
            <div
              key={lap.id}
              style={{
                ...styles.row,
                ...(isBest ? styles.bestRow : {}),
                ...(isWorst ? styles.worstRow : {}),
                animationDelay: `${i * 0.03}s`,
              }}
            >
              <span style={styles.lapNum}>Lap {lap.id}</span>
              <span style={styles.lapTime}>{formatTime(lap.lapTime)}</span>
              <span style={{ ...styles.total, color: isBest ? "#10b981" : isWorst ? "#f43f5e" : "#6b7280" }}>
                {formatTime(lap.totalTime)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: 8,
    borderTop: "1px solid rgba(255,255,255,0.06)",
    paddingTop: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    padding: "0 4px",
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#9ca3af",
    letterSpacing: "2px",
    fontFamily: "'DM Sans', sans-serif",
    textTransform: "uppercase",
  },
  count: {
    background: "rgba(139,92,246,0.2)",
    color: "#a78bfa",
    borderRadius: 100,
    padding: "2px 8px",
    fontSize: 11,
    marginLeft: 6,
  },
  legend: {
    display: "flex",
    alignItems: "center",
    fontSize: 11,
    color: "#6b7280",
    fontFamily: "'DM Sans', sans-serif",
    gap: 4,
  },
  dot: {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: "50%",
    marginRight: 4,
  },
  clearBtn: {
    background: "transparent",
    border: "none",
    color: "#6b7280",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "color 0.2s",
    padding: "4px 8px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    maxHeight: 280,
    overflowY: "auto",
    paddingRight: 4,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
    animation: "fadeIn 0.3s ease forwards",
    opacity: 0,
  },
  bestRow: {
    background: "rgba(16,185,129,0.07)",
    border: "1px solid rgba(16,185,129,0.2)",
  },
  worstRow: {
    background: "rgba(244,63,94,0.07)",
    border: "1px solid rgba(244,63,94,0.15)",
  },
  lapNum: {
    fontSize: 13,
    color: "#9ca3af",
    fontFamily: "'DM Sans', sans-serif",
  },
  lapTime: {
    fontSize: 16,
    fontWeight: 600,
    color: "#e5e7eb",
    fontFamily: "'Share Tech Mono', monospace",
    textAlign: "center",
  },
  total: {
    fontSize: 12,
    fontFamily: "'Share Tech Mono', monospace",
    textAlign: "right",
  },
};
