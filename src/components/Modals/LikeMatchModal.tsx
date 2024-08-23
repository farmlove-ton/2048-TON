import { BodyText, Button, CircleImage, Title } from "..";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { openChat } from "../../lib/telegram";

interface IProps {
  suggestion: {
    username?: string;
    photoUrl?: string;
  };
  onKeepSwiping: () => void;
}

export default function LikeMatchModal({ suggestion, onKeepSwiping }: IProps) {
  const user = useAuthenticatedUser();

  const onSendMessage = () => {
    if (suggestion.username) {
      openChat(suggestion.username);
    }
  };

  return (
    <>
      <Title>It's a Match!</Title>
      <BodyText>Unleashing a new friendship</BodyText>
      <div className="flex">
        {user.photoUrl && <CircleImage src={user.photoUrl} alt="avatar" />}
        {suggestion.photoUrl && <CircleImage src="someUrl" alt="avatar" />}
      </div>
      <div className="flex flex-col space-y-4">
        <Button onClick={onSendMessage}>Send a Message</Button>
        <Button onClick={onKeepSwiping}>Keep Swiping</Button>
      </div>
    </>
  );
}
