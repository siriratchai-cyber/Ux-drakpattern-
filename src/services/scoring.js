import { PATTERN_KEYS } from "../data/patterns";
import { EXPERT_SDS } from "../data/sds";

/* ===== เกณฑ์การให้คะแนน (รวม 100 คะแนน) =====
   ส่วน A การตัดสินใจในสถานการณ์ย่อย 12 ข้อ x 5 = 60
   ส่วน B การสังเกต Dark Pattern หลังจบแต่ละสถานการณ์ใหญ่ 5 ข้อ x 6 = 30
   ส่วน C แบบประเมิน SDS เทียบกับค่าอ้างอิง = 10                        */
export const DECISION_POINTS = { safe: 5, partial: 2, trapped: 0 };
export const RECOG_MAX = 6;
export const SDS_MAX = 10;

/* B: คะแนน = 6 x max(0, ถูก - 0.5 x ผิด) / จำนวนจริง */
export function recognitionPoints(truth, selected) {
  if (!selected || selected.length === 0) return 0;
  const tp = selected.filter((s) => truth.includes(s)).length;
  const fp = selected.length - tp;
  const raw = (RECOG_MAX * Math.max(0, tp - 0.5 * fp)) / truth.length;
  return Math.min(RECOG_MAX, Math.round(raw * 10) / 10);
}

/* C: คะแนน = 10 - |SDS ผู้เล่น - SDS อ้างอิง| / 10 */
export function sdsPoints(sdsScore) {
  return Math.max(0, Math.round((SDS_MAX - Math.abs(sdsScore - EXPERT_SDS) / 10) * 10) / 10);
}
export function sdsFromAnswers(answers) {
  return answers.reduce((a, b) => a + b, 0) * 5;
}

export function getBadge(score) {
  if (score >= 85) return { name: "นักสืบดิจิทัล", sub: "Digital Detective", emoji: "🕵️‍♀️", color: "#4E9C7B", bg: "#CFF3E5" };
  if (score >= 50) return { name: "ผู้ใช้ที่รอบคอบ", sub: "Careful User", emoji: "🧐", color: "#8B7FBF", bg: "#E6DFFB" };
  return { name: "เหยื่อ Dark Pattern", sub: "Dark Pattern Victim", emoji: "😵‍💫", color: "#D97A7A", bg: "#FBD8E3" };
}

/* รวมผลทั้งหมด episodes = [{id, scenes:[{id,level,patterns}], truth, selected}] */
export function computeTotals(epResults, sdsAnswers) {
  let decisionPts = 0, recognitionPts = 0;
  const perEpisode = epResults.map((e) => {
    const d = e.scenes.reduce((s, sc) => s + DECISION_POINTS[sc.level], 0);
    const r = recognitionPoints(e.truth, e.selected);
    decisionPts += d; recognitionPts += r;
    return { id: e.id, decisionPts: d, recognitionPts: r };
  });
  const sdsScore = sdsFromAnswers(sdsAnswers);
  const sdsPts = sdsPoints(sdsScore);
  const total = Math.round(decisionPts + recognitionPts + sdsPts);
  return {
    score: total, decisionPts, recognitionPts: Math.round(recognitionPts * 10) / 10,
    sdsPts, sdsScore, perEpisode,
  };
}

/* วิเคราะห์รายรูปแบบ: ตกหลุมพราง / เกือบ / สังเกตไม่ได้ / รอด */
export function analyzePatterns(epResults) {
  const out = {};
  PATTERN_KEYS.forEach((k) => (out[k] = { decision: null, recognition: null }));
  const rank = { safe: 0, partial: 1, trapped: 2 };
  epResults.forEach((e) => {
    e.scenes.forEach((sc) => sc.patterns.forEach((p) => {
      const cur = out[p].decision;
      if (cur === null || rank[sc.level] > rank[cur]) out[p].decision = sc.level;
    }));
    e.truth.forEach((p) => {
      const hit = e.selected.includes(p);
      if (out[p].recognition === null || !hit) out[p].recognition = hit ? "hit" : "miss";
    });
  });
  const missed = PATTERN_KEYS.filter((k) => out[k].decision === "trapped" || out[k].decision === "partial" || out[k].recognition === "miss");
  return { table: out, missed };
}
