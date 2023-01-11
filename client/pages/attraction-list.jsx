import React from 'react';

export default class AttractionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Destination: '' };
  }

  componentDidMount() {
    fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.props.destination}&inputtype=textquery&fields=formatted_address,name,geometry,photo,place_id&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`)
      .then(res => res.json())
      // .then(mes => console.log(mes))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div><p>Hello Worl</p></div>
    );
  }
}
