interface IProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Layout = ({ title, children }: IProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </div>
  );
};

export default Layout;
