import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import UserDetailPage from './UserDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const USER_API_URL = 'https://jsonplaceholder.typicode.com/users/4'

const server = setupServer(
  http.get(USER_API_URL, ({ params }) => {
    return new HttpResponse(JSON.stringify({
      id: params.id,
      name: "Patricia Lebsack",
      email: "Julianne.OConner@kory.org",
      address: {
        street: "Hoeger Mall",
        suite: "Apt. 692",
        city: "South Elvis",
      },
    }), {
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

describe('UserDetailPage', () => {
  it('shows loading initially', () => {
    render(<MemoryRouter initialEntries={['/user/4']}>
      <Routes>
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </MemoryRouter>, { wrapper: createWrapper() });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders user after successful fetch', async () => {
    render(<MemoryRouter initialEntries={['/user/4']}>
      <Routes>
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </MemoryRouter>, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Patricia Lebsack')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    server.use(
      http.get(USER_API_URL, () => {
        return HttpResponse.json({ error: 'Something went wrong' }, { status: 500 });
      })
    )

    render(<MemoryRouter initialEntries={['/user/4']}>
      <Routes>
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </MemoryRouter>, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.findByText('Помилка завантаження користувача.')).resolves.toBeInTheDocument();
    });
  });
});

