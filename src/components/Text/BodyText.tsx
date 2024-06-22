import React from "react";
import Text from "./Text";

type BodyTextProps = {
  children: React.ReactNode;
  className?: string;
};

const BodyText: React.FC<BodyTextProps> = ({ children, className }) => {
  return (
    <Text size="base" className={className}>
      {children}
    </Text>
  );
};

export default BodyText;
