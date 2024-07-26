import { UsersProvider } from "@/app/contexts/UsersContext";
import { Dialog } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import mockAxios from "@/testing/__mocks__/axios";
import { USERS_MOCK } from "@/testing/__mocks__/users";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { addUser, getUsers } from "../../../../services/userservice";
import AddUserDialog from "../AddUserDialog";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../../../../services/userservice');

describe('<AddUserDialog />', () => {

  afterEach(() => {
    mockAxios.reset();
    user.setup();
  });
  
  it('should not submit the form with empty fields', async () => {
    
    (getUsers as jest.Mock).mockResolvedValueOnce({ users: USERS_MOCK });
    const addUserMock = (addUser as jest.Mock).mockResolvedValueOnce(jest.fn());
    
    render(
      <>
        <UsersProvider>
          <Dialog open>
            <AddUserDialog />
          </Dialog>
        </UsersProvider>
        <Toaster />
      </>
    );

    const [ usernameInput, emailInput ] = screen.getAllByRole('textbox');

    await user.type(usernameInput, 'John Doe');
    await user.type(emailInput, 'johndoe@gmail.com');

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    expect(addUserMock).not.toHaveBeenCalled();
  });

})