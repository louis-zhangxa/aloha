import React from 'react';
import AppContext from '../lib/app-context';
import Signup from '../components/signup';
import Login from '../components/login';

export default class User extends React.Component {
  render() {
    const { handleSignIn } = this.context;
    if (window.location.hash === '#signup') {
      return (
        <Signup />
      );
    } else if (window.location.hash === '#login') {
      return (
        <Login onSignIn={handleSignIn} />
      );
    }
  }
}

User.contextType = AppContext;
