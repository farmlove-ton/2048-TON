import { createContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getTgUser } from "../lib/adapter";
import { createUser, uploadPhoto } from "../api/userService";

interface UserProfile {
  telegramId: number;
  chatId: string;
  username?: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  age?: number;
  sex?: string;
  love?: number;
  photo?: File;
}

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
  registerUser: (userProfile: UserProfile) => Promise<void>;
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
    sex: "",
    love: 0,
    photo: undefined,
  },
  setUserProfile: () => {},
  registerUser: () => new Promise(() => {}),
});

interface IProps {
  children: React.ReactNode;
}

const UserProfileProvider = ({ children }: IProps) => {
  const tgUser = getTgUser();

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
    sex: "male",
    love: 0,
    bio: "",
    photo: undefined,
  });

  const registerUserMutation = useMutation({
    mutationFn: createUser,
  });

  const refetchUser = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const uploadPhotoMutation = useMutation({
    mutationFn: uploadPhoto,
  });

  const registerUser = async (profile: UserProfile) => {
    await registerUserMutation.mutateAsync({
      telegramId: profile.telegramId,
      chatId: profile.chatId,
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: profile.age,
      sex: profile.sex,
      love: profile.love,
      bio: profile.bio,
    });

    if (profile.photo) {
      const formData = new FormData();
      formData.append("file", profile.photo);

      await uploadPhotoMutation.mutateAsync({
        userId: profile.telegramId,
        formData,
      });
    }

    refetchUser();
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, registerUser }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export { UserProfileContext, UserProfileProvider };
