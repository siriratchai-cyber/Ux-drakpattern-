import React, { useState } from "react";
import { PrimaryBtn, GRAD_PURPLE } from "../components/ui";
import { register, login, authErrorMessage, IS_DEMO } from "../services/backend";

export default function Auth({ onDone }) {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ nickname: "", password: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      if (!f.nickname.trim()) throw { code: "custom/nickname" };
      if (f.password.length < 6) throw { code: "custom/weak-password" };
      if (mode === "register") await register(f);
      else await login(f);
      onDone();
    } catch (e2) {
      if (e2.code === "custom/nickname") setErr("กรุณากรอกชื่อผู้ใช้");
      else if (e2.code === "custom/weak-password") setErr("รหัสผ่านสั้นเกินไป (อย่างน้อย 6 ตัวอักษร)");
      else setErr(authErrorMessage(e2));
    } finally { setBusy(false); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(160deg,#F5F2FA,#E6DFFB 60%,#CFF3E5)" }}>
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="text-[34px] mb-1">🕵️‍♀️</div>
          <div className="text-[20px] font-bold text-[#3A3550] font-['Kanit']">UX Dark Pattern Awareness</div>
          <p className="text-[12px] text-[#9B96AC] font-['Sarabun'] mt-1">เกมประเมินและสร้างความตระหนักรู้เกี่ยวกับ UX Dark Pattern</p>
          {IS_DEMO && <p className="text-[10px] text-[#C9A15A] font-['Sarabun'] mt-2 bg-[#FFF6E0] rounded-full px-3 py-1 inline-block">โหมดสาธิต — ข้อมูลเก็บในเบราว์เซอร์นี้เท่านั้น</p>}
        </div>
        <div className="flex mb-5 bg-[#F5F2FA] rounded-full p-1">
          {["login", "register"].map((m) => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }}
              className={`flex-1 py-2 rounded-full text-[13px] font-['Kanit'] font-medium ${mode === m ? "bg-white shadow text-[#3A3550]" : "text-[#B9B4C7]"}`}>
              {m === "login" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input value={f.nickname} onChange={(e) => setF({ ...f, nickname: e.target.value })} placeholder="ชื่อผู้ใช้"
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8FF] border border-[#EEEAF6] text-[13px] font-['Sarabun'] focus:outline-none focus:border-[#C9BCE8]" />
          <input type="password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
            className="w-full px-4 py-3 rounded-xl bg-[#FAF8FF] border border-[#EEEAF6] text-[13px] font-['Sarabun'] focus:outline-none focus:border-[#C9BCE8]" />
          {err && <div className="text-[11px] text-[#D97A7A] font-['Sarabun'] text-center">{err}</div>}
          <PrimaryBtn style={GRAD_PURPLE} className="w-full !py-3">{busy ? "กำลังดำเนินการ…" : mode === "login" ? "เข้าสู่ระบบ" : "สร้างบัญชี"}</PrimaryBtn>
        </form>
        <p className="text-center text-[10px] text-[#DCD9E8] font-['Sarabun'] mt-4">เราเก็บเฉพาะชื่อผู้ใช้และผลการประเมินของคุณ ไม่มีการเก็บอีเมล เพศ หรืออายุ</p>
      </div>
    </div>
  );
}