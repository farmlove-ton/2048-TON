import React from "react";
import Text from "./Text";

type SubtitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Subtitle: React.FC<SubtitleProps> = ({ children, className }) => {
  return (
    <Text as="h2" size="lg" weight="semibold" className={className}>
      {children}
    </Text>
  );
};

export default Subtitle;
