import { FixedSizeGrid, GridChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BodyText, Button, SmallText, Spinner, Title } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import { collectLikes, fetchLikes, Like } from "../../api/likesService";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { ModalContext } from "../../context/ModalContext";
import { ClaimedLovePointsModal } from "../../components/Modals";
import { pluralize } from "../../lib/utils/pluralize";
import { hideBackButton } from "../../lib/telegram";
import { StackedCoinsIcon } from "../../components/icons/StackedCoinsIcon";

const LikesPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleOpenModal } = useContext(ModalContext);

  useEffect(() => {
    hideBackButton();
  }, []);

  const user = useAuthenticatedUser();

  const { data: likes, isFetching } = useQuery({
    queryKey: ["likes"],
    queryFn: fetchLikes,
    retry: false,
  });

  const collectLikesMutation = useMutation({
    mutationFn: collectLikes,
    onSuccess: (data) => {
      handleOpenModal(
        <ClaimedLovePointsModal amount={user.uncollectedLikes} />
      );

      queryClient.setQueryData<Like[]>(["likes"], data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleCollectLikes = () => {
    collectLikesMutation.mutate();
  };

  if (isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!likes?.length) {
    return <PageLayout>No likes found</PageLayout>;
  }

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
          items={likes.map((like) => ({
            id: like.suggestion.telegramId,
            name: `${like.suggestion.firstName} ${like.suggestion.lastName}`,
            age: like.suggestion.age,
            image: like.suggestion.photoUrl,
            isNew: !like.collected,
          }))}
        />
      </div>

      <div className="fixed w-full bottom-20 p-4 left-0">
        <Button
          className="w-full"
          onClick={handleCollectLikes}
          disabled={!user.uncollectedLikes}
        >
          {user.uncollectedLikes
            ? `Claim ${user.uncollectedLikes} love ${pluralize(
                "point",
                user.uncollectedLikes
              )}`
            : "Claim"}
        </Button>
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

        {item.isNew && (
          <div className="absolute bottom-4 right-4">
            <StackedCoinsIcon className="size-5 text-white" />
          </div>
        )}
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
