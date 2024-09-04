import { useQuery } from "@tanstack/react-query";

import { Button, Spinner, Navigation } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import { fetchUserProfile } from "../../api/userService";
import { openChat, showBackButton } from "../../lib/telegram";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { StackedCoinsIcon } from "../../components/icons/StackedCoinsIcon";
// import { CheckCircleIcon } from "../../components/icons/CheckCIrcleIcon";

// const Confirmed = () => {
//   return (
//     <div className="px-2 py-1 opacity-70 text-xs space-x-2 border border-white text-white  border-1 rounded-full flex items-center justify-center">
//       <span>Confirmed</span> <StackedCoinsIcon className="size-4" />
//     </div>
//   );
// };

const AdmirerPage = () => {
  useEffect(() => {
    showBackButton();
  }, []);

  const params = useParams();

  const { data, isFetching } = useQuery({
    queryKey: [],
    queryFn: () => fetchUserProfile(Number(params.telegramId)),
  });

  const onSendMessage = () => {
    if (data?.username) {
      openChat(data.username);
    }
  };

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
      <div className="relative mt-auto p-4 space-y-4 z-10">
        <div className="flex items-center font-bold space-x-2">
          <span className="text-xl">{name}</span>
          {/* <CheckCircleIcon className="size-7" />
          <Confirmed /> */}
        </div>
        <p className="opacity-80">{bio}</p>
        <div className="flex space-x-4">
          <Button
            onClick={onSendMessage}
            variant="contained"
            className="w-full p-1"
          >
            Send message
          </Button>
        </div>
      </div>

      <div className="z-10">
        <Navigation />
      </div>
    </div>
  );
};

export default AdmirerPage;
