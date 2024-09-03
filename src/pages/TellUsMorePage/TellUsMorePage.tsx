import { useContext, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  BodyTextThin,
  Button,
  NumberRange,
  OutlineCheckbox,
  Tab,
  Title,
} from "../../components";
import { showBackButton } from "../../lib/telegram";
import { UserProfileContext } from "../../context/UserProfileContext";
import { Sex } from "../../api/types";

interface IFormInput {
  suggestionAge: { from: number; to: number };
  likeToSeeMen: boolean;
  likeToSeeWomen: boolean;
}

const TellUsMorePage = () => {
  const { userProfile, setUserProfile } = useContext(UserProfileContext);

  const { register, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: {
      suggestionAge: userProfile.suggestionAge,
      likeToSeeMen: userProfile.suggestionSex.includes("Male"),
      likeToSeeWomen: userProfile.suggestionSex.includes("Female"),
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    showBackButton();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const suggestionSex: Sex[] = [];

    if (data.likeToSeeMen) {
      suggestionSex.push("Male");
    }
    if (data.likeToSeeWomen) {
      suggestionSex.push("Female");
    }

    setUserProfile({ ...userProfile, ...data, suggestionSex });

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
          <Title>Who would you like to see?</Title>
          <BodyTextThin>
            We want to make sure we find the right people for you. You can
            always update this later.
          </BodyTextThin>

          <OutlineCheckbox
            {...register("likeToSeeMen")}
            label="I’d like to see men"
          />
          <OutlineCheckbox
            {...register("likeToSeeWomen")}
            label="I’d like to see women"
          />

          <div className="flex flex-col space-y-4">
            <Title>Age range</Title>
            <BodyTextThin>
              We want to make sure we find the right people for you. You can
              always update this later.
            </BodyTextThin>

            <div className="pt-4">
              <Controller
                name="suggestionAge"
                control={control}
                render={({ field }) => (
                  <NumberRange min={18} max={51} {...field} />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit">Continue</Button>
    </form>
  );
};

export default TellUsMorePage;
