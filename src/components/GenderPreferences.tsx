import { useFormContext } from "react-hook-form";
import OutlineCheckbox from "./OutlineCheckbox";
import WithError from "./WithError";
import WithLabel from "./WithLabel";

interface IFormInput {
  likeToSeeMen: boolean;
  likeToSeeWomen: boolean;
}

export const GenderPreferences = () => {
  const {
    register,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext<IFormInput>();

  const likeToSeeMen = watch("likeToSeeMen");
  const likeToSeeWomen = watch("likeToSeeWomen");

  const handleCheckboxChange = () => {
    clearErrors(["likeToSeeMen", "likeToSeeWomen"]);
  };

  const atLeastOneSelected = (value: boolean) => {
    return value || likeToSeeMen || likeToSeeWomen
      ? true
      : "At least one option must be selected";
  };

  return (
    <WithError error={errors.likeToSeeWomen?.message}>
      <WithLabel label="Preferred Genders">
        <OutlineCheckbox
          {...register("likeToSeeMen", {
            validate: atLeastOneSelected,
            onChange: handleCheckboxChange,
          })}
          isError={!!errors.likeToSeeMen}
          label="I’d like to see men"
        />

        <OutlineCheckbox
          {...register("likeToSeeWomen", {
            validate: atLeastOneSelected,
            onChange: handleCheckboxChange,
          })}
          isError={!!errors.likeToSeeWomen}
          label="I’d like to see women"
        />
      </WithLabel>
    </WithError>
  );
};
