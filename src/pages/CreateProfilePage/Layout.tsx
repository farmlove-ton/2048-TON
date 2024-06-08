interface IProps {
  title: React.ReactNode;
  children: React.ReactNode;
  actions: React.ReactNode[];
}

const Layout = ({ title, children, actions }: IProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl">{title}</h2>
      <div className="flex flex-col space-y-2">{children}</div>
      <div className="ml-auto">{actions}</div>
    </div>
  );
};

export default Layout;
