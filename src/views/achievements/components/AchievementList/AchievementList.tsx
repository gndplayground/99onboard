import { Button } from "@components";
import { Achievement } from "@models";
import {
  setFilter,
  useGetAchievementsQuery,
} from "../../../../store/achievements-slice";
import { AchievementItem } from "../AchievementItem";
import { AchievementItemSkeleton } from "../AchievementItemSkeleton";
import { useAppDispatch, useAppSelector } from "@hooks";
import { RootState } from "@store";
import { shallowEqual } from "react-redux";
import { useDebounce } from "use-debounce";

interface AchievementListProps {
  onRequestCreate?: () => void;
  onRequestEdit?: (id: string, currentData: Achievement) => void;
}

const selectorFilter = (state: RootState) => {
  return {
    search: state.achievements.search,
    sortDate: state.achievements.sortDate,
  };
};

export function AchievementList({
  onRequestCreate,
  onRequestEdit,
}: AchievementListProps) {
  const filter = useAppSelector(selectorFilter, {
    equalityFn: shallowEqual,
  });

  const [searchTerm] = useDebounce(filter.search, 700);

  const {
    data: achievements,
    currentData,
    isLoading,
    isFetching,
  } = useGetAchievementsQuery(
    {
      search: searchTerm,
      sortDate: filter.sortDate,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const dispatch = useAppDispatch();

  function handleEdit(id: string) {
    const currentData = achievements?.find((ach) => ach.id === id);

    if (currentData) {
      onRequestEdit?.(id, currentData);
    }
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setFilter({ search: e.target.value, sortDate: filter.sortDate }));
  }

  function handleChangeSortDate(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(
      setFilter({
        search: filter.search,
        sortDate: e.target.value as "asc" | "desc",
      }),
    );
  }

  return (
    <div className="max-w-[600px] mx-auto py-10">
      <div className="px-4">
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            My Achievements 🏆
          </h1>
          <Button className="ml-auto" onClick={onRequestCreate}>
            Create
          </Button>
        </div>

        <div className="flex items-center mt-4">
          <input
            value={filter.search}
            type="text"
            placeholder="Search achievements..."
            className=" w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
            onChange={handleChangeSearch}
          />
          <select
            value={filter.sortDate}
            onChange={handleChangeSortDate}
            className="ml-2 w-[120px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option>Sort</option>
            <option value="asc">Date ASC</option>
            <option value="desc">Date DESC</option>
          </select>
        </div>

        <div className="mt-6 flex flex-col gap-6 relative">
          {isFetching && !isLoading && !currentData && (
            <div className="h-1 w-full bg-blue-100 overflow-hidden absolute -top-2 left-0">
              <div className="progress w-full h-full bg-blue-500 left-right"></div>
            </div>
          )}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <AchievementItemSkeleton key={i} />
            ))}
          {!isLoading &&
            achievements &&
            achievements.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                id={achievement.id}
                dateAchieved={achievement.dateAchieved}
                description={achievement.description}
                title={achievement.title}
                onRequestEdit={handleEdit}
              />
            ))}

          {!isLoading && achievements && achievements.length === 0 && (
            <div className="text-gray-500 text-center mt-6">
              {filter.search ? "No results found" : "No achievements yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
