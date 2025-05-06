import { User } from "@/types/user";
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async ({ pageParam = 1, searchQuery = '' }: { pageParam?: number, searchQuery?: string }): Promise<Array<User>> => {
  try {
    const response = await api.get(`/users?_page=${pageParam}&_limit=5${searchQuery ? `&q=${searchQuery}` : ''}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    const message =
      axiosError.response?.data?.error ||
      axiosError.response?.statusText ||
      axiosError.message;

    throw new Error(message);
  }
};

export const fetchUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    const message =
      axiosError.response?.data?.error ||
      axiosError.response?.statusText ||
      axiosError.message;

    throw new Error(message);
  }
};
