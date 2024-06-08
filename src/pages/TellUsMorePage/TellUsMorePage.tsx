import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input, Tab } from "../../components";
import Layout from "./Layout";
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
    <div className="space-y-8">
      <div className="flex justify-between items-center space-x-2">
        <Tab />
        <Tab isSelected />
        <Tab />
      </div>

      <Layout title="Tell us more about you                  ">
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input {...register("name")} placeholder="Name" />
          <Input {...register("description")} placeholder="About you" />
          <Input
            {...register("age")}
            placeholder="Enter your age"
            type="number"
          />
          <Input {...register("gender")} placeholder="Gender" />

          <Button type="submit">Continue</Button>
        </form>
      </Layout>
    </div>
  );
};

export default TellUsMorePage;
