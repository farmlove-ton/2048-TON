import { useContext, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input, Tab } from "../../components";
import { showBackButton } from "../../lib/telegram";
import Select from "../../components/Select";
import { UserProfileContext } from "../../context/UserProfileContext";

interface IFormInput {
  name: string;
  description: string;
  age: number;
  gender: string;
}

const CreateProfilePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      name: userProfile?.name || "",
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
          <h2 className="text-2xl">Find your perfect match</h2>
          <div className="flex flex-col space-y-2">
            <Input {...register("name")} placeholder="Name" />
            <Input
              {...register("age")}
              placeholder="Enter your age"
              type="number"
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Gender"
                  {...field}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              )}
            />
          </div>
        </div>
      </div>

      <Button type="submit">Continue</Button>
    </form>
  );
};

export default CreateProfilePage;
