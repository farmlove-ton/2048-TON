export type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
  // other fields...
};

export type Sex = "Male" | "Female";
