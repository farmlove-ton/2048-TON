import { BodyText, Button, Title } from "..";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function NoSuggestionsModal() {
  const { handleCloseModal } = useContext(ModalContext);
  return (
    <>
      <Title>No suggestions left</Title>
      <BodyText>No more suggestions for you today</BodyText>
      <Button onClick={handleCloseModal}>Got it, thanks!</Button>
    </>
  );
}
