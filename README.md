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
ใช้ **Firebase Authentication** (อีเมล/รหัสผ่าน) + **Cloud Firestore** เพื่อให้ผู้เล่น
ล็อกอินด้วยชื่อเล่น/อีเมล/รหัสผ่าน และเก็บ **เฉพาะผลการประเมิน** (คะแนนรวมและคะแนนย่อย)
ไว้ดูพัฒนาการย้อนหลัง โดย **ไม่เก็บเพศ อายุ หรือข้อมูลส่วนตัวอื่นใด** เพื่อลดประเด็น PDPA

### วิธีตั้งค่า Firebase
1. สร้างโปรเจกต์ที่ https://console.firebase.google.com แล้วเปิดใช้งาน
   Authentication (Email/Password) และ Firestore Database
2. คัดลอก `.env.example` เป็น `.env` แล้วใส่ค่าจาก Project settings > Your apps (Web)
3. นำกฎในไฟล์ `firestore.rules` ไปตั้งค่าใน Firestore Console (Rules)

หากไม่ตั้งค่า `.env` แอปจะทำงานใน **โหมดสาธิต** โดยเก็บบัญชีและผลคะแนนไว้ใน
localStorage ของเบราว์เซอร์แทน (ใช้ทดสอบ/สาธิตได้โดยไม่ต้องมี Firebase)

## การติดตั้งและรัน
```bash
npm install
npm run dev       # โหมดพัฒนา
npm run build     # สร้างไฟล์สำหรับ deploy (โฟลเดอร์ dist)
npm run preview   # ดูผลลัพธ์หลัง build
```

## โครงสร้างโค้ดที่เพิ่ม/ปรับจากเวอร์ชันเดิม
```
src/
  data/patterns.js      นิยาม/ตัวอย่าง/วิธีป้องกัน ของ 10 Dark Pattern
  data/sds.js            ข้อความแบบประเมิน System Darkness Scale
  services/scoring.js    สูตรคำนวณคะแนนและ badge
  services/backend.js    ชั้นเชื่อม Firebase Auth + Firestore (มีโหมดสาธิตในตัว)
  components/ui.jsx      คอมโพเนนต์ใช้ร่วม (กรอบเบราว์เซอร์/โทรศัพท์ ฯลฯ)
  episodes/ep1..ep5.jsx  ฉากสถานการณ์และฉากผลที่ตามมาของแต่ละ Episode
  screens/Auth.jsx       หน้าล็อกอิน/สมัครสมาชิก
  screens/Home.jsx       หน้าหลัก + กราฟพัฒนาการ
  screens/Game.jsx       ตัวคุมลำดับเกม (intro→scene→explain→consequence→recognize→SDS)
  screens/Results.jsx    หน้าสรุปผลคะแนน
```
