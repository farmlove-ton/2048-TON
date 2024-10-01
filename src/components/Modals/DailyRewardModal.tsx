import { useContext } from "react";
import Button from "../Button";
import { ModalContext } from "../../context/ModalContext";
import { BodyText, BodyTextSemibold, Title } from "../Text";
import { CupIcon } from "../icons/CupIcon";
import { TicketsIcon } from "../icons/TicketsIcon";
import clsx from "clsx";

type RewardStatus = "claimed_today" | "already_claimed" | "not_claimed";

interface Reward {
  reward: number;
  status: RewardStatus;
}

interface IProps {
  updatedUserTicketsAmount: number;
  rewards: Reward[];
}

const rewardStyleByStatus: Record<RewardStatus, string> = {
  already_claimed: "border-gray-500 bg-gradient-pink opacity-50",
  claimed_today: "border-gray-500 bg-gradient-pink",
  not_claimed: "border-gray-500",
};

export const DailyRewardModal = ({ rewards }: IProps) => {
  const { handleCloseModal } = useContext(ModalContext);

  const todayReward = rewards.find((r) => r.status === "claimed_today");

  return (
    <>
      <Title>Daily reward</Title>
      <div>
        <BodyText>
          Wow, you got <strong>{todayReward?.reward}</strong> tickets as daily
          reward.
        </BodyText>
        <BodyText>Keep going to increase your check-in strike!</BodyText>
      </div>
      <div className="py-8">
        <CupIcon className="mx-auto size-16" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className={clsx(
              "space-y-2 flex flex-col items-center p-2 rounded-lg border border-1",
              rewardStyleByStatus[reward.status],
              {
                "col-span-2": index === 6,
              }
            )}
          >
            <BodyTextSemibold>{`Day ${index + 1}`}</BodyTextSemibold>
            <TicketsIcon className="size-5" />
            <BodyText>{reward.reward}</BodyText>
          </div>
        ))}
      </div>
      <Button color="pink" className="w-full" onClick={handleCloseModal}>
        Claim
      </Button>
    </>
  );
};
