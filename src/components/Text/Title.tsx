import React from "react";
import Text from "./Text";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <Text as="h1" size="xl" weight="bold" className={className}>
      {children}
    </Text>
  );
};

export default Title;
