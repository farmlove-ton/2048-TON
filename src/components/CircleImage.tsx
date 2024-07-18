import { memo } from "react";

interface CircularImageProps {
  src: string;
  alt: string;
}

const CircleImage: React.FC<CircularImageProps> = memo(({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full rounded-full object-cover"
    />
  );
});

export default CircleImage;
