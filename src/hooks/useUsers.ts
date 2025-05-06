import { fetchUsers } from '@/api/users';
import { User } from '@/types/user';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export const useUsers = (searchQuery: string) => {
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const {
    data,
    ...rest
  } = useInfiniteQuery(
    {
      queryKey: ['users', debouncedSearchQuery],
      queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam, searchQuery: debouncedSearchQuery }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 5) {
          return pages.length + 1;
        }
        return;
      },
    }
  );

  const filteredUsers = useMemo(() => data?.pages.flat().filter((user: User) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), [data?.pages, searchQuery])

  return { users: filteredUsers, ...rest }
}