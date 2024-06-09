import { CheckCircleIcon, CircleStackIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components";
import Navigation from "../../components/Navigation";

const getSuggestion = () => {
  return {
    name: "Amanda Lourence",
    bio: "My name is Amanda. Iam 23 y.o. and live in Moscow. Want to get acquainted with me?",
    media: [
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  };
};

const Confirmed = () => {
  return (
    <div className="px-2 py-1 opacity-70 text-xs space-x-2 border border-white text-white  border-1 rounded-full flex items-center justify-center">
      <span>Confirmed</span> <CircleStackIcon className="size-4" />
    </div>
  );
};

const SuggestionProfilePage = () => {
  const suggestion = getSuggestion();

  return (
    <div className="h-full flex flex-col">
      <div className="font-bold">Profile</div>
      <div className="relative mt-auto p-4 space-y-4 z-10">
        <div className="flex items-center font-bold space-x-2">
          <span className="text-xl">{suggestion.name}</span>
          <CheckCircleIcon className="size-7" />
          <Confirmed />
        </div>
        <p className="opacity-80">{suggestion.bio}</p>
        <div className="flex space-x-4">
          <Button variant="outlined" className="w-full">
            Skip
          </Button>
          <Button variant="outlined" className="w-full">
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

export default SuggestionProfilePage;
