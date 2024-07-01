import { Navigation } from "../components";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="p-4">{children}</div>
      <Navigation />
    </div>
  );
};

export default PageLayout;
