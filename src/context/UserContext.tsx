import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useRef } from "react";
import { fetchUser, retreiveDailyReward } from "../api/userService";
import { farmLovePoints } from "../api/farmService";
import { Sex } from "../api/types";

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
  suggestionAgeMin?: number;
  suggestionAgeMax?: number;
  tickets: number;
  remainingTicketPart: number;
  lastFarmTicketTimestamp: string;
  ticketTimeToFull: number;
  maxFarmTickets: number;
  lovePoints: number;
  remainingLovePointPart: number;
  lastFarmLovePointTimestamp: string;
  lovePointTimeToFull: number;
  maxLovePoints: number;
  uncollectedLikes: number;
}

interface UserContextType {
  user: User | null;
  isFetched: boolean;
  refetchUser: () => void;
  farmLovePoints: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isFetched: false,
  refetchUser: () => {},
  farmLovePoints: () => {},
});

interface IProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: IProps) => {
  const rewardRetrieved = useRef(false);

  const queryClient = useQueryClient();

  const { data, isFetched, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  });

  const user = useMemo(() => data || null, [data]);

  const retreiveDailyRewardMutation = useMutation({
    mutationFn: retreiveDailyReward,
    onSuccess: (data) => {
      if (!user) {
        throw new Error("User not found");
      }

      queryClient.setQueryData<User>(["user"], {
        ...user,
        tickets: data.tickets,
      });
    },
  });

  useEffect(() => {
    if (user && !rewardRetrieved.current) {
      retreiveDailyRewardMutation.mutate();
      rewardRetrieved.current = true;
    }
  }, [user, rewardRetrieved]);

  const farmLovePointsMutation = useMutation({
    mutationFn: farmLovePoints,
    onSuccess: (data) => {
      if (!user) {
        throw new Error("User not found");
      }

      queryClient.setQueryData<User>(["user"], {
        ...user,
        lovePoints: data.newAmount,
        remainingLovePointPart: data.farmCounter,
        lovePointTimeToFull: data.timeToFull,
        maxLovePoints: data.maxCounter,
      });
    },
  });

  const handleFarmLovePoints = () => {
    farmLovePointsMutation.mutate();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isFetched,
        refetchUser: refetch,
        farmLovePoints: handleFarmLovePoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
