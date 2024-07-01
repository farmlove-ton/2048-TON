// src/api/userService.ts
import { get, post } from "./apiService";
import { ApiResponse } from "./types";

interface User {
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

export const fetchUser = async (userId: number): Promise<User> => {
  return get<User>(`/user/${userId}`);
};

export const createUser = async (user: User): Promise<ApiResponse<User>> => {
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
