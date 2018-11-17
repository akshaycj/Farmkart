import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Home from './Home'


const muiTheme =getMuiTheme({
  palette:{
    primary1Color:'#259b24',
    primary2Color:'#0a7e07',
    accent1Color:'#b2ff59',

  },
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Home />
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
