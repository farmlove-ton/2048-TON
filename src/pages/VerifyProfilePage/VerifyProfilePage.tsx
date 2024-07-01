import {
  CameraIcon,
  CheckCircleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { BodyTextThin, Button, Subtitle, Title } from "../../components";

const VerifyProfilePage = () => {
  const navigate = useNavigate();

  const onContinue = () => {
    navigate("/take-photo");
  };

  return (
    <div className="p-4 flex flex-col h-full justify-between">
      <div className="px-14 mt-12 flex flex-col items-center space-y-2">
        <CheckCircleIcon className="size-14 text-white" />
        <Title>Verify Profile</Title>
        <BodyTextThin>All profiles in our community are verified</BodyTextThin>

        <div className="pt-12">
          <div className="w-full flex items-center space-x-8">
            <CameraIcon className="size-9" />
            <div>
              <Subtitle>Take a selfie</Subtitle>
              <BodyTextThin>Repeat the pose and gesture</BodyTextThin>
            </div>
          </div>

          <div className="w-full flex items-center space-x-8">
            <SunIcon className="size-9" />
            <div>
              <Subtitle>Check the lightning</Subtitle>
              <BodyTextThin>You must be clearly visible </BodyTextThin>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
};

export default VerifyProfilePage;
