import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { browserHistory, Router } from 'react-router';
import LoginPage from './containers/LoginPage';
import routes from './routes';

injectTapEventPlugin();

const muiTheme =getMuiTheme({
  palette:{
    primary1Color:'#259b24',
    primary2Color:'#0a7e07',
    accent1Color:'#b2ff59',

  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>,
  document.getElementById('root')
);
