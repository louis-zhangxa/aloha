import React from 'react';
import Navbar from './components/navbar';
import HomePage from './pages/home';
import NotFoundPage from './pages/not-found';
import AttractionListPage from './pages/attraction-list';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <HomePage />;
    }
    if (route.path === 'attractions') {
      const destination = route.params.get('destination');
      return <AttractionListPage destination={destination} />;
    }
    return <NotFoundPage />;
  }

  render() {
    return (
      <>
        <Navbar />
        {/* <NotFound /> */}
        {this.renderPage()}
      </>
    );
  }
}
