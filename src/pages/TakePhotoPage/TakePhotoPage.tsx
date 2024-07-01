import { useNavigate } from "react-router-dom";

import { Button, Camera, Title } from "../../components";
import { Controller, useForm } from "react-hook-form";

interface IFormInput {
  selfie: string;
}

const VerifyProfilePage = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, watch, setValue } = useForm<IFormInput>({
    defaultValues: {
      selfie: "",
    },
  });

  const handleRetakePhoto = () => setValue("selfie", "");

  const selfie = watch("selfie");

  const onSubmit = () => {
    navigate("/photo-under-review");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 flex flex-col h-full justify-between"
    >
      <div className="mt-20 flex flex-col items-center space-y-2">
        <Title>Make sure your photo is clear</Title>

        <div className="pt-8 w-60 h-60">
          {selfie ? (
            <img
              src={selfie}
              alt="Captured"
              className="w-full object-contain"
            />
          ) : (
            <Controller
              name="selfie"
              control={control}
              render={({ field }) => <Camera {...field} />}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Button color="secondary" onClick={handleRetakePhoto}>
          Retake
        </Button>
        <Button type="submit">Submit and continue</Button>
      </div>
    </form>
  );
};

export default VerifyProfilePage;
