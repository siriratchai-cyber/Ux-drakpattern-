import React, { useState } from "react";

/* ================= 5.1 เขาวงกตการยกเลิก ================= */
const STEPS = {
  home: { title: "หน้าหลัก", real: ["บัญชี ›", "account"], decoys: ["🎁 รับสิทธิ์ลด 50% ตอนนี้"] },
  account: { title: "บัญชี", real: ["แพ็กเกจและการเรียกเก็บเงิน ›", "plan"], decoys: ["⬆️ อัปเกรดเป็น Family"] },
  plan: { title: "แพ็กเกจของฉัน", real: ["จัดการแพ็กเกจ ›", "manage"], decoys: ["🔄 เปลี่ยนเป็นแพ็กเกจถูกลง"] },
  manage: { title: "จัดการแพ็กเกจ", real: ["ต้องการยกเลิกแพ็กเกจ", "cancel"], decoys: ["⏸ พักการใช้งานชั่วคราว", "💬 คุยกับผู้ช่วยแชท"] },
};
function Maze({ onDecide }) {
  const [step, setStep] = useState("home");
  const [wrong, setWrong] = useState(0);
  const [toast, setToast] = useState("");
  const keys = Object.keys(STEPS);
  const s = STEPS[step];
  const bad = () => { setWrong((w) => w + 1); setToast("นี่ไม่ใช่การยกเลิก — ลองหาทางอื่น"); setTimeout(() => setToast(""), 1500); };
  const goReal = (to) => {
    if (to === "cancel") onDecide({ level: wrong <= 1 ? "safe" : wrong <= 3 ? "partial" : "trapped", wrong,
      note: `ใช้เวลาหาปุ่มยกเลิก 5 ขั้นตอน คลิกผิดทาง ${wrong} ครั้ง` });
    else setStep(to);
  };
  return (
    <div className="bg-[#FFFDF9] flex flex-col min-h-[440px] relative">
      <div className="bg-[#FFF8F0] border-b border-[#F5EDE0] px-6 py-3 text-[12px] text-[#8B7A5E] font-['Sarabun'] leading-relaxed">📧 คุณอยากยกเลิกแพ็กเกจของ MelodyMood ให้จบ ก่อนที่จะถูกหักเงินอีกครั้ง</div>
      <div className="flex flex-1">
        <div className="hidden md:flex flex-col w-44 border-r border-[#F5F2FA] px-4 py-5 gap-1 text-[12px] font-['Sarabun']">
          <div className="text-[14px] font-bold text-[#3A3550] font-['Kanit'] mb-3">ตั้งค่า</div>
          {keys.map((k) => <div key={k} className={`px-3 py-2 rounded-lg ${k === step ? "bg-[#F0EDFB] text-[#8B7FBF] font-medium" : "text-[#DCD9E8]"}`}>{STEPS[k].title}</div>)}
        </div>
        <div className="flex-1 px-7 py-6">
          <div className="text-[18px] font-semibold text-[#3A3550] font-['Kanit'] mb-4">{s.title}</div>
          <div className="max-w-sm space-y-3">
            {s.decoys.map((d) => <button key={d} onClick={bad} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5A8C4] to-[#EF8FB0] text-white text-[14px] font-semibold font-['Kanit'] shadow hover:brightness-105">{d}</button>)}
            <div className="h-24" />
            <button onClick={() => goReal(s.real[1])} className="text-[9px] text-[#E4E1EE] hover:text-[#B9B4C7] underline font-['Sarabun']">{s.real[0]}</button>
          </div>
        </div>
      </div>
      {toast && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#3A3550] text-white text-[12px] px-4 py-2 rounded-full font-['Sarabun']">{toast}</div>}
    </div>
  );
}

/* ================= 5.2 หน้ารั้งลูกค้า ================= */
function Retain({ onDecide }) {
  const [mail, setMail] = useState(true);
  return (
    <div className="bg-[#FFFDF9] min-h-[440px] relative">
      <div className="px-8 py-6 space-y-3"><div className="h-6 w-1/3 rounded bg-[#EEEAF6]" /><div className="h-28 rounded-2xl bg-[#F5F2FA]" /></div>
      <div className="absolute inset-0 bg-[#3A3550]/30 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center">
          <div className="text-4xl mb-2">😢</div>
          <div className="text-[15px] font-semibold text-[#3A3550] font-['Kanit'] mb-3 leading-relaxed">แน่ใจนะว่าจะจากเราไป?<br />คุณจะเสียเพลย์ลิสต์ 1,240 เพลงและสถานะ VIP!</div>
          <button onClick={() => onDecide({ level: "trapped", stayed: true, note: "กด 'อยู่ต่อกับเรา (ลด 50%)' แทนการยกเลิก" })}
            className="w-full py-3 rounded-full bg-[#F5A8C4] text-white text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">อยู่ต่อกับเรา (ลด 50% 3 เดือน)</button>
          <label className="flex items-start gap-2 mt-3 text-left text-[9px] text-[#DCD9E8] font-['Sarabun']">
            <input type="checkbox" className="mt-0.5 accent-[#8B7FBF]" checked={mail} onChange={(e) => setMail(e.target.checked)} />
            ส่งข้อเสนอพิเศษและโปรโมชันการกลับมาใช้งานทางอีเมลและ SMS
          </label>
          <button onClick={() => onDecide({ level: mail ? "partial" : "safe", stayed: false, note: mail ? "ยืนยันยกเลิก แต่ยังติ๊กรับโปรโมชันไว้ตามค่าเริ่มต้น" : "ยืนยันยกเลิกและเอาช่องรับโปรโมชันออก" })}
            className="mt-3 text-[10px] text-[#E4E1EE] underline hover:text-[#B9B4C7] font-['Sarabun']">ฉันไม่สนใจเพลงดี ๆ ขอยกเลิกต่อ</button>
        </div>
      </div>
    </div>
  );
}

/* ================= ผลที่ตามมา: อีเมลผลลัพธ์ ================= */
function Mail({ prev, onNext }) {
  const stayed = prev["5.2"]?.stayed;
  return (
    <div className="bg-[#FBFAFD] py-8 px-4 min-h-[440px]">
      <div className="text-center mb-4 text-[12px] text-[#D97A7A] font-['Kanit']">⚠️ ฉากจำลองผลที่ตามมา (เพื่อการเรียนรู้)</div>
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-[#EEEAF6] p-6 font-['Sarabun']">
        <div className="text-[11px] text-[#9B96AC]">จาก: MelodyMood · ถึง: คุณ</div>
        <div className="text-[15px] font-bold text-[#3A3550] font-['Kanit'] my-2">{stayed ? "ต่ออายุแพ็กเกจของคุณเรียบร้อย" : "ยกเลิกแพ็กเกจเรียบร้อย"}</div>
        <p className="text-[13px] text-[#5C566E] leading-relaxed">
          {stayed ? "คุณยังคงเป็นสมาชิกต่อไป ราคาลด 50% ใช้ได้ 3 เดือนแรก หลังจากนั้นจะกลับเป็น 199 บาท/เดือนและต่ออายุอัตโนมัติ"
            : "แพ็กเกจของคุณจะสิ้นสุดเมื่อครบรอบบิลปัจจุบัน และจะไม่มีการหักเงินในรอบถัดไป"}
        </p>
      </div>
      <div className="text-center"><button onClick={onNext} className="mt-5 px-8 py-3 rounded-full text-white font-['Kanit'] font-semibold shadow-lg" style={{ background: "linear-gradient(135deg,#C9BCE8,#8B7FBF)" }}>ต่อไป →</button></div>
    </div>
  );
}

export default {
  id: "ep5", time: "22:00", title: "เขาวงกตแห่งการยกเลิก",
  intro: "ก่อนนอน คุณเปิดอีเมลแล้วเห็นการเรียกเก็บเงินจากแอปที่จำไม่ได้ว่าสมัครตอนไหน คุณตัดสินใจจะยกเลิกทั้งหมดคืนนี้…",
  scenes: [
    { id: "5.1", title: "ตามหาปุ่มยกเลิก", domain: "account.melodymood.co", story: "คุณเปิดหน้าตั้งค่าบัญชีเพื่อหาทางยกเลิก", patterns: ["Roach Motel", "Misdirection"], Comp: Maze,
      explain: (r) => r.level === "safe"
        ? "คุณฝ่าเขาวงกตห้าขั้นตอนไปเจอลิงก์ยกเลิกที่เล็กและจางได้โดยแทบไม่หลงทาง (Roach Motel) แม้จะมีปุ่มใหญ่สีสวยหลอกให้กดผิดทาง (Misdirection)"
        : `สมัครง่ายแค่คลิกเดียว แต่ยกเลิกต้องผ่าน 5 ขั้นตอน (Roach Motel) และปุ่มใหญ่สีสวยที่ไม่ใช่การยกเลิกดึงสายตาไปผิดทาง (Misdirection) คุณคลิกผิดทาง ${r.wrong} ครั้ง` },
    { id: "5.2", title: "หน้ายืนยันการยกเลิก", domain: "account.melodymood.co/cancel", story: "ก่อนยกเลิกสำเร็จ ระบบเด้งหน้ายืนยันขึ้นมา", patterns: ["Confirmshaming", "Preselected Options"], Comp: Retain,
      explain: (r) => r.stayed
        ? "ข้อความ 'จะเสียเพลย์ลิสต์และสถานะ VIP' และปุ่มใหญ่สีชมพูพยายามกดดันให้อยู่ต่อ (Confirmshaming) ทำให้ยกเลิกไม่สำเร็จ"
        : r.level === "partial"
        ? "คุณยืนยันยกเลิกได้ แต่ยังปล่อยช่องรับโปรโมชันที่ติ๊กไว้ล่วงหน้า (Preselected Options) ทั้งที่ข้อความกดดันพยายามรั้งไว้ (Confirmshaming)"
        : "คุณไม่หวั่นไหวกับข้อความกดดัน (Confirmshaming) และเอาช่องรับโปรโมชันที่ถูกติ๊กไว้ล่วงหน้าออก (Preselected Options)" },
  ],
  consequence: () => ({ Comp: Mail, title: "ผลลัพธ์การยกเลิก" }),
  tipLine: "ค้นหาคำว่า cancel ในหน้าตั้งค่า เก็บภาพหน้าจอ และตรวจอีเมลยืนยันทุกครั้งหลังยกเลิก",
};
