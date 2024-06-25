import React from "react";
import Text from "./Text";

type BodyTextSemiboldProps = {
  children: React.ReactNode;
  className?: string;
};

const BodyTextSemibold: React.FC<BodyTextSemiboldProps> = ({
  children,
  className,
}) => {
  return (
    <Text size="base" weight="semibold" className={className}>
      {children}
    </Text>
  );
};

export default BodyTextSemibold;
