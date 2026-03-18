import backend from '@/api/config/axios.js';
import useAppContext from '@/contexts/App/hooks/useAppContext.js';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useFetchMedias = (
  optionalParams = {},
  initialCursor = null,
  onNewCursor,
  enabled = true
) => {
  const {
    state: { language, country }
  } = useAppContext();

  const paramsKey = JSON.stringify(Object.entries(optionalParams).sort());

  const query = useInfiniteQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['fetchMedias', paramsKey, country, language],
    initialPageParam: initialCursor,
    queryFn: async ({ pageParam = null }) => {
      const params = {
        // ALLOWS OVERRIDES
        countryCode: country,
        languageCode: language,
        ...optionalParams,
        ...(pageParam && { cursor: pageParam })
      };

      const { data } = await backend.get('/media/fetch', { params });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled
  });

  const shows = query.data?.pages
    ? query.data.pages.flatMap((p) => p.shows)
    : [];

  const lastPage = query.data?.pages?.[query.data.pages.length - 2];
  const currentCursor = lastPage?.nextCursor;

  useEffect(() => {
    if (!currentCursor || !onNewCursor) return;
    onNewCursor(currentCursor);
  }, [currentCursor, onNewCursor]);

  return {
    shows,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetching: query.isFetching,
    // isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    error: query.error
  };
};

export default useFetchMedias;
