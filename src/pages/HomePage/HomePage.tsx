import { useEffect } from "react";
import {
  CheckCircleIcon,
  CircleStackIcon,
  MapPinIcon,
  PencilIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, CircleImage, Logo, SmallText, Title } from "../../components";
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
      <Logo />
      <div className="relative flex flex-col">
        <div className="flex flex-col items-center">
          {user.photoUrl && (
            <div className="relative w-24 h-24">
              <div className="absolute cursor-pointer flex items-center justify-center size-6 border border-[#FFFFFF47] rounded-full bottom-2 -right-1">
                <PencilIcon className="size-3" />
              </div>

              <CircleImage alt="avatar" src={user.photoUrl} />
            </div>
          )}

          <div className="flex items-center space-x-1">
            <Title>{user.firstName}</Title>
            <CheckCircleIcon className="size-5 text-white" />
            <MapPinIcon className="size-5 text-white" />
            <CircleStackIcon className="size-5 text-white" />
          </div>
        </div>

        <div className="mt-2 space-y-1">
          <SmallText>Your farming</SmallText>
          <FarmBar
            onFarm={handleFarm}
            farmCounter={user.farmCounter}
            farmedAmount={user.farmedAmount}
            maxCounter={user.maxCounter}
            updatedUserTicketsAmount={user.updatedUserTicketsAmount}
            timeToFull={user.timeToFull}
          />
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
            <Title>{user.tickets}</Title>
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
            <Title>{user.points}</Title>
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
          <Button onClick={handleDiscover} className="w-full mt-4" color="pink">
            Discover
          </Button>
        </div>
      </div>

      <NoTicketsModal {...noTicketsModalProps} />
    </PageLayout>
  );
};

export default HomePage;
