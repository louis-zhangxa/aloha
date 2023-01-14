import React from 'react';
import AppContext from '../lib/app-context';
import FavCard from '../components/fav-card';

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
    return (
      <div>
        <FavCard attraction={this.state.attraction} />
      </div>
    );
  }
}

FavListPage.contextType = AppContext;
