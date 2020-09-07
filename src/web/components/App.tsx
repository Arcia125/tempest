import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC, Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header';
import { apolloClient } from '../../apolloClient';
import AnimatedSpinner from '../../components/AnimatedSpinner';
import '../../components/App.css';
import ErrorReporter from '../../components/ErrorReporter';
import { Legal } from '../../components/Legal';
import SearchPage from '../../components/SearchPage';
import { useStormScene, useAnalytics } from '../../hooks';
import { Provider, themeContext, ThemeMode } from '../../theme';
import { classNames } from '../../utils';

const ProfilePage = React.lazy(() => import('../../components/ProfilePage'));

const InnerApp = () => {
  const [elRef] = useStormScene();
  const themeCtx = useContext(themeContext);
  useAnalytics();
  return (
    <div
      className={classNames('App', 'App-web', themeCtx.theme.mode)}
      ref={elRef as any}
    >
      <Header />
      <Switch>
        <Route path="/" exact>
          <SearchPage />
        </Route>
        <Route path="/summoner/profile/:summonerName">
          <Suspense fallback={<AnimatedSpinner />}>
            <ProfilePage />
          </Suspense>
        </Route>
      </Switch>
      <Legal />
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
