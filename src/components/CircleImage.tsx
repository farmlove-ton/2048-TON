import clsx from "clsx";
import { memo } from "react";

interface CircularImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CircleImage: React.FC<CircularImageProps> = memo(
  ({ src, alt, className }) => {
    return (
      <img
        src={src}
        alt={alt}
        className={clsx("rounded-full object-cover", className)}
      />
    );
  }
);

export default CircleImage;
