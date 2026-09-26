import React, { useState, useRef } from "react";
import { PhoneFrame } from "../components/ui";

/* ================= 2.1 ข้อเสนอทดลองใช้ฟรี ================= */
function Trial({ onDecide }) {
  const [tip, setTip] = useState(false);
  const [read, setRead] = useState(false);
  const start = () => onDecide({ level: read ? "partial" : "trapped", trial: true, note: read ? "เริ่มทดลองใช้ฟรี หลังเปิดอ่านเงื่อนไขแล้ว" : "เริ่มทดลองใช้ฟรีโดยไม่ได้เปิดอ่านเงื่อนไข" });
  const decline = () => onDecide({ level: "safe", trial: false, note: "ปฏิเสธข้อเสนอ แม้ปุ่มจะใช้ข้อความกดดัน" });
  return (
    <div className="bg-[#FFFDF9] flex min-h-[440px]">
      <div className="hidden md:flex flex-col w-48 border-r border-[#F5F2E8] px-5 py-6 gap-4 text-[13px] text-[#C7BE9C] font-['Sarabun']">
        <div className="text-[15px] font-bold text-[#3A3550] font-['Kanit'] mb-4">MelodyMood</div>
        <span>หน้าแรก</span><span>ค้นหา</span><span>คลังเพลง</span><span>เพลย์ลิสต์ของฉัน</span>
      </div>
      <div className="flex-1 px-8 py-8">
        <div className="rounded-2xl p-7 shadow-lg bg-gradient-to-br from-[#FDF1C7] via-[#FBE3D6] to-[#FBD8E3]">
          <div className="text-[13px] font-['Kanit'] text-[#8B6F3E] mb-1">🎉 ฉลอง 10 ล้านผู้ใช้!</div>
          <div className="text-[22px] font-bold text-[#3A3550] font-['Kanit'] mb-1">รับพรีเมียมฟรี 30 วัน</div>
          <p className="text-[13px] text-[#5C566E] font-['Sarabun'] mb-4">ฟังเพลงแบบไม่มีโฆษณา ดาวน์โหลดออฟไลน์ และเสียงคุณภาพสูงสุด</p>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[11px] text-[#9B916F] font-['Sarabun']">เงื่อนไขการสมัคร</span>
            <button onClick={() => { setTip((v) => !v); setRead(true); }} className="w-4 h-4 rounded-full border border-[#D8CE9E] text-[9px] text-[#9B916F] flex items-center justify-center hover:bg-white/50">?</button>
          </div>
          {tip && <div className="mb-4 bg-white/80 border border-[#F0E3B0] rounded-xl p-3 text-[12px] text-[#8A7A3E] font-['Sarabun'] leading-relaxed">หลังจบช่วงทดลอง 30 วัน ระบบจะหักเงิน 199 บาท/เดือนโดยอัตโนมัติจากบัตรของท่าน ทุกเดือนจนกว่าจะยกเลิกเอง</div>}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={start} className="px-6 py-3 rounded-full bg-[#F5A8C4] text-white text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">เริ่มทดลองใช้ฟรี</button>
            <button onClick={decline} className="px-5 py-3 rounded-full bg-white/70 text-[#9B96AC] text-[12px] font-['Sarabun'] hover:bg-white">ไม่ล่ะ ฉันชอบฟังเพลงแบบมีโฆษณาคั่นทุกเพลง</button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">{[1, 2, 3].map((i) => <div key={i} className="h-24 rounded-xl bg-[#F5F2FA]" />)}</div>
      </div>
    </div>
  );
}

/* ================= 2.2 เลือกแพ็กเกจ ================= */
function Plan({ onDecide }) {
  const [o, setO] = useState({ family: true, auto: true, sms: true });
  const confirm = () => {
    const trapped = o.family || o.auto;
    onDecide({ level: trapped ? "trapped" : "partial", subscribed: true, family: o.family,
      note: trapped ? `ยืนยันสมัครโดยยังคงตัวเลือกที่ติ๊กไว้ล่วงหน้า (${[o.family && "Family +60", o.auto && "ต่ออายุอัตโนมัติ", o.sms && "SMS โปรโมชัน"].filter(Boolean).join(", ")})` : "ยืนยันสมัคร แต่ยกเลิกตัวเลือกเสริมที่ถูกติ๊กไว้ทั้งหมด" });
  };
  const skip = () => onDecide({ level: "safe", subscribed: false, note: "เลือก 'ไว้ทีหลัง' ไม่สมัครแพ็กเกจในตอนนี้" });
  const Row = ({ k, t, s }) => (
    <label className="flex items-start gap-2 text-left py-2">
      <input type="checkbox" className="mt-1 accent-[#8B7FBF]" checked={o[k]} onChange={(e) => setO({ ...o, [k]: e.target.checked })} />
      <span><span className="text-[13px] text-[#3A3550] font-['Sarabun']">{t}</span><br /><span className="text-[10px] text-[#C7C2D6] font-['Sarabun']">{s}</span></span>
    </label>
  );
  return (
    <div className="bg-[#FFFDF9] min-h-[440px] relative">
      <div className="px-8 py-6">
        <div className="text-[16px] font-bold text-[#3A3550] font-['Kanit'] mb-3">🎵 Chill Vibes · เพลย์ลิสต์ยอดนิยม</div>
        {[1, 2, 3, 4].map((i) => (<div key={i} className="flex items-center gap-3 py-2 border-b border-[#F5F2FA]"><span className="text-[#C9BCE8]">🔒</span><div className="h-3 w-1/2 rounded bg-[#EEEAF6]" /></div>))}
      </div>
      <div className="absolute inset-0 bg-[#3A3550]/30 flex items-center justify-center p-5">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6">
          <div className="text-[16px] font-semibold text-[#3A3550] font-['Kanit']">เพลงนี้สำหรับสมาชิก Premium</div>
          <div className="text-[12px] text-[#5C566E] font-['Sarabun'] mb-2">แพ็กเกจ Solo · 199 บาท/เดือน</div>
          <div className="border-t border-[#F0EDF7] my-1" />
          <Row k="family" t="อัปเกรดเป็น Family Plan (+60 บาท/เดือน)" s="ใช้ได้สูงสุด 6 บัญชี" />
          <Row k="auto" t="ต่ออายุอัตโนมัติทุกเดือน" s="ยกเลิกได้ในเมนูตั้งค่า" />
          <Row k="sms" t="รับข่าวสารและโปรโมชันทาง SMS" s="อาจมีค่าบริการตามผู้ให้บริการ" />
          <button onClick={confirm} className="mt-3 w-full py-3 rounded-full bg-[#F5A8C4] text-white text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">ยืนยันสมัครเลย</button>
          <button onClick={skip} className="mt-3 w-full text-[10px] text-[#D5D1E2] hover:text-[#9B96AC] font-['Sarabun']">ไว้ทีหลัง</button>
        </div>
      </div>
    </div>
  );
}

/* ================= ผลที่ตามมา: แจ้งเตือนถูกหักเงิน ================= */
function Charged({ prev, onNext }) {
  const amount = 199 + (prev["2.2"]?.family ? 60 : 0);
  return (
    <div className="bg-[#FBFAFD] py-6 px-4 min-h-[440px]">
      <div className="text-center mb-4 text-[12px] text-[#D97A7A] font-['Kanit']">⚠️ ฉากจำลองผลที่ตามมา (เพื่อการเรียนรู้)</div>
      <PhoneFrame tint="#1F1B2E">
        <div className="px-5 pt-8 pb-4 text-center" style={{ background: "linear-gradient(160deg,#3A3550,#6B5F8C)" }}>
          <div className="text-white/60 text-[11px] font-['Sarabun']">30 วันต่อมา</div>
          <div className="text-white text-[38px] font-['Kanit'] leading-tight">09:41</div>
        </div>
        <div className="p-3 space-y-2 bg-[#F5F2FA] min-h-[230px]">
          <div className="rounded-2xl bg-white p-3 shadow animate-[fadeIn_0.4s_ease]">
            <div className="text-[10px] text-[#9B96AC] font-['Sarabun']">MyBank · ตอนนี้</div>
            <div className="text-[13px] text-[#3A3550] font-['Kanit']">💳 ยอดเงิน {amount} บาท ถูกหักจากบัญชีของคุณ</div>
            <div className="text-[11.5px] text-[#5C566E] font-['Sarabun'] mt-0.5">รายการ: MelodyMood Premium — ค่าสมาชิกรายเดือนแบบต่ออายุอัตโนมัติ</div>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow opacity-90">
            <div className="text-[10px] text-[#9B96AC] font-['Sarabun']">MelodyMood · ตอนนี้</div>
            <div className="text-[12px] text-[#5C566E] font-['Sarabun']">ขอบคุณที่ใช้บริการ ครั้งต่อไปจะหักในอีก 30 วัน</div>
          </div>
        </div>
      </PhoneFrame>
      <div className="max-w-sm mx-auto mt-5 text-center">
        <p className="text-[13px] text-[#5C566E] font-['Sarabun'] leading-relaxed">คุณจำไม่ได้ว่าสมัครตอนไหน ตอนนี้คุณอยากรู้ว่าต้องยกเลิกที่ไหน…</p>
        <button onClick={onNext} className="mt-4 px-8 py-3 rounded-full text-white font-['Kanit'] font-semibold shadow-lg" style={{ background: "linear-gradient(135deg,#C9BCE8,#8B7FBF)" }}>ต่อไป →</button>
      </div>
    </div>
  );
}

export default {
  id: "ep2", time: "10:30", title: "เพลย์ลิสต์แสนสมบูรณ์แบบ",
  intro: "ช่วงสายคุณอยากฟังเพลงระหว่างทำงาน แอปเพลง MelodyMood จึงกลายเป็นตัวเลือกแรกที่คุณเปิด…",
  scenes: [
    { id: "2.1", title: "ข้อเสนอทดลองใช้ฟรี", domain: "app.melodymood.co", story: "หน้าแรกของแอปมีแบนเนอร์ข้อเสนอพิเศษขนาดใหญ่", patterns: ["Forced Continuity", "Hidden Costs", "Confirmshaming"], Comp: Trial,
      explain: (r) => r.trial
        ? (r.note.includes("หลังเปิดอ่าน")
          ? "เงื่อนไขการหักเงิน 199 บาท/เดือนซ่อนอยู่หลังปุ่ม '?' ตัวเล็ก (Hidden Costs) คุณเปิดอ่านแล้ว แต่ Forced Continuity ยังอาศัยความลืมยกเลิกเมื่อครบ 30 วัน"
          : "ค่าใช้จ่ายจริงซ่อนอยู่หลังปุ่ม '?' ตัวเล็ก (Hidden Costs) เมื่อครบ 30 วันระบบจะหักเงินอัตโนมัติ (Forced Continuity) และปุ่มปฏิเสธพยายามให้รู้สึกผิด (Confirmshaming)")
        : "ปุ่มปฏิเสธเขียนว่า 'ฉันชอบฟังเพลงแบบมีโฆษณาคั่นทุกเพลง' เพื่อให้รู้สึกผิด (Confirmshaming) คุณไม่หวั่นไหวและหลีกเลี่ยง Forced Continuity ได้" },
    { id: "2.2", title: "เลือกแพ็กเกจ", domain: "app.melodymood.co/upgrade", story: "คุณกดเล่นเพลย์ลิสต์ยอดนิยม แต่ระบบล็อกไว้และเปิดหน้าเลือกแพ็กเกจ", patterns: ["Preselected Options", "Forced Continuity"], Comp: Plan,
      explain: (r) => !r.subscribed
        ? "คุณเลือกไม่สมัคร จึงไม่เจอผลจากช่องตัวเลือกที่ถูกติ๊กไว้ล่วงหน้า (Preselected Options) และการต่ออายุอัตโนมัติ (Forced Continuity)"
        : r.level === "trapped"
        ? "ตัวเลือก Family +60 บาทและต่ออายุอัตโนมัติถูกติ๊กไว้ก่อน (Preselected Options) จึงถูกเรียกเก็บเพิ่มโดยไม่ตั้งใจ และการต่ออายุอัตโนมัติคือ Forced Continuity"
        : "คุณตรวจและยกเลิกตัวเลือกที่ถูกติ๊กไว้ล่วงหน้า (Preselected Options) แต่ยังสมัครแพ็กเกจแบบต่ออายุรายเดือน" },
  ],
  consequence: (prev) => ((prev["2.1"]?.trial || prev["2.2"]?.subscribed) ? { Comp: Charged, title: "ผลที่ตามมา: ยอดเงินถูกหัก" } : null),
  tipLine: "ตั้งเตือนก่อนหมดช่วงทดลองและตรวจใบแจ้งยอดบัญชีเป็นประจำ เพื่อจับการหักเงินที่ไม่ตั้งใจให้เร็วที่สุด",
};
