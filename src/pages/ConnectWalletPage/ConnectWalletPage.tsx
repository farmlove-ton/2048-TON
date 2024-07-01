import { WalletIcon } from "@heroicons/react/24/outline";
import { TonConnectButton } from "@tonconnect/ui-react";

import { BodyTextThin, Button, Tab, Title } from "../../components";
import { useNavigate } from "react-router-dom";

const ConnectWalletPage = () => {
  const navigate = useNavigate();

  const onSkip = () => {
    navigate("/verify-profile");
  };

  // const onConnect = () => {
  //   navigate("/connect-wallet");
  // };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center space-x-2">
        <Tab />
        <Tab />
        <Tab />
        <Tab isSelected />
      </div>

      <div className="flex flex-col items-center my-auto space-y-4">
        <WalletIcon className="w-20 h-20" />
        <Title>Connect your wallet</Title>
        <BodyTextThin>
          Connect your wallet to receive rewards and tokens
        </BodyTextThin>

        <div className="flex flex-col space-y-2">
          <TonConnectButton />
          <Button variant="text" onClick={onSkip}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletPage;
