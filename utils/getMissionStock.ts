import { Milestone } from "@/types/mission";

const getLatestMilestone = (milestones?: Milestone[]) => {
  if (!Array.isArray(milestones) || milestones.length === 0) {
    return undefined;
  }

  const today = new Date();

  const passed = milestones
    .filter((m) => m.milPassDate && new Date(m.milPassDate) <= today)
    .sort((a, b) => {
      const dateDiff =
        new Date(b.milPassDate!).getTime() - new Date(a.milPassDate!).getTime();

      if (dateDiff !== 0) return dateDiff;
      return b.idMil - a.idMil;
    });

  // ✅ kalau ada yang sudah pass, pakai itu
  if (passed.length > 0) {
    return passed[0];
  }

  // ✅ kalau belum ada yang pass, pakai milestone terakhir (id terbesar)
  return [...milestones].sort((a, b) => b.idMil - a.idMil)[0];
};

type StockResult =
  | { type: "infinity" }
  | { type: "number"; value: number }
  | { type: "empty" };

const getMissionStock = (milestones: Milestone[]): StockResult => {
  const latest = getLatestMilestone(milestones);

  if (!latest) return { type: "empty" };

  // 🔥 ATURAN UTAMA
  if (latest.sisaClaim === "-") {
    return { type: "infinity" };
  }

  const stock = Number(latest.sisaClaim);

  if (!Number.isFinite(stock) || stock <= 0) {
    return { type: "empty" };
  }

  return { type: "number", value: stock };
};

export default getMissionStock;
