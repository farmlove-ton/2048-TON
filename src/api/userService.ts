// src/api/userService.ts
import { get, post, put } from "./apiService";
import { ApiResponse, Sex } from "./types";

interface User {
  telegramId: number;
  chatId: string;
  username?: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  age?: number;
  sex?: Sex;
  photoUrl?: string;

  suggestionSex: Sex[];
  suggestionAgeMin: number;
  suggestionAgeMax: number;
  tickets: number;
  remainingTicketPart: number;
  lastFarmTicketTimestamp: string;
  ticketTimeToFull: number;
  maxFarmTickets: number;
  lovePoints: number;
  remainingLovePointPart: number;
  lastFarmLovePointTimestamp: string | null;
  lovePointTimeToFull: number;
  maxLovePoints: number;
  uncollectedLikes: number;
  maxLovePointsTime: number;
}

interface CreateUser {
  telegramId: number;
  chatId: string;
  username?: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  age?: number;
  sex?: Sex;
  suggestionSex: Sex[];
  suggestionAgeMin: number;
  suggestionAgeMax: number;
}

export const fetchUser = async (): Promise<User> => {
  return get<User>(`/user`);
};

export const fetchUserProfile = async (id: number): Promise<User> => {
  return get<User>(`/user/profile/${id}`);
};

export const createUser = async (
  user: CreateUser
): Promise<ApiResponse<User>> => {
  return post<ApiResponse<User>>("/user", user);
};

export const updateUserProfile = async (
  user: CreateUser
): Promise<ApiResponse<User>> => {
  return put<ApiResponse<User>>("/user", user, { method: "PUT" });
};

export const uploadPhoto = async (formData: FormData): Promise<string> => {
  return post<string>(`/user/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const retreiveDailyReward = async () => {
  return post<User>(`/user/tickets/dailyreward`);
};
