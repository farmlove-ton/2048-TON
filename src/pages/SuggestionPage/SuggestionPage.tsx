import { CheckCircleIcon, CircleStackIcon } from "@heroicons/react/24/outline";

import { Button, Spinner } from "../../components";
import Navigation from "../../components/Navigation";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { fetchSuggestion } from "../../api/suggestionService";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "../../layouts/PageLayout";

const LovePoints = () => {
  return (
    <div className="font-bold">
      <div className="px-2 border border-white border-1 rounded-xl flex items-center justify-center">
        7909 loves
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

  const { data, isFetched, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchSuggestion(user.telegramId),
    retry: false,
  });

  const onNext = () => {
    refetch();
  };

  if (!isFetched) {
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>;
  }

  if (!data) {
    return <PageLayout>No data found</PageLayout>;
  }

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
        <LovePoints />
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
          <Button onClick={onNext} variant="outlined" className="w-full">
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
