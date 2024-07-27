import RolesGrid from '@/app/components/dashboard/roles/RolesGrid';
import { RolesProvider } from '@/app/contexts/RolesContext';
import { RoleData } from '@/app/models/role.model';
import mockAxios from '@/testing/__mocks__/axios';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('axios');

const ROLES_MOCK: RoleData[] = [
  {
    id: 1,
    name: 'Joueur',
    score: 0,
    permissions: [],
    users: [],
  },
  {
    id: 2,
    name: 'Administrateur',
    score: 0,
    permissions: [],
    users: [],
  },
];

describe('/dashboard/roles', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should render successfully', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: ROLES_MOCK });

    const roles = render(
      <RolesProvider>
        <RolesGrid />
      </RolesProvider>
    );

    await waitFor(() => {
      expect(roles).toMatchSnapshot();
    });
  });

  it('should render an error on API failure', async () => {
    mockAxios.get.mockRejectedValue(new Error('Failed to fetch roles'));

    render(
      <RolesProvider>
        <RolesGrid />
      </RolesProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Aucun role enregistré...')).toBeInTheDocument();
    });
  });
});
