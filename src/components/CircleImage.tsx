interface CircularImageProps {
  src: string;
  alt: string;
}

const CircularImage: React.FC<CircularImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full rounded-full object-cover"
    />
  );
};

export default CircularImage;
