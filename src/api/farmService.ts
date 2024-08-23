import { post } from "./apiService";

interface FarmResult {
  farmCounter: number;
  farmedAmount: number;
  maxCounter: number;
  newAmount: number;
  timeToFull: number;
}

export const farmLovePoints = async (): Promise<FarmResult> => {
  return post<FarmResult>(`/user/lovepoints/farm`);
};
