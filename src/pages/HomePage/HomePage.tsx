import {
  CheckCircleIcon,
  CircleStackIcon,
  MapPinIcon,
  PencilIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

import {
  Button,
  CircleImage,
  Logo,
  ProgressBar,
  SmallText,
  Title,
} from "../../components";
import PageLayout from "../../layouts/PageLayout";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { Link } from "react-router-dom";

const HomePage = () => {
  const user = useAuthenticatedUser();

  return (
    <PageLayout>
      <Logo />
      <div className="relative flex flex-col">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute cursor-pointer flex items-center justify-center size-6 border border-[#FFFFFF47] rounded-full bottom-2 -right-1">
              <PencilIcon className="size-3" />
            </div>

            <CircleImage alt="avatar" src={user.photoUrl} />
          </div>

          <div className="flex items-center space-x-1">
            <Title>{user.firstName}</Title>
            <CheckCircleIcon className="size-5 text-white" />
            <MapPinIcon className="size-5 text-white" />
            <CircleStackIcon className="size-5 text-white" />
          </div>
        </div>

        <div className="mt-2 space-y-1">
          <SmallText>Your farming</SmallText>
          <ProgressBar initialTimeLeft={7000} totalTime={18920} />
        </div>

        <div className="flex space-x-2 mt-4">
          <div
            className="flex-1 flex flex-col items-start border border-[#BEBEBE12] rounded-xl px-6 py-3"
            style={{
              background:
                "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
            }}
          >
            <TicketIcon className="size-6" />
            <SmallText>Tickets</SmallText>
            <Title>7,430</Title>
          </div>

          <div
            className="flex-1 flex flex-col items-start border border-[#BEBEBE12] rounded-xl px-6 py-3"
            style={{
              background:
                "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
            }}
          >
            <CircleStackIcon className="size-6" />
            <SmallText>Points</SmallText>
            <Title>7,430</Title>
          </div>
        </div>

        <div
          className="flex-1 flex flex-col items-start border border-[#BEBEBE12] rounded-xl px-6 py-3 mt-4"
          style={{
            background:
              "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
          }}
        >
          <Title>Play boy</Title>
          <SmallText>This is how you will appear in farmlove.</SmallText>
          <Link to="/suggestion" className="w-full mt-4">
            <Button className="w-full" color="pink">
              Discover
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
