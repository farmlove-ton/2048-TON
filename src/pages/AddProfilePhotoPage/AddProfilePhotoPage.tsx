import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  BodyTextThin,
  Button,
  FileUploader,
  Spinner,
  Tab,
  Textarea,
  Title,
} from "../../components";
import { showBackButton } from "../../lib/telegram";
import { UserProfileContext } from "../../context/UserProfileContext";

interface IFormInput {
  photo?: File;
  bio: string;
}

const CreateProfilePage = () => {
  const { userProfile, registerUser, isLoading } =
    useContext(UserProfileContext);

  const { register, control, handleSubmit, watch, setValue } =
    useForm<IFormInput>({
      defaultValues: {
        photo: undefined,
        bio: userProfile.bio,
      },
    });

  const unsetPhoto = () => {
    setValue("photo", undefined);
  };

  const photo = watch("photo");

  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSkip = async () => {
    await registerUser(userProfile);
    navigate("/home");
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await registerUser({ ...userProfile, ...data });
    navigate("/home");
  };

  return (
    <form
      className="p-4 flex flex-col h-full justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center space-x-2">
          <Tab />
          <Tab />
          <Tab isSelected />
        </div>

        <div className="flex flex-col space-y-2">
          <Title>Choose your photos</Title>
          <BodyTextThin>
            That's how others will see you. You can always update them later.
          </BodyTextThin>

          <div className="mx-auto w-44 h-48">
            {photo ? (
              <div className="relative w-full h-full">
                <div className="absolute bottom-2 left-2">
                  <Button onClick={unsetPhoto} className="shadow-md">
                    Unset
                  </Button>
                </div>
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(photo)}
                  alt="photo"
                />
              </div>
            ) : (
              <Controller
                name="photo"
                control={control}
                render={({ field }) => <FileUploader {...field} />}
              />
            )}
          </div>

          <Title>Write some info about you</Title>

          <Textarea
            className="resize-none h-24"
            {...register("bio")}
            placeholder="Maximum 140 symbols"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          type="submit"
          disabled={isLoading}
          icon={isLoading ? <Spinner size="small" /> : null}
        >
          Continue
        </Button>
        <Button variant="text" disabled={isLoading} onClick={onSkip}>
          Skip
        </Button>
      </div>
    </form>
  );
};

export default CreateProfilePage;
