import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

//Styles
import './App.css';
//Components
import Home from './Home';
import { Logo } from './Logo';

const GET_INFO = gql`
  {
    info
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_INFO);
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      {JSON.stringify(data)}
      <Home />
    </div>
  );
}

export default App;
