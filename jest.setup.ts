import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { TextEncoder } from 'node:util';
import { SESSION_MOCK } from './testing/__mocks__/axios';

jest.mock('next-auth/react');
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
  (useSession as jest.Mock).mockReturnValue({ data: SESSION_MOCK, update: jest.fn() });
});