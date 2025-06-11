import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, Container, Typography } from '@mui/material';
import classes from "./UserDetailPage.module.scss";
import { useUserDetail } from '@/hooks/useUserDetail';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading, error } = useUserDetail(id)

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error || (!user && !isLoading)) return <Alert severity="error">Помилка завантаження користувача.</Alert>;
  if (isLoading) return <CircularProgress className={classes.loading} size={24} />;

  if (user)
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
  return <></>
};

export default UserDetailPage
