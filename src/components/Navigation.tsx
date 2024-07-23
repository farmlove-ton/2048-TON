import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

interface IIcon {
  path: string;
  Icon: React.ComponentType<{ className?: string }>;
  name: string;
}

const items: IIcon[] = [
  {
    path: "/home",
    Icon: HomeIcon,
    name: "Home",
  },
  {
    path: "/task",
    Icon: ChatBubbleOvalLeftEllipsisIcon,
    name: "Task",
  },
  {
    path: "/likes",
    Icon: HeartIcon,
    name: "Likes",
  },
  {
    path: "/edit-profile",
    Icon: UserCircleIcon,
    name: "Boost",
  },
];

const classes = {
  icon: "flex flex-col px-4 py-2 items-center justify-center rounded-md cursor-pointer",
  selected: "border border-[#9D62D9] text-[#9D62D9]",
  notSelected: "hover:text-[#9D62D9] ",
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
