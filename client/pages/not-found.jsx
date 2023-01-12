import React from 'react';

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photoUrl: '' };
  }

  componentDidMount() {
    fetch('https://picsum.photos/600/600')
      .then(res => this.setState({ photoUrl: res.url }))
      .catch(err => console.error('failed', err));
  }

  render() {
    if (window.location.hash !== '#connect') {
      return (
        <div>
          <div className='not-found-page'>
            <img src={this.state.photoUrl} alt="Page not found placeholder" />
            <h2>Oops, The page is gone🛩💨!</h2>
            <a href="#">Back to Home!</a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='not-found-page'>
            <img src={this.state.photoUrl} alt="Contact me placeholder" />
            <h2>Hi! I am Louis Zhang, a full stack developer!</h2>
            <h2>If you want to reachout, please use the email below!</h2>
            <h2>Louiszhangwork@gmail.com</h2>
            <a href="#">Back to Home!</a>
          </div>
        </div>
      );
    }

  }
}
