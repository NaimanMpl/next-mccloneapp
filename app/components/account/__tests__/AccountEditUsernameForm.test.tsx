import NextAuthProvider from "@/app/contexts/NextAuthProvider";
import { UserPayload } from "@/app/models/user.model";
import { Toaster } from "@/components/ui/toaster";
import mockAxios, { SESSION_MOCK } from "@/testing/__mocks__/axios";
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import { useSession } from "next-auth/react";
import AccountEditUsernameForm from "../AccountEditUsernameForm";

jest.mock('axios');
jest.mock('next-auth/react');

describe('<AccountEditUsernameForm>', () => {

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: SESSION_MOCK, update: jest.fn() });
  })

  afterEach(() => {
    mockAxios.reset();
    user.setup();
  })

  it('should render successfully', () => {

    const username = SESSION_MOCK.user.name;

    const form = render(
      <AccountEditUsernameForm username={username} />
    );

    const [ usernameInput ] = screen.getAllByRole('textbox');

    expect(usernameInput).toHaveValue(username);
    expect(form).toMatchSnapshot();
  });

  it('should change input value on successfull username rename api call', async () => {
    
    const newUsername = "John";
    const username = SESSION_MOCK.user.name;
    mockAxios.patch.mockResolvedValue({ username: newUsername });

    render(
      <AccountEditUsernameForm username={username} />
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

    const username = SESSION_MOCK.user.name;

    render(
      <>
        <AccountEditUsernameForm username={username} />
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
      expect(screen.getByText('Pas si vite !')).toBeInTheDocument();
    });
    
  });

  it('should throw an error if the user tries to submit an invalid username', async () => {

    const username = SESSION_MOCK.user.name;
    const newUsername = 'a';

    render(
      <>
        <AccountEditUsernameForm username={username} />
        <Toaster />
      </>
    );

    const [ usernameInput ] = screen.getAllByRole('textbox');

    await user.clear(usernameInput);
    await user.type(usernameInput, newUsername);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(usernameInput).toHaveValue(newUsername);
      expect(screen.getByText("Le nom d'utilisateur doit avoir au moins 2 caractères")).toBeInTheDocument();
    });
    
  });


});