import { Link as RouterLink } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { User } from '../../../../types/user';

type UserListItemProps = {
  user: User
}

const UserListItem = (props: UserListItemProps) => {
  const { user } = props
  return (
    <ListItem
      key={user.id}
      component={RouterLink}
      to={`/user/${user.id}`}
    >
      <ListItemText primary={user.name} secondary={user.email} />
      <Button variant="outlined" sx={{ marginBottom: 2 }}>Детальніше</Button>
    </ListItem>
  );
};

export default UserListItem