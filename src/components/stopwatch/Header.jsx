export default function Header({ isRunning }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <div style={styles.logo}>⏱</div>
        <div>
          <h1 style={styles.title}>Stopwatch</h1>
          <p style={styles.sub}>Precision time tracking</p>
        </div>
      </div>
      <div style={styles.status}>
        <span style={{
          ...styles.dot,
          background: isRunning ? "#10b981" : "#374151",
          boxShadow: isRunning ? "0 0 10px #10b981" : "none",
          animation: isRunning ? "pulse 1.4s ease-in-out infinite" : "none",
        }} />
        <span style={{ ...styles.statusText, color: isRunning ? "#10b981" : "#6b7280" }}>
          {isRunning ? "Running" : "Stopped"}
        </span>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 0 8px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    marginBottom: 8,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    fontSize: 28,
    lineHeight: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.5px",
    fontFamily: "'DM Sans', sans-serif",
    margin: 0,
  },
  sub: {
    fontSize: 11,
    color: "#6b7280",
    letterSpacing: "1px",
    fontFamily: "'DM Sans', sans-serif",
    margin: 0,
    textTransform: "uppercase",
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block",
    transition: "all 0.3s ease",
  },
  statusText: {
    fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "1px",
    transition: "color 0.3s ease",
  },
};
