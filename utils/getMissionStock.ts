import { Milestone } from "@/types/mission";

const getLatestMilestone = (milestones: Milestone[]) => {
  const today = new Date();

  return milestones
    .filter((m) => m.milPassDate && new Date(m.milPassDate) <= today)
    .sort((a, b) => {
      const dateDiff =
        new Date(b.milPassDate!).getTime() - new Date(a.milPassDate!).getTime();

      if (dateDiff !== 0) return dateDiff;

      // tanggal sama → ambil yang paling akhir
      return b.idMil - a.idMil;
    })[0];
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
