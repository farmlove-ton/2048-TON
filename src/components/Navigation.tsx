import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

interface IIcon {
  path: string;
  Icon: React.ComponentType<{ className?: string }>;
  name: string;
}

const items: IIcon[] = [
  {
    path: "/suggestion",
    Icon: HomeIcon,
    name: "Home",
  },
  {
    path: "/chats",
    Icon: ChatBubbleOvalLeftEllipsisIcon,
    name: "Chats",
  },
  {
    path: "/farm-points",
    Icon: HeartIcon,
    name: "Farm points",
  },
  {
    path: "/profile",
    Icon: UserCircleIcon,
    name: "Profile",
  },
];

const classes = {
  icon: "flex flex-col px-4 py-2 items-center justify-center rounded-md cursor-pointer",
  selected: "border border-[#43116A] text-[#43116A]",
  notSelected: "hover:text-[#43116A] ",
};

const Icon = (props: { icon: IIcon; selected: boolean }) => {
  const {
    selected,
    icon: { Icon, name, path },
  } = props;

  return (
    <Link to={path}>
      <div
        className={classNames(
          classes.icon,
          selected ? classes.selected : classes.notSelected
        )}
      >
        <Icon className="size-5" />
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
    <div className="flex space-x-1  p-3 items-center justify-center bg-[#0B0B0E] rounded-t-md">
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
