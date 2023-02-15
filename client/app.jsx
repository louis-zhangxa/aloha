import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import changeBackground from './lib/change-background';
import Navbar from './components/navbar';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import AttractionListPage from './pages/attraction-list';
import FavListPage from './pages/fav-list';
import AttractionDetailPage from './pages/attraction-detail';
import User from './pages/user';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    // console.log(this.state.user);
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
    window.location.hash = '#';
  }

  renderPage() {
    const { route } = this.state;
    changeBackground(route.path);
    if (route.path === '') {
      return <HomePage />;
    }
    if (route.path === 'attractions') {
      const destination = route.params.get('destination');
      return <AttractionListPage destination={destination} />;
    }
    if (route.path === 'favlist') {
      return <FavListPage />;
    }
    if (route.path === 'attractiondetail') {
      const attraction = route.params.get('attraction');
      return <AttractionDetailPage attraction={attraction} />;
    }
    if (route.path === 'login' || route.path === 'signup') {
      return <User />;
    }
    return <NotFoundPage />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <>
          <Navbar />
          {this.renderPage()}
        </>
      </AppContext.Provider>

    );
  }
}
