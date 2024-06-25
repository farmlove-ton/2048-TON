import { useContext, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { TonConnectButton } from "@tonconnect/ui-react";

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

interface IFormInput {
  name: string;
  surname: string;
  age: number;
  gender: string;
}

const CreateProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      name: userProfile?.name || "",
      age: 25,
      gender: "male",
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
            <Input {...register("name")} placeholder="Name" />
          </WithLabel>

          <WithLabel label="Enter your surname">
            <Input {...register("surname")} placeholder="Surname" />
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
              name="gender"
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
        </div>
      </div>

      {/* <footer style={{ display: "flex", justifyContent: "center" }}>
        <TonConnectButton />
      </footer> */}
      <Button type="submit">Continue</Button>
    </form>
  );
};

export default CreateProfilePage;
