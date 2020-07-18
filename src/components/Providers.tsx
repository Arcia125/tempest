import React, { FC } from 'react';
import { MemoryRouter as Router } from 'react-router';
import { ApolloProvider } from '@apollo/react-hooks';

import ErrorReporter from './ErrorReporter';
import { Provider as LCUDataProvider } from '../lcuData';
import { Provider as ThemeProvider, ThemeMode } from '../theme';
import { apolloClient } from '../apolloClient';

export const Providers: FC = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <ThemeProvider initialThemeMode={ThemeMode.DARK_GPU}>
        <ErrorReporter>
          <LCUDataProvider>{children}</LCUDataProvider>
        </ErrorReporter>
      </ThemeProvider>
    </Router>
  </ApolloProvider>
);
