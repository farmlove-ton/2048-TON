import { createContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getTgUser } from "../lib/adapter";
import { createUser, uploadPhoto } from "../api/userService";

interface UserProfile {
  telegramId: number;
  chatId: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  sex: string;
  love: number;
  photoUrl: string;
}

interface UserProfileContextType {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
  registerUser: (photos: File[]) => Promise<void>;
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
    photoUrl: "",
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
    firstName: tgUser?.firstName || "",
    lastName: tgUser.lastName || "",
    age: 25,
    sex: "male",
    love: 0,
    bio: "",
    photoUrl: "",
  });

  const registerUserMutation = useMutation({
    mutationFn: createUser,
  });

  const refetchUser = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.refetchQueries({ queryKey: ["user"] });
  };

  const uploadPhotoMutation = useMutation({
    mutationFn: uploadPhoto,
  });

  const registerUser = async (photos: File[]) => {
    await registerUserMutation.mutateAsync({
      telegramId: userProfile.telegramId,
      chatId: userProfile.chatId,
      username: userProfile.username,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      age: userProfile.age,
      sex: userProfile.sex,
      love: userProfile.love,
      bio: userProfile.bio,
      photoUrl: userProfile.photoUrl,
    });

    if (photos.length) {
      const formData = new FormData();
      formData.append("file", photos[0]);

      await uploadPhotoMutation.mutateAsync({
        userId: userProfile.telegramId,
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
