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
    return (
      <div>
        <div className='not-found-page'>
          <img src={this.state.photoUrl} alt="Page not found placeholder" />
          <h2>Oops, The page is gone🛩💨!</h2>
          <a href="#">Back to Home!</a>
        </div>
      </div>
    );
  }
}
