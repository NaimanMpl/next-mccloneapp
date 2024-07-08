import mockAxios from "@/__mocks__/axios";
import { render, screen, waitFor } from "@testing-library/react";
import user from '@testing-library/user-event';
import { isEmailAvailable, isUsernameAvailable } from '../../services/authservice';
import RegisterPage from "../page";

jest.mock('axios');
jest.mock('../../services/authservice');

describe('<RegisterPage />', () => {

  it('should render successfully', () => {
    const registerPage = render(
      <RegisterPage />
    );

    expect(registerPage).toMatchSnapshot();
  });

  /*
  it('should shows an error message if API call fails', async () => {

    mockAxios.post.mockRejectedValueOnce(new Error('Failed to fetch API !'));
    (isEmailAvailable as jest.Mock).mockResolvedValueOnce(true);
    (isUsernameAvailable as jest.Mock).mockResolvedValueOnce(true);

    render(
      <RegisterPage />
    );

    const [ usernameInput, emailInput ] = screen.getAllByRole('textbox');
    const [ passwordInput, confirmPasswordInput ] = screen.getAllByPlaceholderText('•••••••••••••');

    await user.clear(usernameInput);
    await user.clear(emailInput);
    await user.clear(passwordInput);
    await user.clear(confirmPasswordInput);

    await user.type(usernameInput, 'John Doe');
    await user.type(emailInput, 'johndoe@domain.com');
    await user.type(passwordInput, 'password');
    await user.type(confirmPasswordInput, 'password');

    const registerBtn = screen.getByRole('button');
    await user.click(registerBtn);

    await waitFor(() => {
      expect(screen.getByText('Le serveur a rencontré un problème.')).toBeInTheDocument();
    });

  });
  */

});