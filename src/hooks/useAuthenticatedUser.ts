import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuthenticatedUser = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
