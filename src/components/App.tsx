import React, { FC } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import ErrorReporter from './ErrorReporter';
import Header from './Header';
import useChampSelect from '../useChampSelect';
import { useLobby } from '../lobby';
import { useCurrentSummoner } from '../currentSummoner';
import { Provider } from '../lcuData';
import { useMatchMaking } from '../matchMaking';
import { apolloClient } from '../apolloClient';

const log = window.require('electron-log');

const logEvent = (sender: any, event: any) => log.info(event.uri, event);
const InnerApp = () => {
  const champSelect = useChampSelect();
  const lobby = useLobby();
  // const matchMaking =;
  const summoner = useCurrentSummoner();

  const matchMaking = useMatchMaking();

  log.debug(matchMaking);

  // useEventEffect(getPlugin('matchMaking').name, logEvent);
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
      <Header summoner={summoner.state.data} matchMaking={matchMaking.state} />
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
      <ErrorReporter>
        <Provider>{children}</Provider>
        {/* {children} */}
      </ErrorReporter>
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
