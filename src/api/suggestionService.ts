import { get, post } from "./apiService";
import { Sex } from "./types";

interface Suggestion {
  telegramId: number;
  chatId: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  sex: Sex;
  lovePoints: number;
  photoUrl: string;
}

interface LikedSuggestion {
  match: boolean;
}

export const fetchSuggestion = async (): Promise<Suggestion> => {
  return get<Suggestion>(`/user/suggestion`);
};

export const like = async (suggestionId: number): Promise<LikedSuggestion> => {
  return post<LikedSuggestion>(`/user/like/${suggestionId}`);
};
