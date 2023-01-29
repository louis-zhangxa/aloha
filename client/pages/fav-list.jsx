import React from 'react';
import AppContext from '../lib/app-context';
import FavCard from '../components/fav-card';
import NotFoundPage from './not-found';

export default class FavListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attraction: [] };
  }

  componentDidMount() {
    const req = {
      headers: {
        'X-access-token': window.localStorage.getItem('react-context-jwt')
      }
    };
    fetch(`/api/fav/${this.context.user.userId}`, req)
      .then(res => res.json())
      .then(places => this.setState({ attraction: places }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.attraction[0] !== undefined) {
      return (
        <div>
          <FavCard attraction={this.state.attraction} />
        </div>
      );
    } else {
      return (
        // <div className='no-fav'>
        //   <h1>Oops, nothing here~</h1>
        //   <a href="#">Back to Home</a>
        // </div>
        <NotFoundPage />
      );
    }

  }
}

FavListPage.contextType = AppContext;
