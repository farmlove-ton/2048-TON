export type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
  // other fields...
};
