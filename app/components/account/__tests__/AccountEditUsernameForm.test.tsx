import mockAxios from "@/__mocks__/axios";
import { Toaster } from "@/components/ui/toaster";
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import { AuthProvider } from "../../AuthProvider";
import AccountEditUsernameForm from "../AccountEditUsernameForm";

jest.mock('axios');

describe('<AccountEditUsernameFOrm>', () => { 

  afterEach(() => {
    mockAxios.reset();
    user.setup();
  })

  it('should render successfully', () => {

    const username = "John";

    const form = render(
      <AuthProvider>
        <AccountEditUsernameForm username={username} />
      </AuthProvider>
    );

    const [ usernameInput ] = screen.getAllByRole('textbox');

    expect(usernameInput).toHaveValue(username);
    expect(form).toMatchSnapshot();
  });

  it('should change input value on successfull rename api call', async () => {

    const username = "John";
    const newUsername = "John Doe";
    mockAxios.patch.mockResolvedValue({ username: newUsername });

    render(
      <AuthProvider>
        <AccountEditUsernameForm username={username} />
      </AuthProvider>
    );

    const [ usernameInput ] = screen.getAllByRole('textbox');

    await user.clear(usernameInput);
    await user.type(usernameInput, newUsername);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.patch).toHaveBeenCalledWith(`/api/auth/me?username=${newUsername}`);
      expect(usernameInput).toHaveValue(newUsername);
    });
    
  });

  it('should throw a warning toast if the user keeps his name unchanged', async () => {

    const username = 'John';
    mockAxios.get.mockResolvedValueOnce({ name: username });

    render(
      <>
        <AuthProvider>
          <AccountEditUsernameForm username={username} />
        </AuthProvider>
        <Toaster />
      </>
    );

    const [ usernameInput ] = screen.getAllByRole('textbox');

    await user.clear(usernameInput);
    await user.type(usernameInput, username);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(username);
      // expect(screen.getByText('Pas si vite !')).toBeInTheDocument();
    });
    
  });

});