import React, { FC } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import './App.css';
import { Logo } from './Logo';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import ErrorReporter from './ErrorReporter';
import useChampSelect from './useChampSelect';

const InnerApp = () => {
  const champSelect = useChampSelect();
  return (
    <div className="App">
      <header className="App-header">
        {/* <Link to="/">
          <Logo />
        </Link> */}
      </header>
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
  <Router>
    <ErrorReporter>
      {/* <Provider>{children}</Provider> */}
      {children}
    </ErrorReporter>
  </Router>
);

function App() {
  return (
    <Providers>
      <InnerApp />
    </Providers>
  );
}

export default App;
