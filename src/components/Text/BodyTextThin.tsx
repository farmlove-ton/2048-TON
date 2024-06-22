import React from "react";
import Text from "./Text";

type BodyTextThinProps = {
  children: React.ReactNode;
  className?: string;
};

const BodyTextThin: React.FC<BodyTextThinProps> = ({ children, className }) => {
  return (
    <Text
      size="base"
      color="text-[#E2DAEC]"
      weight="light"
      className={className}
    >
      {children}
    </Text>
  );
};

export default BodyTextThin;
