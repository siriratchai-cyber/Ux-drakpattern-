import React, { useState, useEffect } from "react";
import { PhoneFrame } from "../components/ui";

/* ================= 4.1 ขอสิทธิ์และข้อมูลส่วนตัว ================= */
function Onboard({ onDecide }) {
  const items = ["👥 ซิงค์รายชื่อผู้ติดต่อทั้งหมด เพื่อชวนเพื่อนวิ่ง", "📍 ใช้ตำแหน่งที่แม่นยำตลอดเวลา แม้ไม่ได้เปิดแอป", "❤️ แบ่งปันข้อมูลสุขภาพกับพันธมิตรเพื่อโปรแกรมเฉพาะบุคคล", "🌐 โปรไฟล์และเส้นทางวิ่งของคุณเป็นสาธารณะ"];
  return (
    <div className="bg-[#1A1A2E] min-h-[440px]">
      <div className="bg-gradient-to-br from-[#16213E] to-[#0F3460] p-6 text-center">
        <div className="text-[22px] font-bold text-white font-['Kanit']">💪 FitPro</div>
        <div className="text-[12px] text-[#A8B5D9] font-['Sarabun']">แอปออกกำลังกายอันดับ 1 ของไทย</div>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm mx-auto">
          <div className="text-[17px] font-bold text-[#3A3550] font-['Kanit'] mb-1">🎉 ยินดีต้อนรับสู่ FitPro!</div>
          <p className="text-[12px] text-[#5C566E] font-['Sarabun'] mb-3">เปิดใช้งานฟีเจอร์เพื่อประสบการณ์ที่ดีที่สุดของคุณ</p>
          <ul className="space-y-1.5 mb-4">{items.map((t) => <li key={t} className="text-[10.5px] text-[#B9B4C7] font-['Sarabun']">{t}</li>)}</ul>
          <button onClick={() => onDecide({ level: "trapped", shared: true, note: "กด 'เปิดใช้งานทั้งหมด (แนะนำ)' ซึ่งรวมการแชร์รายชื่อ ตำแหน่ง และข้อมูลสุขภาพ" })}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#33D17A] to-[#6BC9A0] text-white text-[15px] font-bold font-['Kanit'] shadow-lg hover:brightness-105">เปิดใช้งานทั้งหมด (แนะนำ)</button>
          <button onClick={() => onDecide({ level: "safe", shared: false, note: "กด 'ข้ามไปก่อน' และไม่ให้สิทธิ์ใด ๆ" })}
            className="w-full mt-3 text-[9px] text-[#DCD9E8] hover:text-[#9B96AC] font-['Sarabun']">ข้ามไปก่อน</button>
        </div>
      </div>
    </div>
  );
}

/* ================= 4.2 Flash Sale ================= */
function Flash({ onDecide }) {
  const [sec, setSec] = useState(300);
  const [more, setMore] = useState(false);
  const [saw, setSaw] = useState(false);
  useEffect(() => { const t = setInterval(() => setSec((s) => (s <= 1 ? 300 : s - 1)), 1000); return () => clearInterval(t); }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0"), ss = String(sec % 60).padStart(2, "0");
  const buy = () => onDecide({ level: saw ? "partial" : "trapped", note: saw ? "ซื้อ Premium หลังเปิดอ่านรายละเอียดโปรโมชัน" : "รีบซื้อ Premium ทันทีเพราะกลัวพลาดสิทธิ์" });
  return (
    <div className="bg-[#F0F4FF] min-h-[440px] relative">
      <div className="bg-[#1A2A5E] px-8 py-4 flex justify-between items-center">
        <div className="text-[16px] font-bold text-white font-['Kanit']">💪 FitPro Premium</div>
        <div className="text-[12px] font-bold text-white bg-[#EF6F6F] px-3 py-1.5 rounded-full font-['Kanit'] animate-pulse">⏱ {mm}:{ss}</div>
      </div>
      <button onClick={() => onDecide({ level: "safe", note: "กดปิดข้อเสนอ ✕ และไม่ซื้อ" })} className="absolute top-16 right-4 text-[11px] text-[#C5CDE0] hover:text-[#8B9BB5]">✕</button>
      <div className="px-8 py-6 max-w-md mx-auto text-center">
        <div className="text-[22px] font-bold text-[#D97A7A] font-['Kanit']">⚡ FLASH SALE ลด 70%!</div>
        <div className="text-[12px] text-[#5C566E] font-['Sarabun'] mb-3">เหลือ <b className="text-[#D97A7A]">2 สิทธิ์สุดท้าย</b> · มี 18 คนกำลังดูอยู่</div>
        <div className="flex items-baseline justify-center gap-2 mb-4"><span className="text-[14px] text-[#B9B4C7] line-through">330 บาท</span><span className="text-[32px] font-bold text-[#3A3550] font-['Kanit']">99 บาท</span><span className="text-[12px] text-[#5C566E]">/เดือน</span></div>
        <button onClick={buy} className="w-full py-3.5 rounded-full bg-[#F5A8C4] text-white text-[15px] font-bold font-['Kanit'] shadow-lg hover:brightness-105">ซื้อเลย ก่อนสิทธิ์หมด!</button>
        <button onClick={() => { setMore((v) => !v); setSaw(true); }} className="mt-3 text-[10px] text-[#C5CDE0] hover:text-[#8B9BB5] font-['Sarabun']">รายละเอียดโปรโมชัน</button>
        {more && <div className="mt-2 text-[11px] text-[#5C566E] bg-white rounded-xl p-3 font-['Sarabun'] text-left">แคมเปญนี้เปิดให้ทุกคนทุกวันตลอดปี สิทธิ์ไม่ได้จำกัดจำนวนจริง และตัวจับเวลาจะเริ่มนับใหม่ทุกครั้งเมื่อหมด</div>}
      </div>
    </div>
  );
}

/* ================= ผลที่ตามมา: ข้อมูลรั่วไหล ================= */
function Fallout({ ctx, onNext }) {
  const rows = [
    ["💬 ข้อความ · ตอนนี้", `"${ctx.nickname} ชวนคุณมาวิ่งกับ FitPro!" — ข้อความเชิญถูกส่งจากบัญชีของคุณถึงรายชื่อผู้ติดต่อ 47 คน`],
    ["📩 SMS · 5 นาทีที่แล้ว", "ได้รับ SMS โฆษณาจากพันธมิตรที่ไม่รู้จัก 12 ข้อความในชั่วโมงเดียว"],
    ["🌐 FitPro · เมื่อสักครู่", "เส้นทางวิ่งประจำใกล้บ้านของคุณถูกตั้งเป็นสาธารณะ ใครก็ดูได้"],
  ];
  return (
    <div className="bg-[#FBFAFD] py-6 px-4 min-h-[440px]">
      <div className="text-center mb-4 text-[12px] text-[#D97A7A] font-['Kanit']">⚠️ ฉากจำลองผลที่ตามมา (เพื่อการเรียนรู้)</div>
      <PhoneFrame tint="#1F1B2E">
        <div className="p-3 space-y-2 bg-[#F5F2FA] min-h-[300px]">
          {rows.map(([h, b], i) => (
            <div key={i} className="rounded-2xl bg-white p-3 shadow animate-[fadeIn_0.4s_ease]" style={{ animationDelay: `${i * 0.5}s`, animationFillMode: "both" }}>
              <div className="text-[10px] text-[#9B96AC] font-['Sarabun']">{h}</div>
              <div className="text-[12px] text-[#3A3550] font-['Sarabun'] leading-relaxed">{b}</div>
            </div>
          ))}
        </div>
      </PhoneFrame>
      <div className="text-center"><button onClick={onNext} className="mt-5 px-8 py-3 rounded-full text-white font-['Kanit'] font-semibold shadow-lg" style={{ background: "linear-gradient(135deg,#C9BCE8,#8B7FBF)" }}>ต่อไป →</button></div>
    </div>
  );
}

export default {
  id: "ep4", time: "15:00", title: "แอปออกกำลังกายสุดฮิต",
  intro: "ช่วงบ่าย เพื่อนแนะนำแอปออกกำลังกาย FitPro คุณจึงดาวน์โหลดมาลองใช้ทันที…",
  scenes: [
    { id: "4.1", title: "เปิดใช้งานฟีเจอร์", domain: "fitpro.app/welcome", story: "หน้าแรกหลังสมัครขอให้คุณเปิดใช้งานฟีเจอร์ต่าง ๆ", patterns: ["Privacy Zuckering", "Misdirection"], Comp: Onboard,
      explain: (r) => r.shared
        ? "ปุ่มเขียวใหญ่ 'แนะนำ' พาให้ยอมแชร์รายชื่อ ตำแหน่ง และข้อมูลสุขภาพพร้อมกัน (Privacy Zuckering) ในขณะที่ปุ่ม 'ข้ามไปก่อน' เล็กและจางมาก (Misdirection)"
        : "คุณสังเกตเห็นปุ่มข้ามที่เล็กและจาง (Misdirection) และไม่ยอมแชร์ข้อมูลเกินความจำเป็น (Privacy Zuckering)" },
    { id: "4.2", title: "ข้อเสนอ Flash Sale", domain: "fitpro.app/premium", story: "แอปเด้งข้อเสนออัปเกรด Premium ขึ้นมาทันที", patterns: ["Scarcity", "Fake Urgency"], Comp: Flash,
      explain: (r) => r.level === "safe"
        ? "คุณปิดข้อเสนอโดยไม่ถูกกดดันจากตัวนับเวลา (Fake Urgency) และข้อความ '2 สิทธิ์สุดท้าย' (Scarcity)"
        : "โปรโมชันเปิดทุกวัน ตัวจับเวลาเริ่มใหม่เมื่อหมด (Fake Urgency) และ '2 สิทธิ์สุดท้าย/18 คนกำลังดู' สร้างความรู้สึกขาดแคลน (Scarcity)" },
  ],
  consequence: (prev) => (prev["4.1"]?.shared ? { Comp: Fallout, title: "ผลที่ตามมา: ข้อมูลส่วนตัวถูกนำไปใช้" } : null),
  tipLine: "ให้สิทธิ์เฉพาะที่จำเป็นต่อการใช้งานจริง และตรวจการตั้งค่าความเป็นส่วนตัวของโปรไฟล์หลังสมัครทุกครั้ง",
};
