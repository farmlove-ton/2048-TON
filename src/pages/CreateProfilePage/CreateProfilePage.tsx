import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input, Tab } from "../../components";
import Layout from "./Layout";
import { getUser } from "../../lib/adapter";
import { showBackButton } from "../../lib/telegram";
import Select from "../../components/Select";

interface IFormInput {
  name: string;
  description: string;
  age: number;
  gender: string;
}

const CreateProfilePage = () => {
  const user = getUser();

  const { register, control, handleSubmit } = useForm<IFormInput>({
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
    navigate("/tell-us-more");
  };

  return (
    <div className="space-y-8 h-full">
      <div className="flex justify-between items-center space-x-2">
        <Tab isSelected />
        <Tab />
        <Tab />
      </div>

      <Layout title="Find your perfect match">
        <form
          className="flex flex-col h-full justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-2">
            <Input {...register("name")} placeholder="Name" />
            <Input {...register("description")} placeholder="About you" />
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
          <Button type="submit">Continue</Button>
        </form>
      </Layout>
    </div>
  );
};

export default CreateProfilePage;
