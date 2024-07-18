import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn()
}));

beforeAll(() => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: (key: string) => {
      if (key === 'page') return '1';
      return null;
    }
  });
});