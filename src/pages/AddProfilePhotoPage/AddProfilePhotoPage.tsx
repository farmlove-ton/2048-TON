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
  info: string;
}

const CreateProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, control, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      photos: [],
      info: "",
    },
  });

  const photos = watch("photos");
  console.log(photos);

  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setUserProfile({ ...userProfile, ...data });

    navigate("/suggestion");
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

        <div className="flex flex-col space-y-4">
          <Title>Choose your photos</Title>
          <BodyTextThin>
            That's how others will see you. You can always update them later.
          </BodyTextThin>

          {/* {photos.map((photo) => (
            <img src={URL.createObjectURL(photo)} alt="photo" />
          ))} */}

          <div className="mx-auto w-44 h-48">
            <Controller
              name="photos"
              control={control}
              render={({ field }) => <FileUploader {...field} />}
            />
          </div>

          <Title>Write some info about you</Title>

          <Textarea
            className="resize-none h-24"
            {...register("info")}
            placeholder="Maximum 140 symbols"
          />
        </div>
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
};

export default CreateProfilePage;
