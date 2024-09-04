import { useContext, useEffect } from "react";
import { CircleStackIcon, TicketIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  BodyTextThin,
  Button,
  CircleImage,
  SmallText,
  Title,
} from "../../components";
import PageLayout from "../../layouts/PageLayout";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { NoSuggestionsModal, NoTicketsModal } from "../../components/Modals";
import FarmBar from "../../components/FarmBar/FarmBar";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { hideBackButton } from "../../lib/telegram";

const HomePage = () => {
  const user = useAuthenticatedUser();
  const { farmLovePoints } = useContext(UserContext);
  const { handleOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasNoTickets = searchParams.has("noTickets");
  const hasNoSuggestions = searchParams.has("noSuggestions");

  useEffect(() => {
    hideBackButton();
  }, []);

  useEffect(() => {
    if (hasNoSuggestions) {
      handleOpenModal(<NoSuggestionsModal />);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("noSuggestions");
      setSearchParams(newSearchParams);
    }
  }, [hasNoSuggestions, searchParams, setSearchParams, handleOpenModal]);

  useEffect(() => {
    if (hasNoTickets) {
      handleOpenModal(<NoTicketsModal />);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("noTickets");
      setSearchParams(newSearchParams);
    }
  }, [hasNoTickets, searchParams, setSearchParams, handleOpenModal]);

  const handleDiscover = () => {
    if (!user.tickets) {
      handleOpenModal(<NoTicketsModal />);
      return;
    }

    navigate("/suggestion");
  };

  return (
    <PageLayout>
      <div className="relative flex flex-col">
        <div className="flex items-start space-x-6">
          {user.photoUrl && (
            <div className="relative w-24 h-24">
              <CircleImage alt="avatar" src={user.photoUrl} />
            </div>
          )}

          <div className="flex flex-col items-start">
            <Title>
              {user.firstName}, {user.age}
            </Title>

            <div className="flex justify-around space-x-2 items-center">
              <div className="flex items-center space-x-1">
                <CircleStackIcon className="size-4" />
                <BodyTextThin>{user.lovePoints}</BodyTextThin>
              </div>

              <div className="border-l h-3"></div>
              <div className="flex items-center space-x-1">
                <TicketIcon className="size-4" />
                <BodyTextThin>{user.tickets}</BodyTextThin>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex space-x-4 mt-4">
          <Link to="/edit-profile" className="flex-1">
            <Button className="w-full">Edit profile</Button>
          </Link>
          <div className="flex-1">
            <Button className="w-full">Share profile</Button>
          </div>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <div
            className="flex-1 flex flex-row border border-gray-600/50 rounded-xl px-6 py-3 justify-between"
            style={{
              background:
                "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
            }}
          >
            <div className="flex flex-col items-start">
              <TicketIcon className="size-8" />
              <SmallText>Tickets</SmallText>
              <Title>{user.tickets}</Title>
            </div>
          </div>
          <div
            className="flex-1 flex flex-row border border-gray-600/50 rounded-xl px-6 py-3 justify-between"
            style={{
              background:
                "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
            }}
          >
            <div className="flex flex-col items-start">
              <CircleStackIcon className="size-8" />
              <SmallText>Points</SmallText>
              <Title>{user.lovePoints}</Title>
            </div>

            <FarmBar
              farmCounter={user.remainingLovePointPart}
              maxCounter={user.maxLovePoints}
              initialTimeLeft={user.lovePointTimeToFull}
              onFarm={farmLovePoints}
            />
          </div>
        </div>

        <Button onClick={handleDiscover} className="w-full mt-4" color="pink">
          Farm love
        </Button>
      </div>
    </PageLayout>
  );
};

export default HomePage;
