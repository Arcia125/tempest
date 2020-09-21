import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './Header';
import { Legal } from './Legal';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import { useCurrentSummoner, useMatchMaking, useStormScene } from '../hooks';
import { themeContext } from '../theme';
import { classNames, log } from '../utils';
import Footer from './Footer';

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
      <div className="App-scrollArea">
        <Header
          summoner={summoner.state.data}
          matchMaking={matchMaking.state}
        />
        <Switch>
          <Route path="/" exact>
            <SearchPage />
          </Route>
          <Route path="/summoner/profile/:region/:summonerName">
            <ProfilePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return <InnerApp />;
}

export { App };
