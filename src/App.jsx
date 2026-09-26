import React, { useState, useEffect } from "react";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import Game from "./screens/Game";
import Results from "./screens/Results";
import { onAuthChange, logout, saveAttempt, loadAttempts } from "./services/backend";
import { computeTotals } from "./services/scoring";

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = ไม่ได้ล็อกอิน
  const [view, setView] = useState("home"); // home | game | results
  const [attempts, setAttempts] = useState([]);
  const [lastRun, setLastRun] = useState(null);

  useEffect(() => onAuthChange((u) => setUser(u)), []);
  useEffect(() => { if (user) loadAttempts(user).then(setAttempts); }, [user]);

  if (user === undefined) return <div className="min-h-screen flex items-center justify-center text-[#B9B4C7] font-['Sarabun']">กำลังโหลด…</div>;
  if (!user) return <Auth onDone={() => {}} />;

  if (view === "game") {
    return (
      <Game
        ctx={user}
        onFinish={async (epResults, sdsAnswers) => {
          const r = computeTotals(epResults, sdsAnswers);
          await saveAttempt(user, { score: r.score, decisionPts: r.decisionPts, recognitionPts: r.recognitionPts, sdsScore: r.sdsScore });
          const fresh = await loadAttempts(user);
          setAttempts(fresh);
          setLastRun({ epResults, sdsAnswers });
          setView("results");
        }}
      />
    );
  }
  if (view === "results" && lastRun) {
    return <Results epResults={lastRun.epResults} sdsAnswers={lastRun.sdsAnswers}
      onHome={() => setView("home")} onReplay={() => setView("game")} />;
  }
  return <Home user={user} attempts={attempts} onStart={() => setView("game")} onLogout={() => logout()} />;
}
