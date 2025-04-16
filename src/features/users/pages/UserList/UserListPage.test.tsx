import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserListPage from './UserListPage';

const queryClient = new QueryClient();

describe('UserListPage', () => {
  // todo: correct test because not working
  it('renders loading state and then user list', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserListPage />
      </QueryClientProvider>
    );

    expect(screen.getByRole('progressbar')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/Leanne Graham/)).toBeTruthy();
    });
  });
});
