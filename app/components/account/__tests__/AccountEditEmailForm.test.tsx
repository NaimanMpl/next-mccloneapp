import mockAxios, { SESSION_MOCK } from "@/__mocks__/axios";
import { Toaster } from "@/components/ui/toaster";
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import { useSession } from "next-auth/react";
import AccountEditEmailForm from "../AccountEditEmailForm";

jest.mock('axios');
jest.mock('next-auth/react');

describe('<AccountEditEmailForm>', () => {

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: SESSION_MOCK, update: jest.fn() });
  })

  afterEach(() => {
    mockAxios.reset();
    user.setup();
  })

  it('should render successfully', () => {

    const email = SESSION_MOCK.user.email;

    const form = render(
      <AccountEditEmailForm email={email} />
    );

    const [ emailInput ] = screen.getAllByRole('textbox');

    expect(emailInput).toHaveValue(email);
    expect(form).toMatchSnapshot();
  });

  it('should change input value on successfull email rename api call', async () => {
    
    const newEmail = "john.doe2@domain.com";
    const email = SESSION_MOCK.user.email;
    mockAxios.patch.mockResolvedValue({ username: newEmail });

    render(
      <AccountEditEmailForm email={email} />
    );

    const [ emailInput ] = screen.getAllByRole('textbox');

    await user.clear(emailInput);
    await user.type(emailInput, newEmail);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAxios.patch).toHaveBeenCalledWith(`/api/auth/me?email=${newEmail}`);
      expect(emailInput).toHaveValue(newEmail);
    });
    
  });

  it('should throw a warning toast if the user keeps his email unchanged', async () => {

    const email = SESSION_MOCK.user.email;

    render(
      <>
        <AccountEditEmailForm email={email} />
        <Toaster />
      </>
    );

    const [ emailInput ] = screen.getAllByRole('textbox');

    await user.clear(emailInput);
    await user.type(emailInput, email);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue(email);
      expect(screen.getByText('Pas si vite !')).toBeInTheDocument();
    });
    
  });

  it('should throw an error if the user try to submit an invalid email', async () => {

    const email = SESSION_MOCK.user.email;
    const newEmail = "not_a_valid_email";

    render(
      <>
        <AccountEditEmailForm email={email} />
      </>
    );

    const [ emailInput ] = screen.getAllByRole('textbox');

    await user.clear(emailInput);
    await user.type(emailInput, newEmail);

    const submitButton = screen.getByText('Sauvegarder');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue(newEmail);
      expect(screen.getByText('Veuillez renseigner une adresse mail valide')).toBeInTheDocument();
    });
    
  });

});