import React from "react";
import { PrimaryBtn, Chip, GRAD_PURPLE } from "../components/ui";
import { computeTotals, analyzePatterns, getBadge } from "../services/scoring";
import { PATTERNS } from "../data/patterns";

export default function Results({ epResults, sdsAnswers, onHome, onReplay }) {
  const r = computeTotals(epResults, sdsAnswers);
  const { missed } = analyzePatterns(epResults);
  const badge = getBadge(r.score);
  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "linear-gradient(160deg,#F5F2FA,#E6DFFB 55%,#CFF3E5)" }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="text-[13px] text-[#9B96AC] font-['Kanit']">ผลการประเมินท่องโลกออนไลน์</div>
          <div className="text-[56px] font-bold text-[#3A3550] font-['Kanit'] leading-none my-2">{r.score}<span className="text-[20px] text-[#B9B4C7]">/100</span></div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: badge.bg }}>
            <span className="text-xl">{badge.emoji}</span>
            <span className="text-[13px] font-bold font-['Kanit']" style={{ color: badge.color }}>{badge.name}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 mb-4">
          <div className="text-[13px] font-bold text-[#3A3550] font-['Kanit'] mb-3">คะแนนแยกตามส่วน</div>
          {[["การตัดสินใจในสถานการณ์", r.decisionPts, 60], ["การสังเกตรูปแบบ Dark Pattern", r.recognitionPts, 30], ["แบบประเมินความรู้สึก (SDS)", r.sdsPts, 10]].map(([l, v, m]) => (
            <div key={l} className="mb-3">
              <div className="flex justify-between text-[12px] text-[#5C566E] font-['Sarabun'] mb-1"><span>{l}</span><span>{v}/{m}</span></div>
              <div className="h-2 rounded-full bg-[#F0EDF7]"><div className="h-2 rounded-full bg-gradient-to-r from-[#C9BCE8] to-[#8B7FBF]" style={{ width: `${(v / m) * 100}%` }} /></div>
            </div>
          ))}
          <div className="text-[10px] text-[#B9B4C7] font-['Sarabun'] mt-1">คะแนนความมืดของระบบที่คุณให้ไว้ (SDS): {r.sdsScore}/100</div>
        </div>

        {missed.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-5 mb-4">
            <div className="text-[13px] font-bold text-[#3A3550] font-['Kanit'] mb-2">🎯 รูปแบบที่ควรระวังเพิ่มเติม</div>
            <div className="flex flex-wrap gap-2 mb-2">{missed.map((k) => <Chip key={k} color="#B7873A" bg="#FFF3D9">{PATTERNS[k].icon} {PATTERNS[k].th}</Chip>)}</div>
            <p className="text-[12px] text-[#5C566E] font-['Sarabun'] leading-relaxed">ลองเล่นอีกครั้งและสังเกตรายละเอียดเล็ก ๆ อย่างข้อความสีจาง ปุ่มที่ถูกติ๊กไว้ล่วงหน้า และตัวเลขนับถอยหลัง</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <div className="text-[13px] font-bold text-[#3A3550] font-['Kanit'] mb-2">🛡️ สรุปการป้องกันตัวเอง</div>
          <ul className="text-[12px] text-[#5C566E] font-['Sarabun'] leading-relaxed list-disc pl-4 space-y-1">
            <li>ตรวจรายการและยอดเงินก่อนกดยืนยันทุกครั้ง (Hidden Costs, Sneak into Basket)</li>
            <li>อย่ารีบตัดสินใจเพราะตัวจับเวลาหรือคำว่า "เหลือน้อย" (Fake Urgency, Scarcity)</li>
            <li>ตรวจช่องติ๊กที่ถูกเลือกไว้ล่วงหน้าเสมอ (Preselected Options)</li>
            <li>การปฏิเสธไม่ใช่เรื่องผิด อย่าให้ข้อความกดดันทำให้เปลี่ยนใจ (Confirmshaming)</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <PrimaryBtn style={GRAD_PURPLE} className="flex-1" onClick={onReplay}>เล่นอีกครั้ง</PrimaryBtn>
          <button onClick={onHome} className="flex-1 py-3.5 rounded-full bg-white text-[#8B7FBF] font-['Kanit'] font-semibold shadow">กลับหน้าหลัก</button>
        </div>
      </div>
    </div>
  );
}
