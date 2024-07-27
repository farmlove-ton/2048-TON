import { useEffect } from "react";
import { CircleStackIcon, TicketIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { farm } from "../../api/farmService";
import { NoTicketsModal } from "../../components/Modals";
import { useModal } from "../../hooks/useModal";
import FarmBar from "../../components/FarmBar/FarmBar";

const HomePage = () => {
  const user = useAuthenticatedUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasNoTickets = searchParams.has("noTickets");

  const noTicketsModalProps = useModal({
    initialOpen: hasNoTickets,
  });

  useEffect(() => {
    if (hasNoTickets) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("noTickets");
      setSearchParams(newSearchParams);
    }
  }, [hasNoTickets, searchParams, setSearchParams]);

  const farmMutation = useMutation({
    mutationFn: farm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleFarm = async () => {
    farmMutation.mutate(user.telegramId);
  };

  const handleDiscover = () => {
    if (!user.tickets) {
      noTicketsModalProps.open();
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
                <BodyTextThin>{user.points}</BodyTextThin>
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

            <FarmBar
              farmCounter={user.farmCounter}
              farmedAmount={user.farmedAmount}
              maxCounter={user.maxCounter}
              updatedUserTicketsAmount={user.updatedUserTicketsAmount}
              timeToFull={user.timeToFull}
              onFarm={handleFarm}
            />
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
              <Title>{user.points}</Title>
            </div>

            <FarmBar
              farmCounter={user.farmCounter}
              farmedAmount={user.farmedAmount}
              maxCounter={user.maxCounter}
              updatedUserTicketsAmount={user.updatedUserTicketsAmount}
              timeToFull={user.timeToFull}
              onFarm={handleFarm}
            />
          </div>
        </div>

        <Button onClick={handleDiscover} className="w-full mt-4" color="pink">
          Farm love
        </Button>
      </div>

      <NoTicketsModal {...noTicketsModalProps} />
    </PageLayout>
  );
};

export default HomePage;
