import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  BodyTextThin,
  Button,
  FileUploader,
  Tab,
  Textarea,
  Title,
} from "../../components";
import { showBackButton } from "../../lib/telegram";
import { UserProfileContext } from "../../context/UserProfileContext";

interface IFormInput {
  photos: File[];
  bio: string;
}

const CreateProfilePage = () => {
  const { userProfile, setUserProfile, registerUser } =
    useContext(UserProfileContext);

  const { register, control, handleSubmit, watch, setValue } =
    useForm<IFormInput>({
      defaultValues: {
        photos: [],
        bio: userProfile.bio,
      },
    });

  const unsetPhoto = () => {
    setValue("photos", []);
  };

  const photos = watch("photos");

  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSkip = async () => {
    await registerUser([]);
    navigate("/home");
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setUserProfile({ ...userProfile, ...data });
    await registerUser(data.photos);
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
            {photos.length ? (
              <div className="relative w-full h-full">
                <div className="absolute bottom-2 left-2">
                  <Button onClick={unsetPhoto} className="shadow-md">
                    Unset
                  </Button>
                </div>
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(photos[0])}
                  alt="photo"
                />
              </div>
            ) : (
              <Controller
                name="photos"
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
        <Button type="submit">Continue</Button>
        <Button variant="text" onClick={onSkip}>
          Skip
        </Button>
      </div>
    </form>
  );
};

export default CreateProfilePage;
