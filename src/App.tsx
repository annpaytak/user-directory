import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserListPage from './features/users/pages/UserList/UserListPage';
import UserDetailPage from './features/users/pages/UserDetail/UserDetailPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;