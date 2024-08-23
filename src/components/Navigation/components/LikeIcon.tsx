import { HeartIcon } from "@heroicons/react/24/outline";
import { useAuthenticatedUser } from "../../../hooks/useAuthenticatedUser";

export default function LikeIcon() {
  const { uncollectedLikes } = useAuthenticatedUser();

  return (
    <div className="w-full h-full relative">
      {!!uncollectedLikes && (
        <div className="absolute  flex items-center justify-center size-[12px] bg-gradient-pink text-[8px] font-bold right-0 -top-0 rounded-full">
          {uncollectedLikes}
        </div>
      )}
      <HeartIcon className="w-full h-full" />
    </div>
  );
}
