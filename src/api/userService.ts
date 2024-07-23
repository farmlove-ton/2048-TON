// src/api/userService.ts
import { get, post } from "./apiService";
import { ApiResponse } from "./types";
import { enhanceResponse } from "./utils";

interface User {
  telegramId: number;
  chatId: string;
  username?: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  age?: number;
  sex?: string;
  love?: number;
  photoUrl?: string;
}

export const fetchUser = enhanceResponse(
  async (userId: number): Promise<User> => {
    return get<User>(`/user/${userId}`);
  },
  (res) => ({
    ...res,
    tickets: 1,
    farmCounter: 0.7,
    farmedAmount: 3,
    maxCounter: 5,
    updatedUserTicketsAmount: 32,
    timeToFull: 28800,
    points: 7430,
  })
);

export const createUser = async (
  user: Partial<User>
): Promise<ApiResponse<User>> => {
  return post<ApiResponse<User>>(`/user`, null, { params: user });
};

export const uploadPhoto = async (props: {
  userId: number;
  formData: FormData;
}): Promise<string> => {
  return post<string>("/user/${userId}/photo", props.formData, {
    params: { userId: props.userId },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
