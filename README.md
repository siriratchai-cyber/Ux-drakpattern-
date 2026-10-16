# UX Dark Pattern Awareness — เกมประเมินและสร้างความตระหนักรู้เกี่ยวกับ UX Dark Pattern

โปรเจกต์สัมมนา (CP353761) — เว็บเกม Interactive Story ที่ให้ผู้เล่นสวมบทบาทเป็น "เคท"
ใช้ชีวิตหนึ่งวัน ผ่าน 5 สถานการณ์หลัก (Episode) บนเว็บไซต์และแอปพลิเคชันจำลอง
ที่สอดแทรก UX Dark Pattern ครบทั้ง 10 รูปแบบ พร้อมระบบประเมินระดับความตระหนักรู้
(อิงแนวคิด System Darkness Scale ของ van Nimwegen, Akdag & Bergman, 2022)

## โครงสร้างเนื้อหา
- **Ep.1 08:00 ลิงก์ไวรัลยามเช้า** — Privacy Zuckering, Preselected Options, Misdirection
- **Ep.2 10:30 เพลย์ลิสต์แสนสมบูรณ์แบบ** — Forced Continuity, Hidden Costs, Confirmshaming
- **Ep.3 12:00 ดีลนาทีสุดท้าย** — Fake Urgency, Scarcity, Sneak into Basket, Hidden Costs
- **Ep.4 15:00 แอปออกกำลังกายสุดฮิต** — Privacy Zuckering, Misdirection, Scarcity, Fake Urgency
- **Ep.5 22:00 เขาวงกตแห่งการยกเลิก** — Roach Motel, Misdirection, Confirmshaming, Preselected Options

แต่ละ Episode มีสถานการณ์ย่อย (scene) 2–3 ฉาก ตามด้วย "ฉากผลที่ตามมา" จำลองผลลัพธ์ของการตัดสินใจ
(เช่น มิจฉาชีพทักแชท / ยอดเงินถูกหักอัตโนมัติ / ข้อมูลส่วนตัวรั่วไหล) และคำถามท้ายตอน
"คุณคิดว่ามี Dark Pattern แบบไหนบ้าง" ก่อนต่อไป Episode ถัดไป

หลังจบทั้ง 5 Episode จะมีแบบประเมิน System Darkness Scale (SDS) 5 ข้อ ก่อนแสดงผลคะแนนรวม
(100 คะแนน: การตัดสินใจ 60 + การสังเกต Dark Pattern 30 + SDS 10) พร้อมระดับ (Badge)
และคำแนะนำการป้องกันตัวเอง

## ระบบผู้ใช้และฐานข้อมูล
ใช้ **Supabase (PostgreSQL)** เป็นฐานข้อมูล ผู้เล่นสมัครและล็อกอินด้วย **ชื่อผู้ใช้ + รหัสผ่าน**
(ไม่ใช้อีเมล) และระบบเก็บ **เฉพาะผลการประเมิน** (คะแนนรวมและคะแนนย่อย) ไว้ดูพัฒนาการย้อนหลัง
โดย **ไม่เก็บเพศ อายุ หรือข้อมูลส่วนตัวอื่นใด** เพื่อลดประเด็น PDPA

ระบบล็อกอินพัฒนาขึ้นเอง ไม่ได้ใช้ Supabase Auth: รหัสผ่านถูกแปลงเป็นค่าแฮช SHA-256
ที่ฝั่งเบราว์เซอร์ก่อนส่งขึ้นฐานข้อมูลเสมอ (ไม่ส่งรหัสผ่านจริง) และเก็บสถานะการล็อกอินไว้ใน localStorage

### ตารางในฐานข้อมูล
- `players` — `id` (uuid), `username` (ไม่ซ้ำ, 1–50 ตัวอักษร), `password_hash` (SHA-256, 64 ตัวอักษร), `created_at`
- `attempts` — `id`, `player_id` (อ้างอิง `players.id`), `score` (0–100), `decision_pts` (0–60),
  `recognition_pts` (0–30), `sds_score` (0–100), `created_at`

เปิด Row Level Security ทั้งสองตาราง โดยให้บทบาท `anon` ทำได้เฉพาะ `SELECT` และ `INSERT`
(ไม่อนุญาต `UPDATE` และ `DELETE`) และมี CHECK constraint จำกัดช่วงคะแนนตามสูตรใน `scoring.js`

### วิธีตั้งค่า Supabase
1. สร้างโปรเจกต์ที่ https://supabase.com แล้วสร้างตาราง `players` และ `attempts` ตามโครงสร้างด้านบน
2. เปิด RLS ทั้งสองตาราง และสร้าง policy `SELECT` และ `INSERT` สำหรับบทบาท `anon`
3. คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่าจาก Project Settings > API
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon (publishable) key
   
   ห้ามใส่ `service_role` key ในโปรเจกต์นี้ และไฟล์ `.env` ถูกตั้งค่าให้ git ไม่ติดตาม

หากไม่ตั้งค่า `.env` แอปจะทำงานใน **โหมดสาธิต** โดยเก็บบัญชีและผลคะแนนไว้ใน
localStorage ของเบราว์เซอร์แทน (ใช้ทดสอบ/สาธิตได้โดยไม่ต้องมี Supabase)

### ข้อจำกัดของระบบล็อกอิน
เนื่องจากไม่ได้ใช้ Supabase Auth การตรวจรหัสผ่านทำที่ฝั่งเบราว์เซอร์ จึงไม่เหมาะกับข้อมูลที่ละเอียดอ่อน
ระบบนี้เก็บเพียงชื่อผู้ใช้และคะแนนการประเมิน และแนะนำให้ผู้เล่นไม่ใช้รหัสผ่านเดียวกับบริการอื่น

## การติดตั้งและรัน
```bash
npm install
npm run dev       # โหมดพัฒนา
npm run build     # สร้างไฟล์สำหรับ deploy (โฟลเดอร์ dist)
npm run preview   # ดูผลลัพธ์หลัง build
```

## การ Deploy
ใช้ได้กับ Vercel หรือ Netlify: เชื่อมกับ GitHub repository, ตั้ง Build command เป็น `npm run build`
และ Output directory เป็น `dist` จากนั้นเพิ่ม Environment Variables `VITE_SUPABASE_URL` และ
`VITE_SUPABASE_ANON_KEY` ในหน้าตั้งค่าของโฮสต์ก่อนสั่ง deploy (Vite ฝังค่าตอน build)

## โครงสร้างโค้ดที่เพิ่ม/ปรับจากเวอร์ชันเดิม
```
src/
  data/patterns.js      นิยาม/ตัวอย่าง/วิธีป้องกัน ของ 10 Dark Pattern
  data/sds.js            ข้อความแบบประเมิน System Darkness Scale
  services/scoring.js    สูตรคำนวณคะแนนและ badge
  services/backend.js    ชั้นเชื่อม Supabase (ล็อกอินด้วยชื่อผู้ใช้ + บันทึกผลคะแนน, มีโหมดสาธิตในตัว)
  components/ui.jsx      คอมโพเนนต์ใช้ร่วม (กรอบเบราว์เซอร์/โทรศัพท์ ฯลฯ)
  episodes/ep1..ep5.jsx  ฉากสถานการณ์และฉากผลที่ตามมาของแต่ละ Episode
  screens/Auth.jsx       หน้าล็อกอิน/สมัครสมาชิก
  screens/Home.jsx       หน้าหลัก + กราฟพัฒนาการ
  screens/Game.jsx       ตัวคุมลำดับเกม (intro→scene→explain→consequence→recognize→SDS)
  screens/Results.jsx    หน้าสรุปผลคะแนน
```