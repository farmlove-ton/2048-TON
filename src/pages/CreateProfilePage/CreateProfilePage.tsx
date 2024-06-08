import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input, Tab } from "../../components";
import { getUser } from "../../lib/adapter";
import { showBackButton } from "../../lib/telegram";
import Select from "../../components/Select";
import {TonConnectButton} from "@tonconnect/ui-react";

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
        </div>
      </div>

      <footer style={{ display: "flex", justifyContent: "center" }}>
        <TonConnectButton/>
      </footer>
      <Button type="submit">Continue</Button>
    </form>
  );
};

export default CreateProfilePage;
