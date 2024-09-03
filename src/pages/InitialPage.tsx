import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { hideBackButton } from "../lib/telegram";
import { Button, Checkbox } from "../components";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import WithError from "../components/WithError";

interface IFormInput {
  moreThan18: boolean;
}

const InitialPage = () => {
  const navigate = useNavigate();

  const methods = useForm<IFormInput>({
    defaultValues: {
      moreThan18: false,
    },
  });

  const { register, handleSubmit, setError } = methods;

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    if (!values.moreThan18) {
      setError("moreThan18", {
        message: "Please confirm that you are 18 years or older to proceed.",
      });

      return;
    }

    navigate("/create-profile");
  };

  useEffect(() => {
    hideBackButton();
  }, []);

  return (
    <div className="p-4 space-y-8 pt-20">
      <div>
        <p className="text-6xl">Find your love</p>
        <p className="text-6xl font-bold">easily & quickly</p>
      </div>
      <p>
        Our date app is the perfect way to find your first love or interesting
        expierence.
      </p>

      <FormProvider {...methods}>
        <form
          className="flex flex-col space-y-2 items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Button className="w-full" type="submit">
            Start
          </Button>
          <WithError name="moreThan18">
            <Checkbox
              {...register("moreThan18")}
              label="I am more than 18 years"
            />
          </WithError>
        </form>
      </FormProvider>
    </div>
  );
};

export default InitialPage;
