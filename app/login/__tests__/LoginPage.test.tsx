import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { signIn } from 'next-auth/react';
import LoginForm from '../page';

jest.mock('next-auth/react');

describe('<LoginForm />', () => {
  it('should render successfully', () => {
    const loginForm = render(<LoginForm />);

    expect(loginForm).toMatchSnapshot();
  });

  it('should shows an error message if API call fails', async () => {
    (signIn as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch users !')
    );

    render(<LoginForm />);

    const [emailInput] = screen.getAllByRole('textbox');

    await user.clear(emailInput);
    await user.type(emailInput, 'john.doe@domain.com');

    const loginBtn = screen.getByText('Connexion');
    await user.click(loginBtn);

    await waitFor(() => {
      expect(
        screen.getByText('Le serveur a rencontré un problème.')
      ).toBeInTheDocument();
    });
  });

  it('should show redirect the user if user gives valid credentials', async () => {
    (signIn as jest.Mock).mockResolvedValue({});

    render(<LoginForm />);

    const [emailInput] = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('•••••••••••••');

    await user.clear(emailInput);
    await user.type(emailInput, 'john.doe@domain.com');

    await user.clear(passwordInput);
    await user.type(passwordInput, 'password');

    const loginBtn = screen.getByText('Connexion');
    await user.click(loginBtn);

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
    });
  });
});
