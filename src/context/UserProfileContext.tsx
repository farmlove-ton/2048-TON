import { createContext, useState } from "react";
import { getTgUser } from "../lib/adapter";

interface UserProfile {
  telegramId: number;
  name: string;
  bio?: string;
  age?: number;
  gender?: string;
  photo?: string;
}

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: { telegramId: 0, name: "" },
  setUserProfile: () => {},
});

interface IProps {
  children: React.ReactNode;
}

const UserProfileProvider = ({ children }: IProps) => {
  const tgUser = getTgUser();

  if (!tgUser) {
    throw new Error("Telegram user not defined");
  }

  const [userProfile, setUserProfile] = useState<UserProfile>({
    telegramId: tgUser?.id,
    name: tgUser?.fullName,
  });

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
