interface IProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 96, height = 24 }: IProps) => {
  return <img width={width} height={height} src="/logo.svg" />;
};

export default Logo;
