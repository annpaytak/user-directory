import { useInfiniteQuery, } from '@tanstack/react-query';
import { User } from '../../types/user';
import {
  Container,
  Typography,
  List,
  CircularProgress,
  Button,
} from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { fetchUsers } from '../../api/users';
import UserSearch from './components/UserSearch/UserSearch';
import UserListItem from './components/UserListItem/UserListItem';

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    {
      queryKey: ['users', searchQuery],
      queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam, searchQuery }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 5) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    refetch();
  };

  const filteredUsers = data?.pages.flat().filter((user: User) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isError) {
    return <Typography variant="h6">Виникла помилка при завантаженні користувачів.</Typography>;
  }

  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 2,
      }}>
      <Typography variant="h4" gutterBottom>
        Користувачі
      </Typography>
      <UserSearch searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <List>
        {filteredUsers?.map((user: User) => (
          <UserListItem user={user} />
        ))}
      </List>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {isFetchingNextPage || isLoading ? (
          <CircularProgress size={24} />
        ) : (
          hasNextPage && (
            <Button onClick={handleLoadMore} variant="contained" color="primary">
              Завантажити більше
            </Button>
          )
        )}
      </div>
    </Container>
  );
};

export default UserListPage