import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetailPage from './UserDetailPage';

const queryClient = new QueryClient();

describe('UserDetailPage', () => {
  // todo: correct test because not working
  // todo write test loading data
  // todo write test error

  it('renders user details after data has been loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/users/1']}>
          <Routes>
            <Route path="/users/:id" element={<UserDetailPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByRole('progressbar')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/Leanne Graham/)).toBeInTheDocument();
    });
  });
});
