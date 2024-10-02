import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  Button,
  CircleImage,
  SmallText,
  Subtitle,
  Title,
} from "../../components";
import PageLayout from "../../layouts/PageLayout";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { NoSuggestionsModal, NoTicketsModal } from "../../components/Modals";
import FarmBar from "../../components/FarmBar/FarmBar";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { hideBackButton } from "../../lib/telegram";
import { TicketsIcon } from "../../components/icons/TicketsIcon";
import { DailyRewardModal } from "../../components/Modals/DailyRewardModal";
import { PencilIcon } from "../../components/icons/PencilIcon";
import { AvatarIcon } from "../../components/icons/AvatarIcon";
import { HeartIcon } from "../../components/icons/HeartIcon";

const HomePage = () => {
  const gotReward = useRef(false);

  const user = useAuthenticatedUser();
  const { farmLovePoints, dailyReward } = useContext(UserContext);
  const { handleOpenModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasNoTickets = searchParams.has("noTickets");
  const hasNoSuggestions = searchParams.has("noSuggestions");

  useEffect(() => {
    hideBackButton();
  }, []);

  useEffect(() => {
    if (dailyReward && dailyReward.rewardedNow && !gotReward.current) {
      handleOpenModal(
        <DailyRewardModal
          rewards={dailyReward.rewards}
          updatedUserTicketsAmount={dailyReward.updatedUserTicketsAmount}
        />
      );
      gotReward.current = true;
    }
  }, [handleOpenModal, dailyReward, gotReward]);

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
      <div className="h-full relative flex flex-col justify-between">
        <div className="flex flex-col items-center space-y-3 h-full">
          <div className="relative">
            {user.photoUrl ? (
              <>
                <CircleImage
                  className="size-24"
                  alt="avatar"
                  src={user.photoUrl}
                />
                <Link
                  to={"/edit-profile"}
                  style={{
                    background:
                      "linear-gradient(180deg, #1a1a1a 0%, #2c1a48 30%, #1a1a1a 100%)",
                  }}
                  className="absolute rounded-full border border-gray-600/50 right-0 p-1 bottom-[1px]"
                >
                  <PencilIcon className="size-3" />
                </Link>
              </>
            ) : (
              <Link to={"/edit-profile"}>
                <AvatarIcon className="size-24" />
              </Link>
            )}
          </div>

          <Title className="text-center">
            {user.firstName}, {user.age}
          </Title>

          <div className="flex space-x-4 w-full justify-center">
            <div
              className="flex py-1 px-4 rounded-xl border border-gray-600/50 items-center space-x-2 w-5/12 justify-center"
              style={{
                background:
                  "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
              }}
            >
              <TicketsIcon className="size-6" />
              <div className="flex flex-col">
                <Subtitle>{user.tickets}</Subtitle>
                <SmallText>Tickets</SmallText>
              </div>
            </div>

            <div
              className="flex py-1 px-4 rounded-xl border border-gray-600/50 items-center space-x-2 w-5/12 justify-center"
              style={{
                background:
                  "linear-gradient(3deg, rgb(0 0 0 / 70%), rgb(0 0 0 / 10%))",
              }}
            >
              <HeartIcon className="size-6" />
              <div className="flex flex-col">
                <Subtitle>{user.lovePoints}</Subtitle>
                <SmallText>Points</SmallText>
              </div>
            </div>
          </div>

          <div className="h-full flex items-center justify-center">
            <FarmBar
              lastFarmTimestamp={user.lastFarmLovePointTimestamp}
              maxTimeSeconds={user.maxLovePointsTime}
              maxPoints={user.maxLovePoints}
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
