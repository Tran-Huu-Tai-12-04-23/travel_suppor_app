import { useInfiniteQuery } from "@tanstack/react-query";
import flatMap from "lodash/flatMap";
import { IFood } from "src/Models/food.model";
import { ILocation } from "src/Models/location.model";
import { SEARCH_TYPE } from "src/screens/Includes/Search";
import endpoints from "src/services/endpoints";
import rootApi from "src/services/rootApi";
export type Root = [ILocation[] | IFood[], number];

type variables = {
  type: SEARCH_TYPE;
  query: string;
  skip: number;
  take: number;
};

type response = {
  data: Root;
};

const usePaginationSearch = (variables: variables) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetching,
    isRefetching,
    isLoading,
    refetch,
  } = useInfiniteQuery<response>(
    [endpoints.SEARCH_ANY, variables],
    ({ pageParam = 0 }) => {
      return rootApi.post<variables, response>(endpoints.SEARCH_ANY, {
        ...variables,
        skip: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        const [data, totalCount] = lastPage.data;
        const nextPage = pages.length * variables.take;
        return nextPage < totalCount ? nextPage : undefined;
      },
    }
  );

  const formatData = data?.pages.flatMap((page) => page.data) ?? [];
  const result: any[] = flatMap(
    formatData.flatMap((item) => (Array.isArray(item) ? [item] : []))
  );
  return {
    total: data?.pages[0]?.data[1] ?? 0,
    isLoading,
    isError,
    data: result,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
    fetchNextPage,
  };
};

export default usePaginationSearch;
