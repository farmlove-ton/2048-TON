import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect } from "react";
import {
  DailyReward,
  fetchUser,
  retreiveDailyReward,
} from "../api/userService";
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
  lastFarmLovePointTimestamp: string | null;
  lovePointTimeToFull: number;
  maxLovePoints: number;
  uncollectedLikes: number;
  maxLovePointsTime: number;
}

interface UserContextType {
  user: User | null;
  isFetched: boolean;
  refetchUser: () => void;
  farmLovePoints: () => void;
  takeTicket: () => void;
  dailyReward: DailyReward | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isFetched: false,
  refetchUser: () => {},
  farmLovePoints: () => {},
  takeTicket: () => {},
  dailyReward: null,
});

interface IProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: IProps) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetched,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    refetchInterval: 10000,
  });

  const retreiveDailyRewardMutation = useMutation({
    mutationFn: retreiveDailyReward,
    onSuccess: (data) => {
      if (!user) {
        throw new Error("User not found");
      }

      queryClient.setQueryData<User>(["user"], {
        ...user,
        tickets: data.updatedUserTicketsAmount,
      });
    },
  });

  useEffect(() => {
    if (user) {
      retreiveDailyRewardMutation.mutate();
    }
  }, [user]);

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
        lastFarmLovePointTimestamp: data.lastFarmLovePointTimestamp,
        maxLovePointsTime: data.maxLovePointsTime,
      });
    },
    onMutate: () => {
      if (!user) {
        throw new Error("User not found");
      }

      queryClient.setQueryData<User>(["user"], {
        ...user,
        lastFarmLovePointTimestamp: new Date().toISOString(),
      });
    },
  });

  const takeTicket = () => {
    if (!user) {
      throw new Error("User not found");
    }

    queryClient.setQueryData<User>(["user"], {
      ...user,
      tickets: user.tickets - 1,
    });
  };

  const handleFarmLovePoints = () => {
    farmLovePointsMutation.mutate();
  };

  return (
    <UserContext.Provider
      value={{
        user: user || null,
        isFetched,
        refetchUser: refetch,
        farmLovePoints: handleFarmLovePoints,
        takeTicket,
        dailyReward: retreiveDailyRewardMutation.data || null,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
