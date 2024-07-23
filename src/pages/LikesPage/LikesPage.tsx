import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { BodyText, SmallText, Title } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import clsx from "clsx";
import { CircleStackIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const users = [
  {
    isNew: true,
    telegramId: 730,
    chatId: "232-86-1890",
    username: "mel.friesen",
    firstName: "Salome",
    lastName: "Steuber",
    bio: "Facilis facilis consequatur quam eligendi nihil dolores est.",
    age: 66,
    sex: "Male",
    love: 32827849,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    isNew: true,
    telegramId: 478954276,
    chatId: "432-13-4814",
    username: "dionne.kassulke",
    firstName: "Yung",
    lastName: "Balistreri",
    bio: "Quia minus quae sit dolorum quis cumque et.",
    age: 42,
    sex: "Female",
    love: 35,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 6,
    chatId: "327-32-5808",
    username: "jerrell.grant",
    firstName: "Elvie",
    lastName: "Greenholt",
    bio: "Nisi architecto id dolores.",
    age: 69,
    sex: "Male",
    love: 94714,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 99580257,
    chatId: "700-81-1785",
    username: "carina.jakubowski",
    firstName: "Antonio",
    lastName: "Kunde",
    bio: "Molestiae est tempora.",
    age: 57,
    sex: "Male",
    love: 380216,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 48,
    chatId: "833-05-4784",
    username: "malik.bernhard",
    firstName: "Bev",
    lastName: "Farrell",
    bio: "Dolores culpa temporibus repudiandae qui alias nisi.",
    age: 44,
    sex: "Male",
    love: 79,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 160298543,
    chatId: "176-89-4551",
    username: "troy.schultz",
    firstName: "Margarito",
    lastName: "Friesen",
    bio: "Repellendus et illo eius est beatae aut.",
    age: 95,
    sex: "Female",
    love: 7820952,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 4800347,
    chatId: "109-30-6752",
    username: "sterling.mckenzie",
    firstName: "Bobbie",
    lastName: "Bogan",
    bio: "Voluptas dignissimos et exercitationem.",
    age: 45,
    sex: "Male",
    love: 5,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 2352553,
    chatId: "268-35-8187",
    username: "brandee.veum",
    firstName: "Kenyatta",
    lastName: "Turner",
    bio: "Officia nesciunt est rerum illo aspernatur corrupti.",
    age: 91,
    sex: "Female",
    love: 17230,
    photoUrl: "https://picsum.photos/200/300",
  },
];

const LikesPage = () => {
  const navigate = useNavigate();

  const handleItemClick = ({ id }: { id: number }) => {
    return navigate(`/user/${id}`);
  };

  return (
    <PageLayout className="h-full flex flex-col">
      <div className="flex-1 flex-grow-0">
        <Title className="pb-6">Your likes list</Title>
      </div>
      <div className="flex-1">
        <VirtualizedList
          columnCount={2}
          onItemClick={handleItemClick}
          items={users.map((user) => ({
            id: user.telegramId,
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            image: user.photoUrl,
            isNew: !!user.isNew,
          }))}
        />
      </div>
    </PageLayout>
  );
};

interface Item {
  id: number;
  name: string;
  age: number;
  isNew: boolean;
  image: string;
}

interface VirtualizedListProps {
  items: Item[];
  columnCount: number;
  onItemClick: (item: Item) => void;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  columnCount,
  onItemClick,
}) => {
  const ItemRenderer: React.FC<GridChildComponentProps> = ({
    columnIndex,
    rowIndex,
    style,
  }) => {
    const CELL_GAP = 6;
    const index = rowIndex * columnCount + columnIndex;
    if (index >= items.length) return null;

    const item = items[index];

    const handleClick = () => {
      onItemClick(item);
    };

    return (
      <div
        onClick={handleClick}
        className={clsx(
          "relative bg-cover bg-center rounded-lg cursor-pointer",
          item.isNew && "border border-[#6161d8]"
        )}
        style={{
          ...style,
          left: Number(style.left) + columnIndex * CELL_GAP,
          top: Number(style.top) + rowIndex * CELL_GAP,
          width: Number(style.width) - CELL_GAP,
          height: Number(style.height) - CELL_GAP,
          backgroundImage: `url(${items[index].image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 pointer-events-none rounded-lg"></div>
        <div className="absolute bottom-4 left-4">
          <SmallText>
            {item.name}, {item.age}
          </SmallText>
        </div>
        {item.isNew && (
          <div className="absolute top-4 left-4">
            <BodyText>New</BodyText>
          </div>
        )}

        <div className="absolute bottom-4 right-4">
          <CircleStackIcon className="size-5 text-white" />
        </div>
      </div>
    );
  };

  const getItemKey = ({
    columnIndex,
    rowIndex,
  }: {
    columnIndex: number;
    rowIndex: number;
  }) => rowIndex * columnCount + columnIndex;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          className="overflow-y-auto no-scrollbar"
          columnCount={columnCount}
          columnWidth={width / columnCount}
          height={height}
          rowCount={Math.ceil(items.length / columnCount)}
          rowHeight={150}
          width={width}
          itemKey={getItemKey}
        >
          {ItemRenderer}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
};

export default LikesPage;
