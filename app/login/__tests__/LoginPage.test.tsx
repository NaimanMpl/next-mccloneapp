import mockAxios from '@/__mocks__/axios';
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AxiosError, AxiosResponse } from 'axios';
import LoginForm from '../page';

jest.mock('axios');

describe('<LoginForm />', () => {

  afterEach(() => {
    mockAxios.reset();
  })

  it('should render successfully', () => {
    const loginForm = render(
      <LoginForm />
    );

    expect(loginForm).toMatchSnapshot();
  });

  it('should shows an error message if API call fails', async () => {

    mockAxios.post.mockRejectedValue(new Error("Failed to fetch users !"));

    render(
      <LoginForm />
    );

    const [ emailInput ] = screen.getAllByRole('textbox');

    await user.clear(emailInput);
    await user.type(emailInput, "john.doe@domain.com");

    const loginBtn = screen.getByText('Connexion');
    await user.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Le serveur a rencontré un problème.')).toBeInTheDocument();
    });

  });

  it('should shows an error message if API call fails', async () => {

    const error = {
      response: {
        data: {
          message: 'Veuillez remplir tout les champs.'
        }
      }
    } as AxiosError;

    mockAxios.post.mockRejectedValue(error);

    render(
      <LoginForm />
    );

    const [ emailInput ] = screen.getAllByRole('textbox');

    await user.clear(emailInput);
    await user.type(emailInput, "john.doe@domain.com");

    const loginBtn = screen.getByText('Connexion');
    await user.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByText('Veuillez remplir tout les champs.')).toBeInTheDocument();
    });

  });

  it('should show redirect the user if user gives valid credentials', async () => {

    mockAxios.post.mockResolvedValue({});

    render(
      <LoginForm />
    );

    const [ emailInput ] = screen.getAllByRole('textbox');
    const passwordInput = screen.getByPlaceholderText('•••••••••••••');

    await user.clear(emailInput);
    await user.type(emailInput, "john.doe@domain.com");

    await user.clear(passwordInput);
    await user.type(passwordInput, 'password');

    const loginBtn = screen.getByText('Connexion');
    await user.click(loginBtn);

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
    });

  });

});