import { useQuery } from '@tanstack/react-query';
import { fetchUserById, } from '@/api/users';

export const useUserDetail = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['user', id],
    queryFn: ({ signal }) => fetchUserById(id!, signal),
  });

  return { user: data, ...rest }
}