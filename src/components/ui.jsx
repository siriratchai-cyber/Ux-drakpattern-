import React from "react";

export function BrowserWindow({ domain, children }) {
  return (
    <div className="w-full rounded-2xl bg-white shadow-2xl border border-[#EEEAF6] overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 bg-[#FAF8FC] border-b border-[#EEEAF6]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F3B8B8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5DBA0]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#B4E3C6]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 rounded-full bg-white border border-[#EEEAF6] text-[12px] text-[#9B96AC] font-['Sarabun'] max-w-xs w-full text-center truncate">
            {domain}
          </div>
        </div>
        <div className="w-10" />
      </div>
      <div className="relative min-h-[440px]">{children}</div>
    </div>
  );
}

/* กรอบโทรศัพท์สำหรับฉากผลที่ตามมา */
export function PhoneFrame({ children, tint = "#1F1B2E" }) {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[2.2rem] border-[6px] p-0 shadow-2xl overflow-hidden" style={{ borderColor: tint, background: "#fff" }}>
      <div className="h-5 flex items-center justify-center" style={{ background: tint }}>
        <div className="w-16 h-1.5 rounded-full bg-white/30" />
      </div>
      {children}
    </div>
  );
}

export function Chip({ children, color = "#8B7FBF", bg = "#F0EDFB" }) {
  return (
    <span className="text-[11px] px-2.5 py-0.5 rounded-full font-['Sarabun'] font-medium" style={{ color, background: bg }}>
      {children}
    </span>
  );
}

export function PrimaryBtn({ children, onClick, className = "", style }) {
  return (
    <button onClick={onClick} style={style}
      className={`px-8 py-3.5 rounded-full font-['Kanit'] font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] ${className}`}>
      {children}
    </button>
  );
}
export const GRAD_GREEN = { background: "linear-gradient(135deg,#9BE3C4,#8ED9B6)" };
export const GRAD_PURPLE = { background: "linear-gradient(135deg,#C9BCE8,#8B7FBF)" };
export const GRAD_PINK = { background: "linear-gradient(135deg,#F5A8C4,#EF8FB0)" };

export const LEVEL_UI = {
  safe: { label: "รอดพ้น", icon: "✅", color: "#4E9C7B", bg: "#E4F8EE" },
  partial: { label: "เกือบรอด", icon: "⚠️", color: "#B7873A", bg: "#FFF3D9" },
  trapped: { label: "ตกหลุมพราง", icon: "❌", color: "#D97A7A", bg: "#FDE9EC" },
};
