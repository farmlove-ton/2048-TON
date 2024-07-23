import clsx from "clsx";
import { Navigation } from "../components";

const PageLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className={clsx("px-4 pt-4 h-full", className)}>{children}</div>
      <Navigation />
    </div>
  );
};

export default PageLayout;
