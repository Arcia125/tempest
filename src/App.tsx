import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

//Styles
import './App.css';
//Components
import { Logo } from './Logo';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import { Provider } from './lcuData';
import ErrorReporter from './ErrorReporter';

function App() {
  return (
    <Router>
      <ErrorReporter>
        <Provider>
          <div className="App">
            <header className="App-header">
              <Link to="/">
                <Logo />
              </Link>
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
        </Provider>
      </ErrorReporter>
    </Router>
  );
}

export default App;
