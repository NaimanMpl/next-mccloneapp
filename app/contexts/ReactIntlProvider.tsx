'use client';
import { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

const ReactIntlProvider = ({ children }: { children: ReactNode }) => {
  return <IntlProvider locale='fr'>{children}</IntlProvider>;
};

export default ReactIntlProvider;
