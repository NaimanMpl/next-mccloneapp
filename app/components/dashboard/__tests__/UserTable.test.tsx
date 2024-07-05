import { UsersProvider } from "@/app/contexts/UsersContext";
import { User } from "@/app/models/user.model";
import { getUsers } from "@/app/services/userservice";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import mockAxios from 'jest-mock-axios';
import UsersTable from "../UsersTable";

const USERS_MOCK: User[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'johndoe@domain.com', 
    admin: false, 
    createdAt: new Date('2024-05-07'), 
    role: {
      id: 1,
      name: 'Joueur',
      score: 0
    },
    skin: {
      id: 1,
      link: 'someawesomeskinlink.com/'
    },
    profileIconUrl: 'someawesomeprofileicon.com'
  }
];

jest.mock('axios');

describe('<UsersTable />', () => {
  
  afterEach(() => {
    mockAxios.reset();
  })

  /*
  it('should render successfully', async () => {

    mockAxios.get.mockResolvedValue(USERS_MOCK);

    render(
      <UsersProvider>
        <UsersTable />
      </UsersProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('johndoe@domain.com')).toBeInTheDocument();
      //expect(screen).toMatchSnapshot();
    });

  });
  */
 
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

});