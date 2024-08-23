import { BodyText, Button, Title } from "..";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function NoTicketsModal() {
  const { handleCloseModal } = useContext(ModalContext);
  return (
    <>
      <Title>No tickets left</Title>
      <BodyText>Please wait till you get enough tickets</BodyText>{" "}
      <Button onClick={handleCloseModal}>Got it, thanks!</Button>
    </>
  );
}
