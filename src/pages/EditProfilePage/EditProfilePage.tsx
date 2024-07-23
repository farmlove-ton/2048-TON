import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";

import {
  BodyTextThin,
  Button,
  FileUploader,
  Input,
  NumberRange,
  OutlineCheckbox,
  RadioGroup,
  Slider,
  Textarea,
  Title,
  WithLabel,
} from "../../components";
import { UserProfileContext } from "../../context/UserProfileContext";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { showBackButton } from "../../lib/telegram";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  photo?: File | string;
  bio: string;
  range: { from: number; to: number };
  likeToSeeMen: boolean;
  likeToSeeWomen: boolean;
}

const EditProfilePage = () => {
  const user = useAuthenticatedUser();

  useEffect(() => {
    showBackButton();
  }, []);

  const { registerUser } = useContext(UserProfileContext);

  const { register, control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      sex: user.sex,
      photo: user.photoUrl,
      bio: user.bio,
      range: {
        from: 20,
        to: 30,
      },
      likeToSeeMen: false,
      likeToSeeWomen: false,
    },
  });

  return (
    <div className="h-full overflow-y-auto">
      <form
        className="p-4 flex flex-col justify-between"
        onSubmit={handleSubmit(async (values) => {
          await registerUser({
            ...values,
            telegramId: user.telegramId,
            chatId: user.chatId,
            photo: values.photo instanceof File ? values.photo : undefined,
          });
        })}
      >
        <div>
          <Title>Profile pictures:</Title>
          <BodyTextThin>Upload a new profile picture.</BodyTextThin>

          <div className="w-36 h-48 my-6">
            <Controller
              name="photo"
              control={control}
              render={({ field }) => <FileUploader {...field} />}
            />
          </div>
        </div>

        <div className="my-6 h-0.5 border-t-0 bg-black/10 " />

        <div>
          <Title>Basic Information</Title>
          <BodyTextThin>Tell us more about you</BodyTextThin>

          <div className="mt-6 space-y-6">
            <WithLabel label="Your Name">
              <Input {...register("firstName")} placeholder="Enter your name" />
            </WithLabel>

            <WithLabel label="Your Surname">
              <Input
                {...register("lastName")}
                placeholder="Enter your surname"
              />
            </WithLabel>

            <WithLabel label="About You">
              <Textarea
                className="resize-none h-24"
                {...register("bio")}
                placeholder="Tell us about you"
              />
            </WithLabel>

            <WithLabel label="Your age">
              <Controller
                name="age"
                control={control}
                render={({ field }) => <Slider {...field} min={18} max={100} />}
              />
            </WithLabel>

            <WithLabel
              direction="row"
              className="justify-between"
              label="Gender:"
            >
              <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                )}
              />
            </WithLabel>

            <WithLabel label="Preferred Age range">
              <Controller
                name="range"
                control={control}
                render={({ field }) => (
                  <NumberRange min={18} max={100} {...field} />
                )}
              />
            </WithLabel>

            <WithLabel label="Preferred Genders">
              <OutlineCheckbox
                {...register("likeToSeeMen")}
                label="I’d like to see men"
              />
              <OutlineCheckbox
                {...register("likeToSeeWomen")}
                label="I’d like to see women"
              />
            </WithLabel>
          </div>
        </div>

        <Button className="mt-4" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
