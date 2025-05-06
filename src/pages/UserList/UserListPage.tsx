import { User } from "@/types/user";
import {
  Container,
  Typography,
  List,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import UserSearch from "./components/UserSearch/UserSearch";
import UserListItem from "./components/UserListItem/UserListItem";
import { useUsers } from "@/hooks/useUsers";
import classes from "./UserListPage.module.scss";

const UserListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    users,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useUsers(searchQuery);

  const handleLoadMore = () => {
    fetchNextPage();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  if (isError || (!users && !isLoading)) {
    return (
      <Alert severity="error">Виникла помилка при завантаженні користувачів.</Alert>
    );
  }

  return (
    <Container className={classes.pageContainer}>
      <Typography variant="h4" gutterBottom>
        Користувачі
      </Typography>
      <UserSearch
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      {users?.length ? (
        <List>
          {users.map((user: User) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </List>
      ) : null}
      {isFetchingNextPage || isLoading || hasNextPage ? (
        <div className={classes.loadingBlock}>
          {isFetchingNextPage || isLoading ? (
            <CircularProgress size={24} />
          ) : null}
          {hasNextPage ? (
            <Button
              onClick={handleLoadMore}
              variant="contained"
              color="primary"
            >
              Завантажити більше
            </Button>
          ) : null}
        </div>
      ) : null}
    </Container>
  );
};

export default UserListPage;
