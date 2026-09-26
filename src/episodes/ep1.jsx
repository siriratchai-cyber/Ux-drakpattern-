import React, { useState, useEffect } from "react";
import { PhoneFrame } from "../components/ui";

/* ================= 1.1 แบนเนอร์คุกกี้ ================= */
function Cookie({ onDecide }) {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState({ analytics: true, partner: true, sms: true });
  const acceptAll = () => onDecide({ level: "trapped", tracked: true, note: "กด 'ยอมรับทั้งหมดและดูเลย' โดยไม่ได้อ่านข้อความยาวสีเทา" });
  const closeX = () => onDecide({ level: "safe", tracked: false, note: "ปิดป็อปอัปด้วยปุ่ม ✕ โดยไม่ยอมรับอะไรเลย" });
  const confirm = () => {
    const on = Object.values(t).filter(Boolean).length;
    onDecide({
      level: on === 0 ? "safe" : on === 3 ? "trapped" : "partial",
      tracked: t.partner,
      note: `ตั้งค่าเอง (วิเคราะห์: ${t.analytics ? "เปิด" : "ปิด"}, แบ่งปันพันธมิตร: ${t.partner ? "เปิด" : "ปิด"}, SMS: ${t.sms ? "เปิด" : "ปิด"})`,
    });
  };
  const Row = ({ k, label }) => (
    <label className="flex items-center justify-between mb-3 text-[13px] text-[#5C566E] font-['Sarabun'] py-1">
      {label}
      <input type="checkbox" className="w-4 h-4 accent-[#8B7FBF]" checked={t[k]} onChange={(e) => setT({ ...t, [k]: e.target.checked })} />
    </label>
  );
  return (
    <div className="h-full bg-[#FBFAFD] min-h-[440px]">
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#F2EEF9]">
        <div className="text-[16px] font-bold text-[#3A3550] font-['Kanit']">ViralTube<span className="text-[#B8A6E8]">.net</span></div>
        <div className="hidden sm:flex gap-6 text-[13px] text-[#B9B4C7] font-['Sarabun']"><span>หน้าแรก</span><span>กำลังมาแรง</span><span>สมัครสมาชิก</span></div>
      </div>
      <div className="px-8 py-8 flex justify-center">
        <div className="w-full max-w-2xl aspect-video rounded-2xl bg-gradient-to-br from-[#3A3550] to-[#524A6B] flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><div className="w-0 h-0 border-l-[16px] border-l-[#3A3550] border-y-[10px] border-y-transparent ml-1" /></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[#3A3550]/25 backdrop-blur-[1px] flex items-center justify-center p-6">
        {!open ? (
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 relative">
            <button onClick={closeX} aria-label="ปิด" className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-[#DCD9E8] hover:bg-[#F5F2FA] hover:text-[#9B96AC] text-[13px]">✕</button>
            <div className="text-[16px] font-semibold text-[#3A3550] font-['Kanit'] mb-3 pr-6">เราใช้คุกกี้เพื่อความปลอดภัยของคุณ</div>
            <div className="h-24 overflow-y-scroll rounded-lg bg-[#FAF8FC] px-3 py-2 text-[10.5px] leading-relaxed text-[#C7C2D6] font-['Sarabun']">
              🎉 ยินดีด้วย! คุณได้รับสิทธิ์ใช้งาน Premium ฟรีทันที รับสิทธิ์เข้าถึงฟีเจอร์พิเศษทั้งหมด พร้อมโปรโมชั่นสำหรับสมาชิกเท่านั้น เพียงกด "ยอมรับ" ก็เริ่มใช้งานได้ทันที สิทธิ์นี้มีจำนวนจำกัด

              การกดยอมรับถือว่าท่านยินยอมสมัครบริการแจ้งเตือนผ่าน SMS ซึ่งมีค่าบริการ 9 บาทต่อวัน เรียกเก็บผ่านผู้ให้บริการโทรศัพท์เคลื่อนที่ของท่านโดยอัตโนมัติ ทั้งนี้ท่านยินยอมให้เว็บไซต์รวบรวมและแบ่งปันข้อมูลการใช้งาน ข้อมูลอุปกรณ์ ตำแหน่งที่ตั้ง ประวัติการเรียกดู และข้อมูลติดต่อแก่พันธมิตรทางธุรกิจ เพื่อการวิเคราะห์ การโฆษณาแบบเฉพาะบุคคล และการพัฒนาผลิตภัณฑ์ การยกเลิกบริการสามารถทำได้ภายหลังผ่านฝ่ายบริการลูกค้าตามเงื่อนไขที่บริษัทกำหนด.
            </div>
            <button onClick={acceptAll} className="mt-5 w-full py-3 rounded-full bg-[#8ED9B6] text-[#204B3A] text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105 active:scale-[0.98]">ยอมรับทั้งหมดและดูเลย</button>
            <button onClick={() => setOpen(true)} className="mt-3 w-full text-center text-[10px] text-[#E4E1EE] font-['Sarabun'] hover:text-[#B9B4C7]">ตั้งค่าคุกกี้ด้วยตนเอง</button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7">
            <div className="text-[15px] font-semibold text-[#3A3550] font-['Kanit'] mb-4">ตั้งค่าความเป็นส่วนตัว</div>
            <Row k="analytics" label="คุกกี้วิเคราะห์การใช้งาน" />
            <Row k="partner" label="แบ่งปันข้อมูลให้พันธมิตรโฆษณา" />
            <Row k="sms" label="รับ SMS โปรโมชั่น (9 บาท/วัน)" />
            <button onClick={confirm} className="mt-2 w-full py-3 rounded-full bg-[#C9BCE8] text-white text-[14px] font-semibold font-['Kanit'] hover:brightness-105 active:scale-[0.98]">ยืนยันการตั้งค่า</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= 1.2 ปุ่มเล่นวิดีโอปลอม ================= */
function FakePlay({ onDecide }) {
  const [flash, setFlash] = useState(null);
  const go = (res, msg) => { setFlash(msg); setTimeout(() => onDecide(res), 900); };
  return (
    <div className="bg-[#FBFAFD] min-h-[440px] relative">
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#F2EEF9]">
        <div className="text-[16px] font-bold text-[#3A3550] font-['Kanit']">ViralTube<span className="text-[#B8A6E8]">.net</span></div>
        <div className="text-[12px] text-[#B9B4C7] font-['Sarabun']">🔥 10 เรื่องที่คนไทยเพิ่งรู้วันนี้</div>
      </div>
      <div className="px-8 py-6 flex justify-center">
        <div className="relative w-full max-w-2xl aspect-video rounded-2xl bg-gradient-to-br from-[#3A3550] to-[#6B5F8C] overflow-hidden">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <button onClick={() => go({ level: "trapped", note: "คลิกปุ่มเขียวใหญ่ 'เล่นวิดีโอ HD' ซึ่งเป็นโฆษณา และถูกพาไปหน้าดาวน์โหลดแอปแปลกปลอม" }, "กำลังเปิดหน้าดาวน์โหลดแอป…")}
              className="px-8 py-4 rounded-full bg-[#33D17A] text-white text-[18px] font-bold font-['Kanit'] shadow-xl animate-pulse hover:brightness-110">
              ▶ เล่นวิดีโอ HD
            </button>
            <span className="text-[8px] text-white/40 font-['Sarabun']">โฆษณา</span>
          </div>
          <button onClick={() => go({ level: "safe", note: "กดปิดโฆษณาที่มุมขวาบน แล้วเล่นวิดีโอตามปกติ" }, "ปิดโฆษณาแล้ว")}
            className="absolute top-2 right-2 text-[10px] text-white/40 hover:text-white/80 px-2 py-1">ปิดโฆษณา ✕</button>
          <div className="absolute bottom-0 inset-x-0 h-9 bg-black/40 flex items-center px-3 gap-3">
            <button onClick={() => go({ level: "safe", note: "กดปุ่มเล่นเล็ก ๆ บนแถบควบคุมของเครื่องเล่นจริง" }, "กำลังเล่นวิดีโอ")}
              className="text-white/60 text-[12px] hover:text-white">▶</button>
            <div className="flex-1 h-1 bg-white/20 rounded-full" />
            <span className="text-[10px] text-white/50">00:00 / 03:12</span>
          </div>
          {flash && <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-['Kanit'] text-[15px]">{flash}</div>}
        </div>
      </div>
    </div>
  );
}

/* ================= 1.3 ป็อปอัปรับข่าวสาร ================= */
function Newsletter({ onDecide }) {
  const [opt, setOpt] = useState(true);
  const subscribe = () => onDecide({ level: opt ? "trapped" : "partial", note: opt ? "สมัครรับข่าวสารโดยยังติ๊กยินยอมให้พันธมิตรส่งโปรโมชันไว้" : "สมัครรับข่าวสาร แต่ติ๊กเอาช่องแบ่งปันกับพันธมิตรออก" });
  const decline = (m) => onDecide({ level: "safe", note: m });
  return (
    <div className="bg-[#FBFAFD] min-h-[440px] relative">
      <div className="px-8 py-6 space-y-4">
        <div className="h-6 w-1/2 rounded bg-[#EEEAF6]" /><div className="h-40 rounded-2xl bg-[#F2EEF9]" />
        <div className="h-4 w-3/4 rounded bg-[#EEEAF6]" /><div className="h-4 w-2/3 rounded bg-[#EEEAF6]" />
      </div>
      <div className="absolute inset-0 bg-[#3A3550]/30 flex items-center justify-center p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center">
          <button onClick={() => decline("ปิดป็อปอัปด้วยปุ่ม ✕")} className="absolute top-3 right-4 text-[12px] text-[#E4E1EE] hover:text-[#B9B4C7]" aria-label="ปิด">✕</button>
          <div className="text-4xl mb-2">🎁</div>
          <div className="text-[18px] font-bold text-[#3A3550] font-['Kanit']">รับส่วนลด 10% ทุกวัน!</div>
          <p className="text-[12px] text-[#5C566E] font-['Sarabun'] mt-1 mb-4">สมัครรับข่าวสารเพื่อรับคูปองส่วนลดส่งตรงถึงอีเมลของคุณ</p>
          <label className="flex items-start gap-2 text-left text-[10px] text-[#C7C2D6] font-['Sarabun'] mb-4">
            <input type="checkbox" className="mt-0.5 accent-[#8B7FBF]" checked={opt} onChange={(e) => setOpt(e.target.checked)} />
            ฉันยินยอมให้พันธมิตรของเว็บไซต์ส่งข้อเสนอและโฆษณาทางอีเมลและ SMS
          </label>
          <button onClick={subscribe} className="w-full py-3 rounded-full bg-[#F5A8C4] text-white text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">รับส่วนลดเลย!</button>
          <button onClick={() => decline("กดปฏิเสธที่ลิงก์ข้อความกดดัน โดยไม่รู้สึกผิด")} className="mt-3 text-[10px] text-[#D5D1E2] hover:text-[#9B96AC] font-['Sarabun']">ไม่ล่ะ ฉันไม่อยากประหยัดเงิน</button>
        </div>
      </div>
    </div>
  );
}

/* ================= ฉากผลที่ตามมา: มิจฉาชีพทักแชท ================= */
function ScamChat({ ctx, onNext }) {
  const nick = ctx.nickname;
  const msgs = [
    `สวัสดีคุณ ${nick} 👋`,
    "ขอบคุณที่กดยอมรับคุกกี้ของ ViralTube นะ ตอนนี้เรามีประวัติการเข้าเว็บ ตำแหน่ง และอุปกรณ์ของคุณครบแล้ว",
    "โอนมา 5,000 บาท ภายใน 10 นาที ไม่งั้นเราจะส่งประวัติการเข้าเว็บของคุณให้คนที่คุณรู้จัก 😈",
  ];
  const [shown, setShown] = useState(0);
  const [choice, setChoice] = useState(null);
  useEffect(() => {
    if (shown >= msgs.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <div className="bg-[#FBFAFD] py-6 px-4 min-h-[440px]">
      <div className="text-center mb-4 text-[12px] text-[#D97A7A] font-['Kanit']">⚠️ ฉากจำลองผลที่ตามมา (เพื่อการเรียนรู้)</div>
      <PhoneFrame tint="#2B2540">
        <div className="bg-[#F5F2FA] px-4 py-2 text-[12px] font-['Kanit'] text-[#3A3550] border-b border-[#EEEAF6]">💬 ไม่ทราบผู้ส่ง (+66 8x-xxx-xxxx)</div>
        <div className="p-3 space-y-2 min-h-[230px] bg-white">
          {msgs.slice(0, shown).map((m, i) => (
            <div key={i} className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#F0EDFB] px-3 py-2 text-[12.5px] text-[#3A3550] font-['Sarabun'] animate-[fadeIn_0.3s_ease]">{m}</div>
          ))}
          {choice === "pay" && <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-[#8ED9B6] px-3 py-2 text-[12.5px] text-[#204B3A] font-['Sarabun']">โอนเงินให้แล้ว…</div>}
          {choice === "block" && <div className="text-center text-[11px] text-[#9B96AC] font-['Sarabun']">🚫 คุณบล็อกและไม่ตอบกลับ</div>}
        </div>
        {shown >= msgs.length && !choice && (
          <div className="p-3 flex gap-2 border-t border-[#EEEAF6]">
            <button onClick={() => setChoice("pay")} className="flex-1 py-2 rounded-full bg-[#F5F2FA] text-[12px] text-[#5C566E] font-['Sarabun']">โอนเงินให้</button>
            <button onClick={() => setChoice("block")} className="flex-1 py-2 rounded-full bg-[#8B7FBF] text-white text-[12px] font-['Sarabun']">ไม่ตอบ / บล็อก</button>
          </div>
        )}
      </PhoneFrame>
      {choice && (
        <div className="max-w-sm mx-auto mt-5 text-center animate-[fadeIn_0.3s_ease]">
          <p className="text-[13px] text-[#5C566E] font-['Sarabun'] leading-relaxed">
            {choice === "pay"
              ? "การจ่ายเงินไม่ช่วยให้ปลอดภัย มิจฉาชีพมักเรียกเพิ่มเรื่อย ๆ ควรหยุดติดต่อ เก็บหลักฐาน และแจ้งความ/ปรึกษาหน่วยงานที่เกี่ยวข้อง"
              : "ตัดสินใจถูกต้อง การไม่โต้ตอบ บล็อก และเก็บหลักฐานคือทางที่ปลอดภัยที่สุด"}
          </p>
          <button onClick={onNext} className="mt-4 px-8 py-3 rounded-full text-white font-['Kanit'] font-semibold shadow-lg" style={{ background: "linear-gradient(135deg,#C9BCE8,#8B7FBF)" }}>ต่อไป →</button>
        </div>
      )}
    </div>
  );
}

export default {
  id: "ep1", time: "08:00", title: "ลิงก์ไวรัลยามเช้า",
  intro: "เช้าวันใหม่ คุณเปิดเว็บวิดีโอ ViralTube ที่เพื่อนแชร์มาให้ดู ระหว่างนั้นมีทั้งป็อปอัป ปุ่ม และข้อเสนอมากมายเด้งขึ้นมา…",
  scenes: [
    { id: "1.1", title: "แบนเนอร์คุกกี้", domain: "viraltube.net", story: "เว็บเด้งกล่องข้อความขึ้นมาก่อนจะได้ดูคลิป", patterns: ["Privacy Zuckering", "Preselected Options", "Misdirection"], Comp: Cookie,
      explain: (r) => r.level === "trapped"
        ? "ปุ่มเขียวใหญ่ล่อให้กดยอมรับ ส่วนตัวเลือกตั้งค่าเป็นตัวหนังสือเล็กจางมาก ข้อความยาวสีเทายังซ่อนการแบ่งปันข้อมูลให้พันธมิตรและ SMS 9 บาท/วัน (Privacy Zuckering + Misdirection) และในหน้าตั้งค่าทุกช่องถูกติ๊กไว้ก่อน (Preselected Options)"
        : "คุณไม่ได้ตกลงตามปุ่มที่ถูกออกแบบให้เด่นที่สุด ในหน้าตั้งค่าจริงทุกช่องถูกติ๊กไว้ล่วงหน้า (Preselected Options) และปุ่มยอมรับทั้งหมดถูกทำให้เด่นกว่าทางเลือกอื่นมาก (Misdirection)" },
    { id: "1.2", title: "ปุ่มเล่นวิดีโอปลอม", domain: "viraltube.net/watch", story: "คุณกดจะดูวิดีโอ แต่หน้าจอมีปุ่มเล่นหลายปุ่ม", patterns: ["Misdirection"], Comp: FakePlay,
      explain: (r) => r.level === "trapped"
        ? "ปุ่ม 'เล่นวิดีโอ HD' ใหญ่ สีสด กะพริบ แต่จริง ๆ เป็นโฆษณา ส่วนปุ่มเล่นจริงและปุ่มปิดโฆษณาเล็กและจางมาก นี่คือ Misdirection ที่ดึงสายตาไปผิดที่"
        : "คุณสังเกตเห็นปุ่มจริงที่เล็กกว่าและไม่ถูกดึงสายตาไปที่ปุ่มปลอม (Misdirection ใช้ขนาด สี และการกะพริบเพื่อชักนำ)" },
    { id: "1.3", title: "ป็อปอัปรับข่าวสาร", domain: "viraltube.net/watch", story: "ระหว่างเลื่อนหน้าเว็บ มีป็อปอัปเสนอส่วนลดกระโดดขึ้นมา", patterns: ["Confirmshaming", "Preselected Options"], Comp: Newsletter,
      explain: (r) => r.level === "trapped"
        ? "ช่องยินยอมให้พันธมิตรส่งโฆษณาถูกติ๊กไว้ล่วงหน้าด้วยตัวอักษรเล็กจาง (Preselected Options) และปุ่มปฏิเสธใช้คำว่า 'ไม่อยากประหยัดเงิน' เพื่อให้รู้สึกผิด (Confirmshaming)"
        : r.level === "partial"
        ? "คุณสมัครรับข่าวสาร แต่สังเกตและติ๊กช่องแบ่งปันกับพันธมิตรออก ซึ่งถูกติ๊กไว้ล่วงหน้า (Preselected Options) ส่วนปุ่มปฏิเสธใช้ภาษากดดัน (Confirmshaming)"
        : "คุณไม่ได้รู้สึกผิดกับข้อความปฏิเสธ 'ไม่อยากประหยัดเงิน' (Confirmshaming) และหลบพ้นช่องยินยอมที่ถูกติ๊กไว้ล่วงหน้า (Preselected Options)" },
  ],
  consequence: (prev, ctx) => (prev["1.1"]?.tracked ? { Comp: ScamChat, title: "ผลที่ตามมา: ข้อมูลรั่วไปถึงมิจฉาชีพ" } : null),
  tipLine: "ข้อมูลที่ถูกแบ่งปันให้ 'พันธมิตร' สามารถถูกนำไปใช้หลอกลวงเฉพาะบุคคลได้ ควรเลือกอนุญาตเฉพาะคุกกี้ที่จำเป็น",
};
