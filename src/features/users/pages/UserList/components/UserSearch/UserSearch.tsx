import {
  TextField,
} from '@mui/material';

type UserSearchProps = {
  searchQuery?: string
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UserSearch = (props: UserSearchProps) => {
  const { searchQuery, handleSearchChange } = props

  return (
    <TextField
      label="Пошук за ім'ям"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleSearchChange}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default UserSearch
