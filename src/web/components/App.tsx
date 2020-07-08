import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';

import { apolloClient } from '../../apolloClient';
import ErrorReporter from '../../components/ErrorReporter';
import SearchPage from '../../components/SearchPage';
import ProfilePage from '../../components/ProfilePage';
import { Header } from './Header';
import { useStormScene } from '../../hooks';

const InnerApp = () => {
  const [elRef] = useStormScene();
  return (
    <div className="App" ref={elRef as any}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <SearchPage variant="window" />
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
      <ErrorReporter>{children}</ErrorReporter>
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
