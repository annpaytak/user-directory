import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const UserListPage = lazy(() => import('./pages/UserList/UserListPage'));
const UserDetailPage = lazy(() => import('./pages/UserDetail/UserDetailPage'));
const FileSystemPage = lazy(() => import('./pages/FileSystem/FileSystemPage'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/files" element={<FileSystemPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;