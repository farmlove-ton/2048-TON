import { useQuery } from "@tanstack/react-query";
import { createContext, useMemo } from "react";
import { fetchUser } from "../api/userService";
import { getTgUser } from "../lib/adapter";

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

  tickets: number;
  points: number;
  farmCounter: number;
  farmedAmount: number;
  maxCounter: number;
  updatedUserTicketsAmount: number;
  timeToFull: number;
}

interface UserContextType {
  user: User | null;
  isFetched: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isFetched: false,
});

interface IProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: IProps) => {
  const tgUser = getTgUser();

  if (!tgUser) {
    throw new Error("Telegram user not defined");
  }

  const { data, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(tgUser.id),
    retry: false,
  });

  const user = useMemo(() => data || null, [data]);

  return (
    <UserContext.Provider value={{ user, isFetched }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
