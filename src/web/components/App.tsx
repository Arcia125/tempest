import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC, useContext } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header';
import { apolloClient } from '../../apolloClient';
import '../../components/App.css';
import ErrorReporter from '../../components/ErrorReporter';
import ProfilePage from '../../components/ProfilePage';
import SearchPage from '../../components/SearchPage';
import { useStormScene } from '../../hooks';
import { Provider, themeContext, ThemeMode } from '../../theme';
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
  return <InnerApp />;
}

export { App, Providers };
