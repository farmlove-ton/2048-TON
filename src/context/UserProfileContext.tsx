import { createContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getTgUser } from "../lib/adapter";
import { createUser, updateUserProfile, uploadPhoto } from "../api/userService";
import { Sex } from "../api/types";

interface UserProfile {
  telegramId: number;
  chatId: string;
  username?: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  age?: number;
  sex?: Sex;
  photo?: File;
  suggestionAge: { from: number; to: number };
  suggestionSex: Sex[];
}

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
  registerUser: (userProfile: UserProfile) => Promise<void>;
  updateUser: (userProfile: UserProfile) => Promise<void>;
  isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: {
    telegramId: 0,
    chatId: "",
    username: "",
    firstName: "",
    lastName: "",
    bio: "",
    age: 0,
    sex: "Male",
    suggestionAge: { from: 20, to: 30 },
    suggestionSex: [],
    photo: undefined,
  },
  setUserProfile: () => {},
  updateUser: () => new Promise(() => {}),
  registerUser: () => new Promise(() => {}),
  isLoading: false,
});

interface IProps {
  children: React.ReactNode;
}

const UserProfileProvider = ({ children }: IProps) => {
  const tgUser = getTgUser();

  const [isLoading, setLoading] = useState(false);

  if (!tgUser) {
    throw new Error("Telegram user not defined");
  }

  const queryClient = useQueryClient();

  const [userProfile, setUserProfile] = useState<UserProfile>({
    telegramId: tgUser.id,
    chatId: "someid",
    username: tgUser.username || "",
    firstName: tgUser.firstName,
    lastName: tgUser.lastName || "",
    age: 25,
    sex: "Male",
    bio: "",
    photo: undefined,
    suggestionSex: [],
    suggestionAge: { from: 20, to: 30 },
  });

  const registerUserMutation = useMutation({
    mutationFn: createUser,
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: updateUserProfile,
  });

  const refetchUser = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const uploadPhotoMutation = useMutation({
    mutationFn: uploadPhoto,
  });

  const registerUser = async (profile: UserProfile) => {
    try {
      setLoading(true);

      await registerUserMutation.mutateAsync({
        telegramId: profile.telegramId,
        chatId: profile.chatId,
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        sex: profile.sex,
        bio: profile.bio,
        suggestionAgeMax: profile.suggestionAge.to,
        suggestionAgeMin: profile.suggestionAge.from,
        suggestionSex: profile.suggestionSex,
      });

      if (profile.photo) {
        const formData = new FormData();
        formData.append("file", profile.photo);

        await uploadPhotoMutation.mutateAsync(formData);
      }

      refetchUser();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (profile: UserProfile) => {
    try {
      setLoading(true);

      await updateUserProfileMutation.mutateAsync({
        telegramId: profile.telegramId,
        chatId: profile.chatId,
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        sex: profile.sex,
        bio: profile.bio,
        suggestionAgeMax: profile.suggestionAge.to,
        suggestionAgeMin: profile.suggestionAge.from,
        suggestionSex: profile.suggestionSex,
      });

      if (profile.photo) {
        const formData = new FormData();
        formData.append("file", profile.photo);

        await uploadPhotoMutation.mutateAsync(formData);
      }

      refetchUser();
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        registerUser,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
