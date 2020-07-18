import './index.css';
import { App } from './components/App';
import { Providers } from './components/Providers';
import * as serviceWorker from './serviceWorker';
import { createRenderer } from './utils';

const root = document.getElementById('root');

const render = createRenderer(Providers, root);

render(App);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

if ((module as any).hot) {
  (module as any).hot.accept('./components/App', () => {
    console.log('App hot reload');
    const NextApp = require('./components/App').App;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
