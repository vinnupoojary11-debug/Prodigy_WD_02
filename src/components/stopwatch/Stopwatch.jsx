import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Display from "./Display";
import Controls from "./Controls";
import LapList from "./LapList";

export default function Stopwatch() {
  const [time, setTime] = useState(0);         // total elapsed ms
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);        // { id, lapTime, totalTime }
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);           // when current run started
  const accumulatedRef = useRef(0);            // ms before current run
  const lapStartRef = useRef(0);               // ms at last lap press

  // Tick every 10ms
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setTime(accumulatedRef.current + (Date.now() - startTimeRef.current));
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    accumulatedRef.current += Date.now() - startTimeRef.current;
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    accumulatedRef.current = 0;
    lapStartRef.current = 0;
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (!isRunning) return;
    const currentTime = accumulatedRef.current + (Date.now() - startTimeRef.current);
    const lapTime = currentTime - lapStartRef.current;
    lapStartRef.current = currentTime;
    setLaps(prev => [...prev, { id: prev.length + 1, lapTime, totalTime: currentTime }]);
  };

  return (
    <div style={pageStyles.bg}>
      {/* Ambient glow orbs */}
      <div style={{ ...pageStyles.orb, top: "5%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)" }} />
      <div style={{ ...pageStyles.orb, bottom: "10%", right: "5%", width: 300, height: 300, background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=DM+Sans:wght@400;600;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #4c1d95; border-radius: 2px; }
      `}</style>

      <div style={pageStyles.card}>
        <Header isRunning={isRunning} />
        <Display time={time} />
        <Controls
          isRunning={isRunning}
          time={time}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          onLap={handleLap}
        />
        <LapList laps={laps} onClear={() => setLaps([])} />
      </div>
    </div>
  );
}

const pageStyles = {
  bg: {
    minHeight: "100vh",
    background: "#06040f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
    filter: "blur(60px)",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "0 32px 32px",
    backdropFilter: "blur(20px)",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
  },
};
