import { CheckCircleIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { Button, Spinner } from "../../components";
import Navigation from "../../components/Navigation/Navigation";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { fetchSuggestion, like } from "../../api/suggestionService";
import PageLayout from "../../layouts/PageLayout";
import { LikeMatchModal } from "../../components/Modals";
import { ModalContext } from "../../context/ModalContext";
import { AxiosError } from "axios";
import { UserContext } from "../../context/UserContext";
import { showBackButton } from "../../lib/telegram";

const LovePoints = ({ amount }: { amount: number }) => {
  return (
    <div className="font-bold">
      <div className="px-2 border border-white border-1 rounded-xl flex items-center justify-center">
        {amount} points
      </div>
    </div>
  );
};

const Confirmed = () => {
  return (
    <div className="px-2 py-1 opacity-70 text-xs space-x-2 border border-white text-white  border-1 rounded-full flex items-center justify-center">
      <span>Confirmed</span> <CircleStackIcon className="size-4" />
    </div>
  );
};

const SuggestionPage = () => {
  const user = useAuthenticatedUser();
  const navigate = useNavigate();
  const { handleOpenModal, handleCloseModal } = useContext(ModalContext);
  const { takeTicket } = useContext(UserContext);

  useEffect(() => {
    showBackButton();
  }, []);
    queryKey: ["suggestion"],
    queryFn: fetchSuggestion,
    retry: false,
  });

  const catchSkipErr = (err: unknown) => {
    if (
      err &&
      typeof err === "object" &&
      "message" in err &&
      Array.isArray(err.message) &&
      err.message[0] === "You have not enough tickets"
    ) {
      navigate("/home?noTickets=true");
    }
  };
  const likeMutation = useMutation({
    mutationFn: like,
  });

  if (isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <PageLayout>No data found</PageLayout>;
  }

  const onNext = async () => {
    const result = await refetch();

    if (result.error instanceof AxiosError) {
      catchSkipErr(result.error.response?.data);
    }
  };

  const handleKeepSwipingAfterLike = () => {
    handleCloseModal();
    onNext();
  };

  const handleLike = async () => {
    if (!user.tickets) {
      navigate("/home?noTickets=true");
      return;
    }

    try {
      const result = await likeMutation.mutateAsync(data.telegramId);

      takeTicket();

      if (result.match) {
        handleOpenModal(
          <LikeMatchModal
            suggestion={data}
            onKeepSwiping={handleKeepSwipingAfterLike}
          />
        );
      } else {
        refetch();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        catchSkipErr(err.response?.data);
      }
    }
  };

  const name = `${data.firstName} ${data.lastName}`;
  const photoUrl = data.photoUrl;
  const bio = data.bio;

  return (
    <div className="relative h-full flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${photoUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 pointer-events-none"></div>
      <div className="absolute top-4 right-4">
        <LovePoints amount={data.lovePoints} />
      </div>
      <div className="relative mt-auto p-4 space-y-4 z-10">
        <div className="flex items-center font-bold space-x-2">
          <span className="text-xl">{name}</span>
          <CheckCircleIcon className="size-7" />
          <Confirmed />
        </div>
        <p className="opacity-80">{bio}</p>
        <div className="flex space-x-4">
          <Button onClick={onNext} variant="outlined" className="w-full">
            Skip
          </Button>
          <Button onClick={onNext} variant="contained" className="w-full p-1">
            Send points 🔥
          </Button>
          <Button onClick={handleLike} variant="outlined" className="w-full">
            Like
          </Button>
        </div>
      </div>

      <div className="z-10">
        <Navigation />
      </div>
    </div>
  );
};

export default SuggestionPage;
