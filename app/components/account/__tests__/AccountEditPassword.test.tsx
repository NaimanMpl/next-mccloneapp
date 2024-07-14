import { SESSION_MOCK } from "@/__mocks__/axios";
import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import { useSession } from "next-auth/react";
import AccountEditPasswordForm from "../AccountEditPasswordForm";

jest.mock('next-auth/react');

describe('<AccountEditPassword />', () => {

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: SESSION_MOCK, update: jest.fn() });
  });

  it('should render successfully', () => {

    const form = render(
      <AccountEditPasswordForm />
    );

    expect(form).toMatchSnapshot();

  });

  it('should not submit the form if password doesnt match', async () => {

    const oldPassword = 'secret';
    const newPassword = 'secretpassword';
    const newConfirmPassword = 'notamatchingpassword';

    render(
      <AccountEditPasswordForm />
    );

    const [ oldPasswordInput, newPasswordInput, confirmNewPasswordInput ] = screen.getAllByPlaceholderText('•••••••••••••');
    const submitButton = screen.getByRole('button');

    await user.type(oldPasswordInput, oldPassword);
    await user.type(newPasswordInput, newPassword);
    await user.type(confirmNewPasswordInput, newConfirmPassword);

    await user.click(submitButton);

  });

});