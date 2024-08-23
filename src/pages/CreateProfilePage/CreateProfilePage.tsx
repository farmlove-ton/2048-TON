import { useContext, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  BodyTextThin,
  Button,
  Input,
  Slider,
  Tab,
  Title,
  WithLabel,
  RadioGroup,
} from "../../components";
import { showBackButton } from "../../lib/telegram";
import { UserProfileContext } from "../../context/UserProfileContext";
import { Sex } from "../../api/types";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  sex: Sex;
}

const CreateProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      age: userProfile.age,
      sex: userProfile.sex,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setUserProfile({ ...userProfile, ...data });

    navigate("/tell-us-more");
  };

  return (
    <form
      className="p-4 flex flex-col h-full justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center space-x-2">
          <Tab isSelected />
          <Tab />
          <Tab />
        </div>

        <div className="flex flex-col space-y-4">
          <Title>Let’s set up your profile! What is your name?</Title>
          <BodyTextThin>This is how you will appear in farmlove.</BodyTextThin>

          <WithLabel label="Enter your name">
            <Input {...register("firstName")} placeholder="Name" />
          </WithLabel>

          <WithLabel label="Enter your surname">
            <Input {...register("lastName")} placeholder="Surname" />
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
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                />
              )}
            />
          </WithLabel>
        </div>
      </div>

      <Button type="submit">Continue</Button>
    </form>
  );
};

export default CreateProfilePage;
