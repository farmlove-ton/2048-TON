import { Dialog, DialogPanel } from "@headlessui/react";

import { BodyText, Button, Title } from "..";

interface IProps {
  isOpen: boolean;
  close: () => void;
}

export default function NoTicketsModal({ isOpen, close }: IProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-1">
          <DialogPanel
            transition
            className="space-y-4 w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 text-center"
          >
            <Title>No tickets left</Title>
            <BodyText>Please wait till you get enough tickets</BodyText>{" "}
            <Button onClick={close}>Got it, thanks!</Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
