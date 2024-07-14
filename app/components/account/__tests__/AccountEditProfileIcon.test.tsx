import { SESSION_MOCK } from "@/__mocks__/axios";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import AccountEditProfileIcon from "../AccountEditProfileIcon";

jest.mock('next-auth/react');

describe('<AccountEditProfileIcon />', () => {

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: SESSION_MOCK });
  });

  it('should render successfully', () => {

    const profileIconUrl = SESSION_MOCK.user.profileIconUrl;

    const form = render(
      <AccountEditProfileIcon profileIconUrl={profileIconUrl} />
    );

    const profileIcon: HTMLImageElement = screen.getByRole('img');

    expect(form).toMatchSnapshot();
    expect(profileIcon.src).toBe(profileIconUrl);
  });

 });