export default function Display({ time }) {
  const ms = Math.floor((time % 1000) / 10).toString().padStart(2, "0");
  const secs = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
  const mins = Math.floor((time / 60000) % 60).toString().padStart(2, "0");
  const hrs = Math.floor(time / 3600000).toString().padStart(2, "0");

  return (
    <div style={styles.wrapper}>
      <div style={styles.timeRow}>
        {hrs !== "00" && <><span style={styles.digit}>{hrs}</span><span style={styles.colon}>:</span></>}
        <span style={styles.digit}>{mins}</span>
        <span style={styles.colon}>:</span>
        <span style={styles.digit}>{secs}</span>
        <span style={styles.dot}>.</span>
        <span style={{ ...styles.digit, ...styles.ms }}>{ms}</span>
      </div>
      <div style={styles.labels}>
        {hrs !== "00" && <span style={styles.label}>HRS</span>}
        <span style={styles.label}>MIN</span>
        <span style={styles.labelGap} />
        <span style={styles.label}>SEC</span>
        <span style={styles.labelGap} />
        <span style={{ ...styles.label, ...styles.msLabel }}>MS</span>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: "center",
    padding: "40px 0 24px",
  },
  timeRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: 2,
    fontFamily: "'Share Tech Mono', monospace",
    lineHeight: 1,
  },
  digit: {
    fontSize: "clamp(4rem, 12vw, 7rem)",
    fontWeight: 400,
    color: "#ffffff",
    letterSpacing: "-2px",
    minWidth: "2ch",
    textAlign: "center",
    textShadow: "0 0 40px rgba(139,92,246,0.5)",
  },
  ms: {
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
    color: "#a78bfa",
    textShadow: "0 0 30px rgba(167,139,250,0.6)",
  },
  colon: {
    fontSize: "clamp(3rem, 9vw, 5.5rem)",
    color: "#6d28d9",
    paddingBottom: 6,
    margin: "0 2px",
  },
  dot: {
    fontSize: "clamp(3rem, 9vw, 5.5rem)",
    color: "#6d28d9",
    paddingBottom: 6,
    margin: "0 2px",
  },
  labels: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    marginTop: 8,
  },
  label: {
    fontSize: 10,
    letterSpacing: "3px",
    color: "#6d28d9",
    fontFamily: "'DM Sans', sans-serif",
    minWidth: "calc(2ch + 4px)",
    textAlign: "center",
    padding: "0 18px",
  },
  msLabel: {
    color: "#7c3aed",
    padding: "0 10px",
  },
  labelGap: {
    width: 16,
  },
};
