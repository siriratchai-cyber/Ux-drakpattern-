import React, { useState, useRef } from "react";
import { BrowserWindow, Chip, PrimaryBtn, LEVEL_UI, GRAD_PURPLE, GRAD_GREEN } from "../components/ui";
import { EPISODES } from "../episodes";
import { PATTERNS, PATTERN_KEYS } from "../data/patterns";
import { SDS_ITEMS, SDS_LABELS } from "../data/sds";

const PHASE = { INTRO: "intro", SCENE: "scene", EXPLAIN: "explain", CONSEQUENCE: "consequence", RECOGNIZE: "recognize", SDS_Q: "sds_q" };

export default function Game({ ctx, onFinish }) {
  const [epIdx, setEpIdx] = useState(0);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState(PHASE.INTRO);
  const [decisions, setDecisions] = useState({}); // { "1.1": {...} } current episode
  const [lastResult, setLastResult] = useState(null);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [epResults, setEpResults] = useState([]); // across all episodes
  const [sdsIdx, setSdsIdx] = useState(0);
  const [sdsAnswers, setSdsAnswers] = useState([]);
  const finishedRef = useRef(false);

  const ep = EPISODES[epIdx];
  const scene = ep.scenes[sceneIdx];

  const handleDecide = (result) => {
    setLastResult(result);
    setDecisions((d) => ({ ...d, [scene.id]: result }));
    setPhase(PHASE.EXPLAIN);
  };

  const afterExplain = () => {
    if (sceneIdx < ep.scenes.length - 1) { setSceneIdx((i) => i + 1); setPhase(PHASE.SCENE); return; }
    const cons = ep.consequence?.({ ...decisions, [scene.id]: lastResult }, ctx);
    if (cons) { setPendingConsequence(cons); setPhase(PHASE.CONSEQUENCE); }
    else setPhase(PHASE.RECOGNIZE);
  };
  const [pendingConsequence, setPendingConsequence] = useState(null);

  const finishEpisode = (selected) => {
    epResults.push({ id: ep.id, scenes: ep.scenes.map((s) => ({ id: s.id, level: decisions[s.id]?.level, patterns: s.patterns })), truth: ep.truth, selected });
    setEpResults([...epResults]);
    if (epIdx < EPISODES.length - 1) {
      setEpIdx((i) => i + 1); setSceneIdx(0); setDecisions({}); setSelectedPatterns([]); setPhase(PHASE.INTRO);
    } else { setPhase(PHASE.SDS_Q); }
  };

  /* ---------- INTRO ---------- */
  if (phase === PHASE.INTRO) return (
    <Wrap>
      <div className="text-center max-w-lg mx-auto">
        <div className="text-[12px] text-[#9B96AC] font-['Kanit'] mb-1">🕐 {ep.time} น. · สถานการณ์ {epIdx + 1}/{EPISODES.length}</div>
        <h2 className="text-[22px] font-bold text-[#3A3550] font-['Kanit'] mb-4">{ep.title}</h2>
        <p className="text-[14px] text-[#5C566E] font-['Sarabun'] leading-relaxed mb-8">{ep.intro}</p>
        <PrimaryBtn style={GRAD_PURPLE} onClick={() => setPhase(PHASE.SCENE)}>เริ่มสถานการณ์นี้ ▶</PrimaryBtn>
      </div>
    </Wrap>
  );

  /* ---------- SCENE ---------- */
  if (phase === PHASE.SCENE) return (
    <Wrap>
      <div className="max-w-2xl mx-auto">
        <Progress ep={ep} epIdx={epIdx} sceneIdx={sceneIdx} />
        <p className="text-[13px] text-[#5C566E] font-['Sarabun'] mb-3 text-center">{scene.story}</p>
        <BrowserWindow domain={scene.domain}><scene.Comp onDecide={handleDecide} prev={decisions} ctx={ctx} /></BrowserWindow>
      </div>
    </Wrap>
  );

  /* ---------- EXPLAIN ---------- */
  if (phase === PHASE.EXPLAIN) {
    const ui = LEVEL_UI[lastResult.level];
    return (
      <Wrap>
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-3">{ui.icon}</div>
          <div className="text-[20px] font-bold font-['Kanit'] mb-2" style={{ color: ui.color }}>{ui.label}</div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">{scene.patterns.map((p) => <Chip key={p}>{PATTERNS[p].icon} {PATTERNS[p].th}</Chip>)}</div>
          <div className="bg-white rounded-2xl shadow p-5 text-left mb-4">
            <p className="text-[13px] text-[#5C566E] font-['Sarabun'] leading-relaxed">{scene.explain(lastResult)}</p>
          </div>
          <div className="bg-[#F0F9F4] rounded-2xl p-4 text-left mb-6">
            <div className="text-[11px] font-bold text-[#4E9C7B] font-['Kanit'] mb-1">💡 วิธีป้องกัน</div>
            <p className="text-[12px] text-[#4E9C7B] font-['Sarabun'] leading-relaxed">{scene.patterns.map((p) => PATTERNS[p].tip).join(" ")}</p>
          </div>
          <PrimaryBtn style={GRAD_PURPLE} onClick={afterExplain}>ต่อไป →</PrimaryBtn>
        </div>
      </Wrap>
    );
  }

  /* ---------- CONSEQUENCE ---------- */
  if (phase === PHASE.CONSEQUENCE) return (
    <Wrap>
      <div className="max-w-2xl mx-auto">
        <div className="text-center text-[13px] font-bold text-[#3A3550] font-['Kanit'] mb-3">{pendingConsequence.title}</div>
        <BrowserWindow domain="ผลที่ตามมา"><pendingConsequence.Comp prev={decisions} ctx={ctx} onNext={() => setPhase(PHASE.RECOGNIZE)} /></BrowserWindow>
      </div>
    </Wrap>
  );

  /* ---------- RECOGNIZE (คำถามท้ายสถานการณ์ใหญ่) ---------- */
  if (phase === PHASE.RECOGNIZE) {
    const toggle = (k) => setSelectedPatterns((s) => s.includes(k) ? s.filter((x) => x !== k) : [...s, k]);
    return (
      <Wrap>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-5">
            <div className="text-3xl mb-2">🤔</div>
            <h3 className="text-[17px] font-bold text-[#3A3550] font-['Kanit']">จากสถานการณ์ "{ep.title}" ที่ผ่านมา<br />คุณคิดว่ามี UX Dark Pattern แบบไหนบ้าง?</h3>
            <p className="text-[11px] text-[#9B96AC] font-['Sarabun'] mt-1">เลือกได้มากกว่า 1 ข้อ</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {PATTERN_KEYS.map((k) => (
              <button key={k} onClick={() => toggle(k)}
                className={`px-3 py-3 rounded-xl text-[12px] font-['Sarabun'] text-left border transition ${selectedPatterns.includes(k) ? "bg-[#8B7FBF] text-white border-[#8B7FBF]" : "bg-white text-[#5C566E] border-[#EEEAF6]"}`}>
                {PATTERNS[k].icon} {PATTERNS[k].th}
              </button>
            ))}
          </div>
          <div className="text-center"><PrimaryBtn style={GRAD_GREEN} onClick={() => finishEpisode(selectedPatterns)}>ยืนยันคำตอบ →</PrimaryBtn></div>
        </div>
      </Wrap>
    );
  }

  /* ---------- SDS questionnaire (ก่อนแสดงผลลัพธ์สุดท้าย) ---------- */
  if (phase === PHASE.SDS_Q) {
    const answer = (val) => {
      const next = [...sdsAnswers, val];
      if (sdsIdx < SDS_ITEMS.length - 1) { setSdsAnswers(next); setSdsIdx((i) => i + 1); }
      else {
        if (finishedRef.current) return; // กันกดซ้ำ/ดับเบิลคลิก ไม่ให้บันทึกซ้ำ
        finishedRef.current = true;
        onFinish(epResults, next);
      }
    };
    return (
      <Wrap>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <div className="text-[11px] text-[#9B96AC] font-['Kanit']">แบบประเมินสุดท้าย · ข้อ {sdsIdx + 1}/{SDS_ITEMS.length}</div>
            <h3 className="text-[17px] font-bold text-[#3A3550] font-['Kanit'] mt-2 leading-relaxed">ทบทวนตลอดทั้งวันที่ผ่านมา คุณรู้สึกเห็นด้วยกับข้อความนี้แค่ไหน?</h3>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 mb-6">
            <p className="text-[14px] text-[#3A3550] font-['Sarabun'] leading-relaxed text-center mb-5">"{SDS_ITEMS[sdsIdx]}"</p>
            <div className="flex justify-between gap-1">
              {SDS_LABELS.map((l, v) => (
                <button key={v} onClick={() => answer(v)} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="w-8 h-8 rounded-full border-2 border-[#DCD9E8] group-hover:border-[#8B7FBF] group-hover:bg-[#8B7FBF] transition" />
                  <span className="text-[9px] text-[#B9B4C7] font-['Sarabun'] text-center leading-tight">{l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    );
  }
  return null;
}

function Wrap({ children }) {
  return <div className="min-h-screen px-4 py-10" style={{ background: "linear-gradient(160deg,#F5F2FA,#E6DFFB 55%,#CFF3E5)" }}>{children}</div>;
}
function Progress({ ep, epIdx, sceneIdx }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-4">
      {EPISODES.map((_, i) => <span key={i} className="h-1.5 rounded-full transition-all" style={{ width: i === epIdx ? 28 : 14, background: i <= epIdx ? "#8B7FBF" : "#E4E1EE" }} />)}
      <span className="ml-2 text-[10px] text-[#B9B4C7] font-['Sarabun']">{ep.title} · ฉาก {sceneIdx + 1}/{ep.scenes.length}</span>
    </div>
  );
}