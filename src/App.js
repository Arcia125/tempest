import React from 'react';

//Styles
import './App.css';
//Components
import Home from './Home';
import { Logo } from './Logo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      <Home />
    </div>
  );
}

export default App;
