export type Milestone = {
  idMil: number;
  milDesc: string;
  milValue: number;
  milClaimStatus: string;
  milClaimDate: string | null;
  milPassDate: string | null;
  milReward: string;
  milCurrentValue: number;
  RewardCategory: string;
  sisaClaim: number | string | null;
};

export type Mission = {
  id: number;
  title: string;
  category: string;
  brand: string;
  description: string;
  currentValue: number;
  maxValue: number;
  milestones: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
  progressText: string;
  statusMission: string;
  milestonesDetail: Milestone[];
};
