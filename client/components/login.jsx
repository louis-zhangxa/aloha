import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { account: '', password: '', message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogIn = this.demoLogIn.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  demoLogIn(event) {
    const demoUser = {
      account: 'Demo',
      password: 'demo1234'
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(demoUser)
    };
    fetch('/api/auth/log-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.token === undefined) {
          this.setState({ account: '', password: '', message: result.error });
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
          window.location.hash = '#';
        }
      })
      .catch(err => console.error(err));
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
    fetch('/api/auth/log-in', req)
      .then(res => res.json())
      .then(result => {
        if (result.token === undefined) {
          this.setState({ account: '', password: '', message: result.error });
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
          window.location.hash = '#';
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='container'>
        <div className='row desktop-user'>
          <div className='column-third user'>
            <h1>Log in</h1>
            <h4>New user? <a href="#signup">Create an account!</a></h4>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="account">Account</label>
              <input type="text" name='account' value={this.state.account} onChange={this.handleChange} required />
              <label htmlFor="password">Password</label>
              <input type="password" name='password' value={this.state.password} onChange={this.handleChange} required />
              <div className='user-button'>
                <button onClick={this.demoLogIn}>Demo</button>
                <button type='submit'>Log in</button>
              </div>
            </form>
            <h4 className='user-message'>{this.state.message}</h4>
          </div>
        </div>
      </div>
    );
  }
}

// console.log('as' + result);
//         // fetch('/api/hello', {
//         //   method: 'GET',
//         //   headers: {
//         //     'x-access-token': result.token
//         //   }
//         // })
//         //   .then(res => res.json())
//         //   .then(mes => console.log(mes));
