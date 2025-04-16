import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, CircularProgress, Container, Typography } from '@mui/material';
import { fetchUserById } from '../../api/users';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id!),
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <CircularProgress size={24} />;
  if (error || !user) return <Alert>Помилка завантаження користувача.</Alert>;

  return (
    <Container>
      <Button variant="outlined" onClick={handleGoBack} sx={{ marginBottom: 2 }}>
        Назад
      </Button>
      <Typography variant="h1" gutterBottom>{user.name}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
      <Typography variant="body1"><strong>Номер телефону:</strong> {user.phone}</Typography>
      <Typography variant="body1">
        <strong>Адреса:</strong> {user.address.street}, {user.address.suite}, {user.address.city}
      </Typography>
    </Container>
  );
};

export default UserDetailPage
