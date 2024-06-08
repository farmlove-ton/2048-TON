import { User } from "../domain/User";
import { getUserData } from "./telegram";

export const getUser = () => {
  const userData = getUserData();
  return (
    userData &&
    User.create({
      id: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
    })
  );
};
