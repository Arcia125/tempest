import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

//Styles
import './App.css';
//Components
import { Logo } from './Logo';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import ErrorBoundary from './ErrorBoundary';
import { useErrorMutation } from './operations';

function App() {
  const [reportError, errorMutation] = useErrorMutation();
  return (
    <Router>
      <ErrorBoundary
        onError={(errorState) => {
          console.error(errorState);
          reportError({
            variables: {
              error: JSON.stringify({
                error: JSON.stringify(errorState.error, [
                  ...Object.getOwnPropertyNames(errorState.error),
                ]),
                info: errorState.info,
              }),
            },
          });
        }}
      >
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <Logo />
            </Link>
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
      </ErrorBoundary>
    </Router>
  );
}

export default App;
