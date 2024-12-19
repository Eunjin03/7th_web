import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../queries/useGetMovies";

function useGetInfiniteMovies(category) {
  return useInfiniteQuery({
    queryKey: ["movies", category],
    queryFn: ({ pageParam }) => getMovies({ category: category, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMovie = lastPage.results.at(-1);

      return lastMovie ? allPages?.length + 1 : undefined;
    },
  });
}

export { useGetInfiniteMovies };
