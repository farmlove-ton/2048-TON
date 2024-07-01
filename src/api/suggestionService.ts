import { get } from "./apiService";

interface Suggestion {
  telegramId: number;
  chatId: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  sex: string;
  love: number;
  photoUrl: string;
}

export const fetchSuggestion = async (userId: number): Promise<Suggestion> => {
  return get<Suggestion>(`/user/${userId}/suggestion`);
};
