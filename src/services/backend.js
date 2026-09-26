/* ชั้นบริการฐานข้อมูล: เก็บชื่อผู้ใช้ + รหัสผ่านแบบ hash (SHA-256) ธรรมดา
   ไม่ใช้ระบบ Auth ของ Supabase เลย แค่ตาราง players + attempts ปกติ
   รหัสผ่านถูก hash ที่ฝั่งเบราว์เซอร์ก่อนส่งขึ้นฐานข้อมูลเสมอ (ไม่ส่ง plaintext)
   ถ้ายังไม่ได้ตั้งค่า .env จะทำงานในโหมดสาธิต (เก็บใน localStorage ของเบราว์เซอร์) */
import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const IS_DEMO = !URL || !KEY;

const supabase = IS_DEMO ? null : createClient(URL, KEY);

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------- session (ใช้ localStorage ทั้งสองโหมด เพราะไม่มี Auth token ให้พึ่ง) ---------- */
const LS_SESSION = "dpg_session";
const LS_USERS = "dpg_users";       // ใช้เฉพาะโหมดสาธิต
const LS_ATTEMPTS = "dpg_attempts"; // ใช้เฉพาะโหมดสาธิต
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const listeners = new Set();
const notify = () => { const s = read(LS_SESSION, null); listeners.forEach((cb) => cb(s)); };
const fail = (code) => { const e = new Error(code); e.code = code; throw e; };

export function onAuthChange(cb) {
  listeners.add(cb);
  cb(read(LS_SESSION, null));
  return () => listeners.delete(cb);
}

export async function register({ nickname, password }) {
  const hash = await sha256(password);
  if (IS_DEMO) {
    const users = read(LS_USERS, {});
    if (users[nickname]) fail("auth/username-taken");
    const uid = "demo-" + Date.now();
    users[nickname] = { uid, nickname, hash };
    write(LS_USERS, users);
    write(LS_SESSION, { uid, nickname });
    return notify();
  }
  const { data: existing } = await supabase.from("players").select("id").eq("username", nickname).maybeSingle();
  if (existing) fail("auth/username-taken");
  const { data, error } = await supabase
    .from("players")
    .insert({ username: nickname, password_hash: hash })
    .select("id, username")
    .single();
  if (error) throw error;
  write(LS_SESSION, { uid: data.id, nickname: data.username });
  notify();
}

export async function login({ nickname, password }) {
  const hash = await sha256(password);
  if (IS_DEMO) {
    const u = read(LS_USERS, {})[nickname];
    if (!u || u.hash !== hash) fail("auth/invalid-credential");
    write(LS_SESSION, { uid: u.uid, nickname });
    return notify();
  }
  const { data, error } = await supabase
    .from("players")
    .select("id, username, password_hash")
    .eq("username", nickname)
    .maybeSingle();
  if (error || !data || data.password_hash !== hash) fail("auth/invalid-credential");
  write(LS_SESSION, { uid: data.id, nickname: data.username });
  notify();
}

export async function logout() {
  localStorage.removeItem(LS_SESSION);
  notify();
}

/* บันทึกเฉพาะผลการประเมิน */
export async function saveAttempt(user, attempt) {
  if (IS_DEMO) {
    const all = read(LS_ATTEMPTS, {});
    (all[user.uid] ||= []).push({ ...attempt, createdAt: Date.now() });
    return write(LS_ATTEMPTS, all);
  }
  await supabase.from("attempts").insert({
    player_id: user.uid,
    score: attempt.score,
    decision_pts: attempt.decisionPts,
    recognition_pts: attempt.recognitionPts,
    sds_score: attempt.sdsScore,
  });
}

export async function loadAttempts(user) {
  if (IS_DEMO) return (read(LS_ATTEMPTS, {})[user.uid] || []).slice().sort((a, b) => a.createdAt - b.createdAt);
  const { data, error } = await supabase
    .from("attempts")
    .select("*")
    .eq("player_id", user.uid)
    .order("created_at", { ascending: true });
  if (error) return [];
  return data.map((r) => ({
    score: r.score, decisionPts: r.decision_pts, recognitionPts: r.recognition_pts,
    sdsScore: r.sds_score, createdAt: new Date(r.created_at).getTime(),
  }));
}

export function authErrorMessage(err) {
  const m = {
    "auth/username-taken": "ชื่อผู้ใช้นี้ถูกใช้แล้ว",
    "auth/invalid-credential": "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
  };
  return m[err?.code] || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
}