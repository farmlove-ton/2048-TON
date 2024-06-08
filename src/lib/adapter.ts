import { TgUser } from "../domain/TgUser";
import { getUserData } from "./telegram";

export const getTgUser = () => {
  const userData = getUserData();
  return (
    userData &&
    TgUser.create({
      id: userData.id,
      firstName: userData.first_name,
      lastName: userData.last_name,
      username: userData.username,
    })
  );
};
