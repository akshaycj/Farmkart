import React, { Component } from 'react'
import {Route, BrowserRouter,Switch} from 'react-router-dom'

import Base from './containers/Base';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Profile from './containers/Profile';
import { firebaseAuth } from './helpers/constants';
import App from './App';



export default class  extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
            <Base>
            <Switch>
                <Route exact path="/app" component={App} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/signup" component={SignUpPage} />
            </Switch>
            </Base>
        </BrowserRouter>
      </div>
    )
  }
}
