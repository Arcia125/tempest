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
import { Provider } from './lcuData';

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
      </ErrorBoundary>
    </Router>
  );d
}

export default App;
