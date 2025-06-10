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

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      // logoutUser(); // clear token, state
      // redirectToLogin();
      // try to refresh token
    } else if (error.response?.status === 403) {
      console.warn('Access Denied.');
      // Hide or restrict UI sections
    } else if (error.response?.status === 404) {
      console.warn('Not Found.');
      // navigate("/404");
    } else if (error.response?.status >= 500) {
      console.warn('Oops! Something went wrong. Please try again later.');
      // logToMonitoring(error);
    }

    return Promise.reject(error);
  }
);

export const fetchUsers = async ({ pageParam = 1, searchQuery = '', signal }: { pageParam?: number, searchQuery?: string, signal?: AbortSignal }): Promise<Array<User>> => {
  try {
    const response = await api.get(`/users?_page=${pageParam}&_limit=5${searchQuery ? `&q=${searchQuery}` : ''}`, {
      signal,
    });
    return response.data;
  } catch (error) {
    //  you can respond to the cancellation inside your query function if desired
    // if (axios.isCancel(error) || error.code === 'ERR_CANCELED' || error.name === 'CanceledError') {
    //   console.log('✅ Запит скасовано через AbortController');
    // } 
    const axiosError = error as AxiosError<{ error?: string }>;
    const message =
      axiosError.response?.data?.error ||
      axiosError.response?.statusText ||
      axiosError.message;

    throw new Error(message);
  }
};

export const fetchUserById = async (id: string, signal?: AbortSignal): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`, { signal });
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
