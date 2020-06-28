import React, { FC } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

import './App.css';
import { Logo } from './Logo';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import ErrorReporter from './ErrorReporter';
import useChampSelect from './useChampSelect';
import { useEventEffect } from './useEventEffect';
import { useLobby } from './lobby';

const logEvent = (sender: any, event: any) => console.log(event.uri, event);
const InnerApp = () => {
  const champSelect = useChampSelect();
  const lobby = useLobby();

  // useEventEffect('lol-matchmaking', logEvent);
  // useEventEffect('lol-champ-select', logEvent);
  // useEventEffect('lol-gameflow', logEvent);

  // useEventEffect('lol-patch', logEvent);
  // useEventEffect('patcher', logEvent);
  // useEventEffect('lol-game-client-chat', logEvent);
  // useEventEffect('lol-chat', logEvent);
  // useEventEffect('lol-hovercard', logEvent);
  // useEventEffect('lol-clubs-public', logEvent);
  // useEventEffect('lol-suggested-players', logEvent);

  // useEventEffect('lol-lobby', logEvent);
  // useEventEffect('lol-lobby-team-builder', logEvent);

  // useEventEffect('lol-clash', logEvent);
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
