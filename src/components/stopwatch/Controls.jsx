export default function Controls({ isRunning, onStart, onPause, onReset, onLap, time }) {
  return (
    <div style={styles.wrapper}>
      {/* Left: Reset */}
      <button
        onClick={onReset}
        style={{ ...styles.btn, ...styles.secondary }}
        onMouseEnter={e => Object.assign(e.currentTarget.style, styles.secondaryHover)}
        onMouseLeave={e => Object.assign(e.currentTarget.style, styles.secondary)}
      >
        ↺ Reset
      </button>

      {/* Center: Start / Pause */}
      <button
        onClick={isRunning ? onPause : onStart}
        style={{ ...styles.btn, ...styles.primary, ...(isRunning ? styles.pauseColor : {}) }}
        onMouseEnter={e => Object.assign(e.currentTarget.style, { ...styles.btn, ...styles.primary, ...(isRunning ? styles.pauseColor : {}), transform: "scale(1.06)", boxShadow: "0 12px 40px rgba(139,92,246,0.5)" })}
        onMouseLeave={e => Object.assign(e.currentTarget.style, { ...styles.btn, ...styles.primary, ...(isRunning ? styles.pauseColor : {}), transform: "scale(1)", boxShadow: "0 8px 30px rgba(139,92,246,0.35)" })}
      >
        {isRunning ? "⏸ Pause" : time === 0 ? "▶ Start" : "▶ Resume"}
      </button>

      {/* Right: Lap */}
      <button
        onClick={onLap}
        disabled={!isRunning}
        style={{ ...styles.btn, ...styles.secondary, ...(isRunning ? {} : styles.disabled) }}
        onMouseEnter={e => isRunning && Object.assign(e.currentTarget.style, styles.secondaryHover)}
        onMouseLeave={e => isRunning && Object.assign(e.currentTarget.style, styles.secondary)}
      >
        ⧖ Lap
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: "8px 0 32px",
    flexWrap: "wrap",
  },
  btn: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    padding: "14px 28px",
    borderRadius: 50,
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "all 0.2s ease",
  },
  primary: {
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    color: "#fff",
    minWidth: 140,
    fontSize: 17,
    padding: "18px 40px",
    boxShadow: "0 8px 30px rgba(139,92,246,0.35)",
    transform: "scale(1)",
  },
  pauseColor: {
    background: "linear-gradient(135deg, #0891b2, #0e7490)",
    boxShadow: "0 8px 30px rgba(8,145,178,0.35)",
  },
  secondary: {
    background: "rgba(255,255,255,0.06)",
    color: "#a78bfa",
    border: "1px solid rgba(139,92,246,0.25)",
    minWidth: 100,
  },
  secondaryHover: {
    background: "rgba(139,92,246,0.15)",
    color: "#c4b5fd",
    border: "1px solid rgba(139,92,246,0.5)",
    minWidth: 100,
  },
  disabled: {
    opacity: 0.3,
    cursor: "not-allowed",
    color: "#6b7280",
    border: "1px solid rgba(255,255,255,0.08)",
  },
};
