import { USERS_MOCK } from "@/__mocks__/users";
import { UsersProvider } from "@/app/contexts/UsersContext";
import { RoleEnum } from "@/app/models/role.model";
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import UserRow from "../UserRow";
import UsersTable from "../UsersTable";

jest.mock('axios');

describe('<UsersTable />', () => {
  
  afterEach(() => {
    mockAxios.reset();
  });

  it('should render successfully', async () => {

    mockAxios.get.mockResolvedValueOnce({ data: USERS_MOCK });

    const users = render(
      <UsersProvider>
        <UsersTable />
      </UsersProvider>
    );

    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    expect(users).toMatchSnapshot();
  });
 
  it('renders error message on API failure', async () => {

    mockAxios.get.mockRejectedValueOnce(new Error('Failed to fetch users'));

    render(
      <UsersProvider>
        <UsersTable />
      </UsersProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Aucun utilisateur inscrit...')).toBeInTheDocument();
    });

  });

  it('should disable delete button if user is admin', async () => {

    mockAxios.get.mockResolvedValueOnce({ data: USERS_MOCK });
    const userMock = USERS_MOCK[0];

    render(
      <UsersProvider>
        <UserRow 
          key={userMock.id} 
          id={userMock.id} 
          name={userMock.name} 
          email={userMock.email} 
          admin={userMock.admin} 
          createdAt={userMock.createdAt}
          role={userMock.role.name as RoleEnum}
          profileIconUrl={userMock.profileIconUrl}
        />
      </UsersProvider>
    );

    const dropdownMenuButton = screen.getByRole('button');
    await user.click(dropdownMenuButton);
    const deleteButton = screen.getByText('Supprimer');
    expect(deleteButton.getAttribute('aria-disabled')).toBe('true');
  });

  it("should NOT disable delete button if user isn't admin", async () => {

    mockAxios.get.mockResolvedValueOnce({ data: USERS_MOCK });
    const userMock = USERS_MOCK[0];

    render(
      <UsersProvider>
        <UserRow 
          key={userMock.id} 
          id={userMock.id} 
          name={userMock.name} 
          email={userMock.email} 
          admin={false} 
          createdAt={userMock.createdAt}
          role={userMock.role.name as RoleEnum}
          profileIconUrl={userMock.profileIconUrl}
        />
      </UsersProvider>
    );

    const dropdownMenuButton = screen.getByRole('button');
    await user.click(dropdownMenuButton);
    const deleteButton = screen.getByText('Supprimer');
    expect(deleteButton.getAttribute('aria-disabled')).toBe(null);
  });

});