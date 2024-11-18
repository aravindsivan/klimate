import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useLocalStorage<
    SearchHistoryItemProps[]
  >("search-history", []);

  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => searchHistory,
    initialData: searchHistory,
  });

  const addToSearchHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItemProps, "id" | "searchedAt">
    ) => {
      const newSearch: SearchHistoryItemProps = {
        ...search,
        id: crypto.randomUUID(),
        searchedAt: Date.now(),
      };

      const filteredSearchHistory = searchHistory.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );

      const newHistory = [newSearch, ...filteredSearchHistory].slice(0, 10);

      setSearchHistory(newHistory);

      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], newHistory);
    },
  });

  const clearSearchHistory = useMutation({
    mutationFn: async () => {
      setSearchHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToSearchHistory,
    clearSearchHistory,
  };
}
