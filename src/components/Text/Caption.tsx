import React from "react";
import Text from "./Text";

type CaptionProps = {
  children: React.ReactNode;
  className?: string;
};

const Caption: React.FC<CaptionProps> = ({ children, className }) => {
  return (
    <Text size="sm" color="text-gray-500" className={className}>
      {children}
    </Text>
  );
};

export default Caption;
