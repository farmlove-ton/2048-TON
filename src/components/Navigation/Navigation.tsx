import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import LikeIcon from "./components/LikeIcon";
import { HomePageNavigationIcon } from "../icons/HomePageNavigationIcon";
import { TaskPageNavigationIcon } from "../icons/TaskPageNavigationIcon";
import { InvitePageNavigationIcon } from "../icons/InvitePageNavigationIcon";

interface IIcon {
  path: string;
  Icon: React.ComponentType<{ className?: string }>;
  name: string;
}

const items: IIcon[] = [
  {
    path: "/home",
    Icon: HomePageNavigationIcon,
    name: "Home",
  },
  {
    path: "/task",
    Icon: TaskPageNavigationIcon,
    name: "Task",
  },
  {
    path: "/likes",
    Icon: LikeIcon,
    name: "Likes",
  },
  {
    path: "/boost",
    Icon: InvitePageNavigationIcon,
    name: "Boost",
  },
];

const classes = {
  icon: "flex flex-col px-4 py-2 items-center justify-center rounded-md cursor-pointer",
  selected: "border border-[#9D62D9] text-[#9D62D9]",
  notSelected: "hover:text-[#9D62D9]",
};

const Icon = (props: { icon: IIcon; selected: boolean }) => {
  const {
    selected,
    icon: { Icon, name, path },
  } = props;

  return (
    <Link to={path} className="w-24">
      <div
        className={clsx(
          classes.icon,
          selected ? classes.selected : classes.notSelected
        )}
      >
        <div className="flex size-5 items-center justify-center">
          <Icon className="w-full h-full" />
        </div>
        <span>{name}</span>
      </div>
    </Link>
  );
};

const Navigation = () => {
  const location = useLocation();

  const selectedIcon = items.find(({ path }) =>
    location.pathname.includes(path)
  );

  return (
    <div className="flex w-full space-x-1 p-3 items-center justify-between bg-transparent rounded-t-md">
      {items.map((item) => (
        <Icon
          key={item.path}
          icon={item}
          selected={selectedIcon?.path === item.path}
        />
      ))}
    </div>
  );
};

export default Navigation;
