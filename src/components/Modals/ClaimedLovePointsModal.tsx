import { BodyText, Button, Title } from "..";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { pluralize } from "../../lib/utils/pluralize";

interface IProps {
  amount: number;
}

export default function ClaimedLovePointsModal({ amount }: IProps) {
  const { handleCloseModal } = useContext(ModalContext);
  return (
    <>
      <Title>Claimed!</Title>

      <BodyText>
        You claimed {amount} love {pluralize("point", amount)}
      </BodyText>

      <Button onClick={handleCloseModal}>Ok</Button>
    </>
  );
}
