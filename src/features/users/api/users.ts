import { User } from "../types/user";

export const fetchUsers = async ({ pageParam = 1, searchQuery = '' }: { pageParam?: number, searchQuery?: string }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=5&q=${searchQuery}`
  );
  return response.json();
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.json();
};
