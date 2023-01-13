import React from 'react';
import Signup from '../components/signup';
import Login from '../components/login';

export default class User extends React.Component {
  render() {
    if (window.location.hash === '#signup') {
      return (
        <Signup />
      );
    } else if (window.location.hash === '#login') {
      return (
        <Login />
      );
    }
  }
}
