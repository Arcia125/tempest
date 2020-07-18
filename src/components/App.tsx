import React, { useContext } from 'react';
import { Switch, Route } from 'react-router';

import './App.css';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import Header from './Header';
import {
  useChampSelect,
  useLobby,
  useMatchMaking,
  useCurrentSummoner,
  useStormScene,
} from '../hooks';
import { themeContext } from '../theme';
import { log, classNames } from '../utils';
import { Providers } from './Providers';

const logEvent = (sender: any, event: any) => log.info(event.uri, event);

const InnerApp = () => {
  // const champSelect = useChampSelect();
  // const lobby = useLobby();
  // const matchMaking =;
  const [elRef] = useStormScene();
  const themeCtx = useContext(themeContext);
  const summoner = useCurrentSummoner();

  const matchMaking = useMatchMaking();

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
    <div className={classNames('App', themeCtx.theme.mode)} ref={elRef as any}>
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

function App() {
  return (
    <Providers>
      <InnerApp />
    </Providers>
  );
}

export { App, Providers };
