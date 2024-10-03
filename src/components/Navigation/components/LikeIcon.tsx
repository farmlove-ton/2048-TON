import { useAuthenticatedUser } from "../../../hooks/useAuthenticatedUser";
import { LikesPageNavigationIcon } from "../../icons/LikesPageNavigationIcon";

export default function LikeIcon() {
  const { uncollectedLikes } = useAuthenticatedUser();

  return (
    <div className="w-full h-full relative">
      {!!uncollectedLikes && (
        <div className="absolute  flex items-center justify-center size-[12px] bg-gradient-pink text-[8px] font-bold right-0 -top-0 rounded-full">
          {uncollectedLikes / 100000}
        </div>
      )}
      <LikesPageNavigationIcon className="w-full h-full" />
    </div>
  );
}
