import ep1 from "./ep1.jsx";
import ep2 from "./ep2.jsx";
import ep3 from "./ep3.jsx";
import ep4 from "./ep4.jsx";
import ep5 from "./ep5.jsx";

/* truth = ชุด Dark Pattern จริงของแต่ละสถานการณ์ใหญ่ (รวมจากสถานการณ์ย่อย) */
export const EPISODES = [ep1, ep2, ep3, ep4, ep5].map((e) => ({
  ...e,
  truth: Array.from(new Set(e.scenes.flatMap((s) => s.patterns))),
}));
