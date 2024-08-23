import { get, post } from "./apiService";

export interface Like {
  suggestion: {
    telegramId: number;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    photoUrl: string;
  };
  likeTimestamp: string;
  collected: boolean;
}

export const fetchLikes = async (): Promise<Like[]> => {
  return get<Like[]>(`/user/likes`);
};

export const collectLikes = async (): Promise<Like[]> => {
  return post<Like[]>(`/user/likes/collect`);
};
