import {browserHistory} from 'react-router';

import Base from './containers/Base';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import Profile from './containers/Profile';
import { firebaseAuth } from './helpers/constants';
import App from './App';

firebaseAuth().onAuthStateChanged((user) => {
  if(user){
    console.log('user',user);
    browserHistory.push('app');
  }
  else {
    console.log('USER', 'LOGGED OUT');
    browserHistory.push('login');
  }
});

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path:'/app',
      component: App
    },

    {
      path:'/profile',
      component:Profile
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    }

  ]
};

export default routes;
