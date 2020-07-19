import * as serviceWorker from './serviceWorker';
import { App } from './components/App';
import { createRenderer } from './utils';
import { Providers } from './components/Providers';
import './index.css';

const root = document.getElementById('root');

const render = createRenderer(Providers, root);

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./components/App', () => {
    console.log('App hot reload', window.location.href);
    const NextApp = require('./components/App').App;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
