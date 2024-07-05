import { render, screen } from '@testing-library/react';
import HowItWorkCard from '../HowItWorkCard';

describe('<HowItWorkCard />', () => {
  it('should render sucessfully', () => {
    const screen = render(<HowItWorkCard />);

    expect(screen).toMatchSnapshot();
  })
});