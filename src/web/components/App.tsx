import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import '../../components/App.css';

// import { Provider } from '../lcuData';
import { apolloClient } from '../../apolloClient';
import ErrorReporter from '../../components/ErrorReporter';
import SearchPage from '../../components/SearchPage';

const InnerApp = () => {
  return (
    <div className="App">
      {/* <Header summoner={summoner.state.data} matchMaking={matchMaking.state} /> */}
      <Switch>
        <Route path="/" exact>
          <SearchPage />
        </Route>
        {/* <Route path="/summoner/profile/:summonerName">
          <ProfilePage />
        </Route> */}
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
