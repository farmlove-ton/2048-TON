import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, Input, Tab } from "../../components";
import { showBackButton } from "../../lib/telegram";
import { UserProfileContext } from "../../context/UserProfileContext";

interface IFormInput {
  bio: string;
}

const TellUsMorePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, handleSubmit } = useForm<IFormInput>({});
  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setUserProfile({ ...userProfile, ...data });

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
            <Input {...register("bio")} placeholder="About you" />
          </div>
        </div>
      </div>

      <Button type="submit">Continue</Button>
    </form>
  );
};

export default TellUsMorePage;
