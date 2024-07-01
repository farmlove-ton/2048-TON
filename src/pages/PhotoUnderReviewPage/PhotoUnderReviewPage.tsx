import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { BodyTextThin, Button, Title } from "../../components";

const VerifyProfilePage = () => {
  const navigate = useNavigate();

  const onContinue = () => {
    navigate("/photo-under-review");
  };

  return (
    <div className="p-4 flex flex-col h-full justify-between">
      <div className="flex flex-col items-center my-auto space-y-4">
        <CheckCircleIcon className="size-14 text-white" />
        <Title>Your photo is under review</Title>
        <BodyTextThin>We will let you know when </BodyTextThin>
      </div>

      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
};

export default VerifyProfilePage;
