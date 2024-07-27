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
    telegramId: 7808601,
    chatId: "776-07-6937",
    username: "zackary.lubowitz",
    firstName: "Amado",
    lastName: "Blanda",
    bio: "Soluta eos neque iste quidem odio.",
    age: 47,
    sex: "Male",
    love: 6393860,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    isNew: true,
    telegramId: 75774584,
    chatId: "711-73-4741",
    username: "reba.hahn",
    firstName: "Gino",
    lastName: "McDermott",
    bio: "Dicta aliquid et architecto.",
    age: 50,
    sex: "Male",
    love: 698,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    isNew: true,
    telegramId: 5,
    chatId: "751-94-7493",
    username: "arlette.kling",
    firstName: "Norris",
    lastName: "Thiel",
    bio: "Dolore similique pariatur.",
    age: 59,
    sex: "Male",
    love: 9855,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 35750,
    chatId: "542-92-3254",
    username: "twana.altenwerth",
    firstName: "Hunter",
    lastName: "West",
    bio: "Nostrum provident aspernatur.",
    age: 55,
    sex: "Male",
    love: 998619,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 0,
    chatId: "797-94-9965",
    username: "elizebeth.hickle",
    firstName: "Alan",
    lastName: "Erdman",
    bio: "Qui aspernatur et error quidem ea.",
    age: 81,
    sex: "Male",
    love: 9812526,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 9011,
    chatId: "068-23-8606",
    username: "jerrell.stroman",
    firstName: "Yoshiko",
    lastName: "Lang",
    bio: "Sunt et autem eius ratione repellat.",
    age: 59,
    sex: "Female",
    love: 982,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 31880,
    chatId: "638-53-4729",
    username: "hui.medhurst",
    firstName: "Alvina",
    lastName: "Jenkins",
    bio: "Rem cumque recusandae voluptates quidem.",
    age: 38,
    sex: "Female",
    love: 3055,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 90629,
    chatId: "250-35-0810",
    username: "randal.zulauf",
    firstName: "Erick",
    lastName: "Moore",
    bio: "Nulla voluptate aut facere mollitia culpa in.",
    age: 52,
    sex: "Male",
    love: 31129,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 640,
    chatId: "400-59-9958",
    username: "reva.kuphal",
    firstName: "Andre",
    lastName: "Kuphal",
    bio: "Et soluta cum repudiandae eum harum sunt.",
    age: 34,
    sex: "Male",
    love: 14604582,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 464,
    chatId: "376-95-6637",
    username: "joycelyn.kutch",
    firstName: "Leida",
    lastName: "Green",
    bio: "Aut deleniti omnis sunt rerum et.",
    age: 82,
    sex: "Female",
    love: 51967873,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 6,
    chatId: "310-26-0932",
    username: "sharie.kuvalis",
    firstName: "Dalton",
    lastName: "Streich",
    bio: "Eum inventore assumenda ad aperiam nisi officiis vel.",
    age: 60,
    sex: "Male",
    love: 67140325,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 37809,
    chatId: "226-11-3858",
    username: "kassandra.cummings",
    firstName: "Alyson",
    lastName: "Jenkins",
    bio: "Rerum eos ipsum eius cum.",
    age: 63,
    sex: "Female",
    love: 6760578,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 242703,
    chatId: "354-03-6094",
    username: "patsy.roberts",
    firstName: "Marcella",
    lastName: "Veum",
    bio: "Et illo dignissimos.",
    age: 93,
    sex: "Male",
    love: 77014,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 5,
    chatId: "567-87-2640",
    username: "bula.dibbert",
    firstName: "Shad",
    lastName: "Weber",
    bio: "Laborum nihil dolor velit ut cum saepe.",
    age: 79,
    sex: "Female",
    love: 5239,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 73674591,
    chatId: "409-87-4116",
    username: "avis.purdy",
    firstName: "Burl",
    lastName: "Fisher",
    bio: "Enim saepe sint adipisci.",
    age: 19,
    sex: "Female",
    love: 86935,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 32,
    chatId: "012-60-8739",
    username: "shavon.spencer",
    firstName: "Antione",
    lastName: "Strosin",
    bio: "Occaecati sequi neque.",
    age: 32,
    sex: "Male",
    love: 7717,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 85331888,
    chatId: "298-66-7343",
    username: "steven.stiedemann",
    firstName: "Brant",
    lastName: "Marquardt",
    bio: "Voluptatum quisquam placeat est non et dolorem provident.",
    age: 19,
    sex: "Female",
    love: 21463847,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 271,
    chatId: "624-08-5098",
    username: "frederick.halvorson",
    firstName: "Tatiana",
    lastName: "Bahringer",
    bio: "Rerum dolor qui voluptatem.",
    age: 87,
    sex: "Female",
    love: 779218617,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 9775601,
    chatId: "660-67-2807",
    username: "ron.hills",
    firstName: "Kamilah",
    lastName: "Volkman",
    bio: "Qui quo est consequatur ab illo incidunt.",
    age: 97,
    sex: "Female",
    love: 314,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    telegramId: 21371,
    chatId: "316-90-7710",
    username: "markus.gutkowski",
    firstName: "Vicente",
    lastName: "Mills",
    bio: "Eligendi voluptatem voluptatum dolor dolorum consequatur.",
    age: 98,
    sex: "Female",
    love: 4,
    photoUrl: "https://picsum.photos/200/300",
  },
];

const LikesPage = () => {
  const navigate = useNavigate();

  const handleItemClick = ({ id }: { id: number }) => {
    return navigate(`/likes/${id}`);
  };

  return (
    <PageLayout className="flex flex-col">
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
