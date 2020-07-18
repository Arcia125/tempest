import React from 'react';
import ReactDOM from 'react-dom';

import '../index.css';
import { App, Providers } from './components/App';
import * as serviceWorker from '../serviceWorker';
import { createRenderer } from '../utils';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = document.getElementById('root');
const render = createRenderer(Providers, root);

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./components/App', () => {
    console.log(
      '%cApp hot reload',
      `
        font-size: 60px;
        color: #fcb11a;
        font-family: sans-serif;
        text-align: center;
    `
    );
    const NextApp = require('./components/App').App;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
