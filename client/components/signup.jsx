import React from 'react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: '', password: '' };

    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAccountChange(event) {
    this.setState({ account: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    alert(this.state.password + ' and ' + this.state.password);
    // window.location.hash = `#attractions?destination=${this.state.destination}`;
    event.preventDefault();
  }

  render() {
    return (
      <div className='container'>
        <div className='row desktop-user'>
          <div className='column-third user'>
            <h1>Sign up</h1>
            <h4>Already got account? <a href="#login">Log in!</a></h4>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="account">Account</label>
              <input type="text" name='account' value={this.state.account} onChange={this.handleAccountChange} required />
              <label htmlFor="password">Password</label>
              <input type="password" name='password' value={this.state.password} onChange={this.handlePasswordChange} required />
              <div className='user-button'>
                <button type='submit'>Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
