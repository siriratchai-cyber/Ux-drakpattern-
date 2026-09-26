import React from "react";
import { PrimaryBtn, GRAD_PURPLE } from "../components/ui";
import { EPISODES } from "../episodes";

function ProgressChart({ attempts }) {
  const data = attempts.slice(-8);
  const w = 320, h = 150, padTop = 26, padBottom = 22, gap = 10;
  const barW = (w - gap * (data.length - 1)) / data.length;
  const scaleY = (score) => ((h - padTop - padBottom) * score) / 100;

  const first = data[0]?.score ?? 0;
  const last = data[data.length - 1]?.score ?? 0;
  const diff = last - first;

  return (
    <div>
      <p className="text-[12px] text-[#5C566E] font-['Sarabun'] mb-3">
        {data.length > 1
          ? diff > 0
            ? `คะแนนดีขึ้น ${diff} แต้ม เทียบกับ ${data.length} ครั้งล่าสุด 🎉`
            : diff < 0
            ? `คะแนนลดลง ${Math.abs(diff)} แต้ม จาก ${data.length} ครั้งล่าสุด — ลองสังเกตให้ละเอียดขึ้นอีกนิด`
            : `คะแนนคงที่ตลอด ${data.length} ครั้งล่าสุด`
          : "เล่นอีกสักครั้งเพื่อดูพัฒนาการ"}
      </p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C9BCE8" />
            <stop offset="100%" stopColor="#8ED9B6" />
          </linearGradient>
        </defs>
        <line x1="0" y1={h - padBottom} x2={w} y2={h - padBottom} stroke="#EEEAF6" strokeWidth="1" />
        {data.map((a, i) => {
          const bh = Math.max(4, scaleY(a.score));
          const x = i * (barW + gap);
          const y = h - padBottom - bh;
          const isLast = i === data.length - 1;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={bh} rx={6}
                fill="url(#barGrad)"
                stroke={isLast ? "#8B7FBF" : "none"} strokeWidth={isLast ? 2 : 0} />
              <text x={x + barW / 2} y={y - 6} textAnchor="middle"
                fontSize="11" fontFamily="Kanit" fontWeight="600" fill="#3A3550">
                {a.score}
              </text>
              <text x={x + barW / 2} y={h - 6} textAnchor="middle"
                fontSize="9" fontFamily="Sarabun" fill="#B9B4C7">
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Home({ user, attempts, onStart, onLogout }) {
  const best = attempts.length ? Math.max(...attempts.map((a) => a.score)) : null;
  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "linear-gradient(160deg,#F5F2FA,#E6DFFB 55%,#CFF3E5)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-[13px] text-[#5C566E] font-['Sarabun']">สวัสดี, <b className="text-[#3A3550]">{user.nickname}</b> 👋</div>
          <button onClick={onLogout} className="text-[11px] text-[#9B96AC] hover:text-[#5C566E] font-['Sarabun']">ออกจากระบบ</button>
        </div>
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🕵️‍♀️</div>
          <h1 className="text-[26px] font-bold text-[#3A3550] font-['Kanit']">จำลองสถานการณ์หนึ่งวันของคุณบนโลกออนไลน์</h1>
          <p className="text-[13px] text-[#5C566E] font-['Sarabun'] mt-2 max-w-md mx-auto leading-relaxed">
            ใช้ชีวิตหนึ่ง ผ่าน 5 สถานการณ์บนเว็บและแอปที่ใช้ในชีวิตประจำวัน แล้วดูว่าคุณจะสังเกตเห็น UX Dark Pattern ทั้ง 10 รูปแบบได้มากแค่ไหน
          </p>
        </div>
        {best !== null && (
          <div className="bg-white/70 backdrop-blur rounded-2xl p-4 mb-6 text-center">
            <span className="text-[12px] text-[#5C566E] font-['Sarabun']">คะแนนสูงสุดของคุณ: </span>
            <span className="text-[18px] font-bold text-[#8B7FBF] font-['Kanit']">{best}/100</span>
            <span className="text-[11px] text-[#9B96AC] font-['Sarabun']"> · เล่นแล้ว {attempts.length} ครั้ง</span>
          </div>
        )}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="text-[14px] font-bold text-[#3A3550] font-['Kanit'] mb-3">เส้นทางในหนึ่งวัน</div>
          <div className="space-y-2">
            {EPISODES.map((e, i) => (
              <div key={e.id} className="flex items-center gap-3 text-[12.5px] font-['Sarabun']">
                <span className="w-14 text-[#B9B4C7]">{e.time}</span>
                <span className="w-6 h-6 rounded-full bg-[#F0EDFB] text-[#8B7FBF] flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
                <span className="text-[#3A3550]">{e.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center"><PrimaryBtn style={GRAD_PURPLE} onClick={onStart}>{attempts.length ? "เล่นอีกครั้ง ▶" : "เริ่มเล่น ▶"}</PrimaryBtn></div>
        {attempts.length > 0 && (
          <div className="mt-8 bg-white/70 rounded-2xl p-5">
            <div className="text-[13px] font-bold text-[#3A3550] font-['Kanit'] mb-3">พัฒนาการของคุณ</div>
            <ProgressChart attempts={attempts} />
          </div>
        )}
      </div>
    </div>
  );
}