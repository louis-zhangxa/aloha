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
    if (window.location.hash === '#noattractions') {
      return (
        <div>
          <div className='not-found-page'>
            <img src={this.state.photoUrl} alt="Page not found placeholder" />
            <h2>Oops, We can&#39;t find anything!</h2>
            <a href="#">Back to Home!</a>
          </div>
        </div>
      );
    }
    if (window.location.hash === '#favlist') {
      return (
        <div>
          <div className='not-found-page'>
            <img src={this.state.photoUrl} alt="Page not found placeholder" />
            <h2>Oops, nothing here~</h2>
            <a href="#">Back to Home!</a>
          </div>
        </div>
      );
    }
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
            <a href="mailto:Louiszhangwork@gmail.com" id='email'>Louiszhangwork@gmail.com</a>
            <a href="#">Back to Home!</a>
          </div>
        </div>
      );
    }

  }
}
