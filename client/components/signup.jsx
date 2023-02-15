import React from 'react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: '', password: '', username: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        if (result.userName === undefined) {
          this.setState({ account: '', password: '', username: 'Sorry, this username is not avaliable' });
        } else {
          this.setState({ account: '', password: '', username: `Success! Your user name is ${result.userName}` });
        }
      })
      .catch(err => console.error(err));
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
              <input type="text" name='account' value={this.state.account} onChange={this.handleChange} required />
              <label htmlFor="password">Password</label>
              <input type="password" name='password' value={this.state.password} onChange={this.handleChange} required />
              <div className='user-button sign-up'>
                <button type='submit'>Sign up</button>
              </div>
            </form>
            <h4 className='user-message'>{this.state.username}</h4>
          </div>
        </div>
      </div>
    );
  }
}
