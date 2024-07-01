import React from "react";
import Text from "./Text";

type SmallTextProps = {
  children: React.ReactNode;
  color?: string;
  className?: string;
};

const SmallText: React.FC<SmallTextProps> = ({
  children,
  className,
  color = "text-[#FFFFFF99]",
}) => {
  return (
    <Text size="xs" weight="light" color={color} className={className}>
      {children}
    </Text>
  );
};

export default SmallText;
