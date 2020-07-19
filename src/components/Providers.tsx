import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { MemoryRouter as Router } from 'react-router';
import ErrorReporter from './ErrorReporter';
import { apolloClient } from '../apolloClient';
import { Provider as LCUDataProvider } from '../lcuData';
import { Provider as ThemeProvider, ThemeMode } from '../theme';


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
