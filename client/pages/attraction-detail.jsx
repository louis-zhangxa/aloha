import React from 'react';

export default class AttractionDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attraction: null, photo1: '', photo2: '', photo3: '' };
    this.photos = this.photos.bind(this);
    this.openingHours = this.openingHours.bind(this);
    this.website = this.website.bind(this);
  }

  componentDidMount() {
    fetch(`/api/attraction/${this.props.attraction}`)
      .then(res => res.json())
      .then(detail =>
        this.setState({
          attraction: detail.result,
          photo1: detail.result.photos[0].photo_reference,
          photo2: detail.result.photos[1].photo_reference,
          photo3: detail.result.photos[2].photo_reference
        })
      )
      .catch(err => console.error(err));
  }

  photos() {
    const attraction = this.state.attraction;
    if (attraction.photo3 !== '') {
      return (
        <div className='row attraction-photo'>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${this.state.photo1}&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`} alt="" />
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${this.state.photo2}&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`} alt="" />
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${this.state.photo3}&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`} alt="" />
        </div>
      );
    }
  }

  openingHours() {
    const attraction = this.state.attraction;
    if (attraction.opening_hours !== undefined) {
      return (
        <div>
          <h3>Opening Hours</h3>
          <ul>
            <li>{attraction.opening_hours.weekday_text[0]}</li>
            <li>{attraction.opening_hours.weekday_text[1]}</li>
            <li>{attraction.opening_hours.weekday_text[2]}</li>
            <li>{attraction.opening_hours.weekday_text[3]}</li>
            <li>{attraction.opening_hours.weekday_text[4]}</li>
            <li>{attraction.opening_hours.weekday_text[5]}</li>
            <li>{attraction.opening_hours.weekday_text[6]}</li>
          </ul>
        </div>
      );
    }
  }

  website() {
    const attraction = this.state.attraction;
    if (attraction.website !== undefined) {
      return (
        <div>
          <h3>Official Website</h3>
          <a href={attraction.website}>{attraction.name}</a>
        </div>
      );
    }
  }

  render() {
    if (this.state.photo3 !== '') {
      const attraction = this.state.attraction;
      return (
        <div>
          {this.photos()}
          <div className='row attraction-info'>
            <h1>{attraction.name}</h1>
            <div className='column-half left-info'>
              <h3>Address:</h3>
              <p>{attraction.formatted_address}</p>
              {this.openingHours()}
              {this.website()}
            </div>
            <div className='column-half right-info'>
              <h3>Rating from Google: {attraction.rating}</h3>
              <h3>Reviews from google</h3>
              <p>{attraction.reviews[0].text} by {attraction.reviews[0].author_name}</p>
              <p>{attraction.reviews[1].text} by {attraction.reviews[1].author_name}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
