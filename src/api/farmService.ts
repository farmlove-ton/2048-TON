import { post } from "./apiService";

export const farm = async (userId: number): Promise<number> => {
  return post<number>(`/user/${userId}/farm`, null);
};
