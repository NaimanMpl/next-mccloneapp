import mockAxios from "@/__mocks__/axios";
import { RolesProvider } from "@/app/contexts/RolesContext";
import { Dialog } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import AddRoleDialog from "../AddRoleDialog";

jest.mock('axios');

describe('<AddRoleDialog />', () => {

  afterAll(() => {
    mockAxios.reset();
    user.setup();
  });

  it('should render successfully', () => {
    const dialog = render(
      <RolesProvider>
        <Dialog open>
          <AddRoleDialog />
        </Dialog>
      </RolesProvider>
    );

    expect(dialog).toMatchSnapshot();
  });

  it('should post a new role when submitting a valid form', async () => {

    const newRole = "Test Role";

    mockAxios.get.mockResolvedValueOnce([]);
    const submit = mockAxios.post.mockResolvedValueOnce(newRole);
    
    render(
      <RolesProvider>
        <Dialog open>
          <AddRoleDialog />
        </Dialog>
      </RolesProvider>
    );

    const [ roleNameInput ] = screen.getAllByRole('textbox');
    await user.type(roleNameInput, newRole);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(submit).toHaveBeenCalledWith("/api/roles", { name: newRole });
    })
  });

  it('should throw an error toast if API call fails', async () => {
    const newRole = "Joueur";

    mockAxios.get.mockResolvedValueOnce([]);
    mockAxios.post.mockRejectedValueOnce(new Error("Fail to POST new role !"));
    
    render(
      <>
        <RolesProvider>
          <Dialog open>
            <AddRoleDialog />
          </Dialog>
        </RolesProvider>
        <Toaster />
      </>
    );

    const [ roleNameInput ] = screen.getAllByRole('textbox');
    await user.type(roleNameInput, newRole);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Uh-oh")).toBeInTheDocument();
    });
  });

  it('should not submit the form if empty role name is given', async () => {
    
    mockAxios.get.mockResolvedValueOnce([]);
    mockAxios.post.mockRejectedValueOnce(new Error("Empty fields!"));

    render(
      <>
        <RolesProvider>
          <Dialog open>
            <AddRoleDialog />
          </Dialog>
        </RolesProvider>
        <Toaster />
      </>
    );

    const [ roleNameInput ] = screen.getAllByRole('textbox');
    await user.clear(roleNameInput);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(roleNameInput).toHaveValue('');
      expect(screen.getByText('Pas si vite !')).toBeInTheDocument();
    });
    
  });

});