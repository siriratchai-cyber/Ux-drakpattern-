import React, { useState, useEffect, useRef } from "react";

/* ================= 3.1 หน้าสินค้า: นับถอยหลัง + ของจำกัด ================= */
function Product({ onDecide }) {
  const [sec, setSec] = useState(120);
  const [viewers, setViewers] = useState(27);
  const [left, setLeft] = useState(3);
  const refreshed = useRef(false);
  useEffect(() => {
    const t = setInterval(() => {
      setSec((s) => { if (s <= 1) { refreshed.current = true; return 120; } return s - 1; });
    }, 1000);
    const v = setInterval(() => setViewers((n) => Math.max(12, n + (Math.random() > 0.5 ? 2 : -1))), 2500);
    return () => { clearInterval(t); clearInterval(v); };
  }, []);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0"), ss = String(sec % 60).padStart(2, "0");
  const refresh = () => { refreshed.current = true; setSec(120); setViewers(40 + Math.floor(Math.random() * 20)); setLeft(3); };
  const add = () => onDecide({ level: refreshed.current ? "partial" : "trapped", noticedReset: refreshed.current,
    note: refreshed.current ? "ใส่ตะกร้าหลังเห็นว่าตัวจับเวลาเริ่มนับใหม่ (แต่ยังตัดสินใจซื้อ)" : "รีบกด 'ใส่ตะกร้า' ทันทีตามตัวจับเวลาและข้อความ 'เหลือ 3 ชิ้น'" });
  const compare = () => onDecide({ level: "safe", note: "เปิดเว็บอื่นเปรียบเทียบราคาก่อน แล้วค่อยใส่ตะกร้าอย่างใจเย็น" });
  return (
    <div className="bg-[#FBFAFD] min-h-[440px]">
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#F2EEF9]">
        <div className="text-[16px] font-bold text-[#3A3550] font-['Kanit']">ShopPastel</div>
        <div className="text-[12px] font-bold text-white bg-[#EF6F6F] px-3 py-1.5 rounded-full font-['Kanit'] shadow-sm">⏱ ดีลหมดใน {mm}:{ss}</div>
      </div>
      <div className="px-8 py-6 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl h-56 md:h-full bg-gradient-to-br from-[#E6DFFB] to-[#CFF3E5]" />
        <div>
          <div className="text-[18px] font-semibold text-[#3A3550] font-['Kanit'] mb-1">หูฟังไร้สาย พาสเทล</div>
          <div className="flex items-baseline gap-2 mb-3"><span className="text-[13px] text-[#B9B4C7] line-through">690 บาท</span><span className="text-[22px] font-bold text-[#D97A7A] font-['Kanit']">399 บาท</span></div>
          <div className="space-y-1.5 mb-4 text-[12px] font-['Sarabun']">
            <div className="text-[#D97A7A] font-medium">🔥 เหลือเพียง {left} ชิ้นสุดท้าย!</div>
            <div className="text-[#E58F3E]">👀 มีคนกำลังดูสินค้านี้ {viewers} คน</div>
            <div className="text-[#5C566E]">🛒 ขายไปแล้ว 1,204 ชิ้นในวันนี้</div>
          </div>
          <button onClick={add} className="w-full py-3.5 rounded-full bg-[#8ED9B6] text-[#204B3A] text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">ใส่ตะกร้าเลย! ก่อนหมดเวลา</button>
          <div className="flex justify-between mt-4 text-[10px] text-[#D5D1E2] font-['Sarabun']">
            <button onClick={refresh} className="hover:text-[#9B96AC]">รีเฟรชหน้านี้</button>
            <button onClick={compare} className="hover:text-[#9B96AC]">เปิดเว็บอื่นเปรียบเทียบราคาก่อน</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= 3.2 ตะกร้า: แอบเพิ่มสินค้า ================= */
function Cart({ onDecide }) {
  const [ins, setIns] = useState(true);
  const [gift, setGift] = useState(true);
  const sub = 399 + (ins ? 49 : 0) + (gift ? 29 : 0);
  const go = () => {
    const removed = (!ins ? 1 : 0) + (!gift ? 1 : 0);
    onDecide({ level: removed === 2 ? "safe" : removed === 1 ? "partial" : "trapped", ins, gift,
      note: removed === 2 ? "ตรวจตะกร้าและเอารายการเสริมที่ถูกเพิ่มเองออกทั้งหมด" : removed === 1 ? "เอารายการเสริมออกเพียงบางรายการ" : "กดไปชำระเงินโดยไม่ตรวจรายการในตะกร้า" });
  };
  const Line = ({ label, price, on, set, small }) => (
    <label className={`flex items-center justify-between py-3 border-b border-[#F5F2FA] ${small ? "text-[11px] text-[#B9B4C7]" : "text-[14px] text-[#3A3550]"} font-['Sarabun']`}>
      <span className="flex items-center gap-2">{set && <input type="checkbox" className="accent-[#8B7FBF]" checked={on} onChange={(e) => set(e.target.checked)} />}{label}</span>
      <span>{price} บาท</span>
    </label>
  );
  return (
    <div className="bg-[#FBFAFD] min-h-[440px]">
      <div className="px-8 py-4 border-b border-[#F2EEF9] text-[16px] font-bold text-[#3A3550] font-['Kanit']">ShopPastel · ตะกร้าของฉัน</div>
      <div className="px-8 py-6 max-w-lg">
        <div className="flex items-center justify-between py-3 border-b border-[#F5F2FA] text-[14px] text-[#3A3550] font-['Sarabun']"><span>🎧 หูฟังไร้สาย พาสเทล × 1</span><span>399 บาท</span></div>
        <Line small label="ประกันสินค้า 1 ปี" price={49} on={ins} set={setIns} />
        <Line small label="บริการห่อของขวัญ" price={29} on={gift} set={setGift} />
        <div className="flex justify-between pt-3 text-[10px] text-[#D5D1E2] font-['Sarabun']"><span>ยอดรวมย่อย</span><span>{sub} บาท</span></div>
        <button onClick={go} className="mt-5 w-full py-3.5 rounded-full bg-[#8ED9B6] text-[#204B3A] text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">ไปชำระเงิน · 399 บาท</button>
      </div>
    </div>
  );
}

/* ================= 3.3 ชำระเงิน: ค่าธรรมเนียมแฝง ================= */
function Checkout({ prev, onDecide }) {
  const ins = prev["3.2"]?.ins, gift = prev["3.2"]?.gift;
  const [open, setOpen] = useState(false);
  const total = 399 + (ins ? 49 : 0) + (gift ? 29 : 0) + 60 + 30;
  const pay = () => onDecide({ level: open ? "partial" : "trapped", paid: true, total, saw: open,
    note: open ? `เปิดดูรายละเอียดแล้วจึงชำระเงิน ${total} บาท` : `กดชำระเงิน ${total} บาท โดยไม่เปิดดูรายละเอียด` });
  const cancel = () => onDecide({ level: "safe", paid: false, total: 0, note: "ยกเลิกคำสั่งซื้อเมื่อเห็นว่ายอดจริงสูงกว่า 399 บาทที่โฆษณา" });
  return (
    <div className="bg-[#FBFAFD] min-h-[440px]">
      <div className="px-8 py-4 border-b border-[#F2EEF9] text-[16px] font-bold text-[#3A3550] font-['Kanit']">ShopPastel · ชำระเงิน (ขั้นตอนสุดท้าย)</div>
      <div className="px-8 py-6 max-w-lg">
        <div className="text-[13px] text-[#5C566E] font-['Sarabun'] mb-2">ที่อยู่จัดส่ง: บ้านของคุณ · ช่องทางชำระเงิน: บัตรเครดิต •••• 4417</div>
        <button onClick={() => setOpen((v) => !v)} className="text-[11px] text-[#8B7FBF] underline font-['Sarabun'] mb-2">{open ? "ซ่อนรายละเอียดคำสั่งซื้อ" : "ดูรายละเอียดคำสั่งซื้อ"}</button>
        {open && (
          <div className="mb-3 space-y-1.5 text-[12px] text-[#5C566E] font-['Sarabun'] bg-[#FAF8FF] rounded-xl p-3">
            <div className="flex justify-between"><span>สินค้า</span><span>399 บาท</span></div>
            {ins && <div className="flex justify-between"><span>ประกันสินค้า</span><span>49 บาท</span></div>}
            {gift && <div className="flex justify-between"><span>ห่อของขวัญ</span><span>29 บาท</span></div>}
            <div className="flex justify-between text-[#D97A7A]"><span>ค่าจัดส่ง</span><span>60 บาท</span></div>
            <div className="flex justify-between text-[#D97A7A]"><span>ค่าบริการแพลตฟอร์ม</span><span>30 บาท</span></div>
          </div>
        )}
        <div className="border-t border-[#F0EDF7] pt-3 flex justify-between text-[14px] font-['Sarabun'] mb-4"><span>ยอดชำระสุทธิ</span><span className="font-bold text-[#3A3550]">{total} บาท</span></div>
        <button onClick={pay} className="w-full py-3.5 rounded-full bg-[#8ED9B6] text-[#204B3A] text-[14px] font-semibold font-['Kanit'] shadow-md hover:brightness-105">ชำระเงิน</button>
        <button onClick={cancel} className="mt-3 w-full text-[10px] text-[#D5D1E2] hover:text-[#9B96AC] font-['Sarabun']">ยกเลิกคำสั่งซื้อ</button>
      </div>
    </div>
  );
}

/* ================= ผลที่ตามมา: ใบเสร็จ ================= */
function Receipt({ prev, onNext }) {
  const p = prev["3.3"], extra = p.total - 399;
  return (
    <div className="bg-[#FBFAFD] py-8 px-4 min-h-[440px]">
      <div className="text-center mb-4 text-[12px] text-[#D97A7A] font-['Kanit']">⚠️ ฉากจำลองผลที่ตามมา (เพื่อการเรียนรู้)</div>
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-[#EEEAF6] p-6 font-['Sarabun']">
        <div className="text-center text-[16px] font-bold text-[#3A3550] font-['Kanit'] mb-3">🧾 ใบเสร็จ ShopPastel</div>
        <div className="flex justify-between text-[13px] text-[#5C566E] py-1"><span>ราคาที่คุณเห็นตอนแรก</span><span>399 บาท</span></div>
        <div className="flex justify-between text-[13px] text-[#D97A7A] py-1"><span>รายการที่เพิ่มเข้ามา</span><span>+{extra} บาท</span></div>
        <div className="border-t border-dashed border-[#DCD9E8] my-2" />
        <div className="flex justify-between text-[15px] font-bold text-[#3A3550]"><span>จ่ายจริง</span><span>{p.total} บาท</span></div>
        <div className="mt-3 rounded-xl bg-[#FDE9EC] text-[#D97A7A] text-[12px] p-3 text-center">คุณจ่ายเกินกว่าที่ตั้งใจ {Math.round((extra / 399) * 100)}%</div>
      </div>
      <div className="text-center"><button onClick={onNext} className="mt-5 px-8 py-3 rounded-full text-white font-['Kanit'] font-semibold shadow-lg" style={{ background: "linear-gradient(135deg,#C9BCE8,#8B7FBF)" }}>ต่อไป →</button></div>
    </div>
  );
}

export default {
  id: "ep3", time: "12:00", title: "ดีลนาทีสุดท้าย",
  intro: "พักเที่ยง คุณเห็นโฆษณาหูฟังไร้สายลดราคาจึงกดเข้าไปดูที่ร้านออนไลน์ ShopPastel…",
  scenes: [
    { id: "3.1", title: "หน้าสินค้า", domain: "shoppastel.com/product", story: "หน้าสินค้ามีตัวเลขและตัวจับเวลาเต็มไปหมด", patterns: ["Fake Urgency", "Scarcity"], Comp: Product,
      explain: (r) => r.level === "safe"
        ? "คุณเปรียบเทียบราคาก่อนตัดสินใจ ซึ่งเป็นวิธีรับมือที่ดีที่สุดกับตัวจับเวลา (Fake Urgency) และข้อความ 'เหลือ 3 ชิ้น/มีคนดู 27 คน' (Scarcity)"
        : r.noticedReset
        ? "คุณเห็นแล้วว่านาฬิกานับถอยหลังเริ่มใหม่เองและตัวเลขคนดูเปลี่ยนไปมา ซึ่งบอกว่าเป็น Fake Urgency และ Scarcity แต่ก็ยังตัดสินใจซื้อ"
        : "ตัวจับเวลาไม่ได้หมดจริง (จะเริ่มนับใหม่) เป็น Fake Urgency และตัวเลข 'เหลือ 3 ชิ้น/มีคนดู 27 คน' เป็น Scarcity ที่ใช้กระตุ้น FOMO" },
    { id: "3.2", title: "ตะกร้าสินค้า", domain: "shoppastel.com/cart", story: "คุณเปิดตะกร้าเพื่อไปชำระเงิน", patterns: ["Sneak into Basket"], Comp: Cart,
      explain: (r) => r.level === "safe"
        ? "คุณสังเกตเห็นประกันสินค้าและบริการห่อของขวัญที่ถูกใส่ไว้ในตะกร้าเอง และเอาออก (Sneak into Basket)"
        : "ประกันสินค้า +49 บาทและห่อของขวัญ +29 บาทถูกใส่ในตะกร้าเองด้วยตัวอักษรเล็กจาง ปุ่มชำระเงินโชว์แต่ 399 บาท ยอดรวมย่อยจริงอยู่ในบรรทัดเล็กมาก (Sneak into Basket)" },
    { id: "3.3", title: "ชำระเงิน", domain: "shoppastel.com/checkout", story: "เข้าสู่หน้าชำระเงินขั้นสุดท้าย", patterns: ["Hidden Costs"], Comp: Checkout,
      explain: (r) => !r.paid
        ? "คุณยกเลิกเมื่อเห็นว่ายอดจริงต่างจากราคาที่โฆษณา ค่าจัดส่ง 60 บาทและค่าบริการ 30 บาทเพิ่งโผล่ในขั้นสุดท้าย (Hidden Costs)"
        : "ค่าจัดส่ง 60 บาทและค่าบริการแพลตฟอร์ม 30 บาทเพิ่งปรากฏในหน้าสุดท้าย ทำให้ราคาจริงสูงกว่า 399 บาทที่โฆษณา (Hidden Costs)" },
  ],
  consequence: (prev) => (prev["3.3"]?.paid ? { Comp: Receipt, title: "ผลที่ตามมา: จ่ายเกินราคาที่เห็น" } : null),
  tipLine: "ราคาที่แท้จริงคือยอดสุทธิท้ายสุดของการชำระเงิน ให้เทียบกับราคาที่เห็นก่อนกดจ่ายเสมอ",
};
