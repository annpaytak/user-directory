import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import UserListPage from './UserListPage';
import { MemoryRouter } from 'react-router-dom';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

const server = setupServer(
  http.get(USERS_API_URL, () => {
    return new HttpResponse(JSON.stringify([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserListPage', () => {
  it('shows loading initially', () => {
    render(<MemoryRouter><UserListPage /></MemoryRouter>, { wrapper: createWrapper() });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders users after successful fetch', async () => {
    render(<MemoryRouter><UserListPage /></MemoryRouter>, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getAllByTestId('user-item')).toHaveLength(2);
    });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows error message on fetch failure', async () => {
    server.use(
      http.get(USERS_API_URL, () => {
        return HttpResponse.json({ error: 'Something went wrong' }, { status: 500 });
      })
    )

    render(<MemoryRouter><UserListPage /></MemoryRouter>, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.findByText('Виникла помилка при завантаженні користувачів.')).resolves.toBeInTheDocument();
    });
  });
});

