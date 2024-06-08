import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input, Tab } from "../../components";
import { getUser } from "../../lib/adapter";
import { showBackButton } from "../../lib/telegram";

interface IFormInput {
  name: string;
  description: string;
  age: number;
  gender: string;
}

const TellUsMorePage = () => {
  const user = getUser();

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      name: user?.fullName || "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    navigate("/add-photo");
  };

  return (
    <form
      className="p-4 flex flex-col h-full justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center space-x-2">
          <Tab />
          <Tab isSelected />
          <Tab />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl">Tell us more about you</h2>
          <div className="flex flex-col space-y-2">
            <Input {...register("name")} placeholder="Name" />
            <Input {...register("description")} placeholder="About you" />
            <Input
              {...register("age")}
              placeholder="Enter your age"
              type="number"
            />
          </div>
        </div>
      </div>

      <Button type="submit">Continue</Button>
    </form>
  );
};

export default TellUsMorePage;
