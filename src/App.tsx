import React, { useEffect } from 'react';
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
const { ipcRenderer } = window.require('electron');

const lcuContext = React.createContext({});

function App() {
  const [reportError, errorMutation] = useErrorMutation();
  useEffect(() => {
    const handleLcuData: (event: any, ...args: any[]) => void = (
      event,
      data
    ) => {
      console.log(event, data);
    };
    ipcRenderer.on('lcu-data', handleLcuData);
    ipcRenderer.send('get-lcu-data', '');
    return () => {
      ipcRenderer.off('lcu-data', handleLcuData);
    };
  }, []);

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
