import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserListItem from './UserListItem';
import { User } from '../../../../types/user';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
  address: {
    street: 'Test St',
    suite: 'Apt. 1',
    city: 'Testville',
    zipcode: '12345',
    geo: { lat: '0', lng: '0' }
  },
  phone: '123-456-7890',
  website: 'example.com',
  company: {
    name: 'TestCorp',
    catchPhrase: 'Testing best practices',
    bs: 'test-driven development'
  }
};

describe('UserListItem', () => {
  // todo: correct test because not working
  it('renders user name and email', () => {
    render(
      <MemoryRouter>
        <UserListItem user={mockUser} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test User')).not.toBeNull();
    expect(screen.getByText('test@example.com')).not.toBeNull();
  });
});
