import mockAxios from "@/__mocks__/axios";
import { UsersProvider } from "@/app/contexts/UsersContext";
import { Dialog } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { addUser } from "../../../../services/userservice";
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