import React, { FC, useContext } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import '../../components/App.css';

import { apolloClient } from '../../apolloClient';
import ErrorReporter from '../../components/ErrorReporter';
import SearchPage from '../../components/SearchPage';
import ProfilePage from '../../components/ProfilePage';
import { Header } from './Header';
import { useStormScene } from '../../hooks';
import { Provider, ThemeMode, themeContext } from '../../theme';
import { classNames } from '../../utils';

const InnerApp = () => {
  const [elRef] = useStormScene();
  const themeCtx = useContext(themeContext);
  return (
    <div className={classNames('App', themeCtx.theme.mode)} ref={elRef as any}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <SearchPage />
        </Route>
        <Route path="/summoner/profile/:summonerName">
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
};

const Providers: FC = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <Provider initialThemeMode={ThemeMode.DARK_GPU}>
        <ErrorReporter>{children}</ErrorReporter>
      </Provider>
    </Router>
  </ApolloProvider>
);

function App() {
  return (
    <Providers>
      <InnerApp />
    </Providers>
  );
}

export default App;
