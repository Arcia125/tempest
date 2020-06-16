import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';

//Styles
import './App.css';
//Components
import { Logo } from './Logo';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Logo />
        </header>
        <Switch>
          <Route path="/summoner/profile/:summonerName">
            <ProfilePage />
          </Route>
          <Route path="/" exact>
            <SearchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
