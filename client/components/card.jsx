import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const placeId = event.target.closest('.attraction-card').getAttribute('itemID');
    window.location.hash = `#attractiondetail?attraction=${placeId}`;
    event.preventDefault();
  }

  // componentDidMount() {
  //   if (this.photo === undefined) {
  //     return;
  //   }
  //   fetch(`/api/photos/${this.photo}`)
  //     .then(res => this.setState({ picture: res.url }))
  //   // this.setState({ picture: res.url }console.log(res.url)
  //   // .then(image => this.setState({ picture: image }))
  //     .catch(err => console.error(err));
  // }

  render() {
    const { name, vicinity, rating } = this.props.location;
    const userRatingTotal = this.props.location.user_ratings_total;
    const placeId = this.props.location.place_id;

    if (this.props.location.photos === undefined) {
      return;
    } else {
      this.photo = this.props.location.photos[0].photo_reference;
    }

    return (
      <li itemID={placeId} className='column-third attraction-card' onClick={this.handleClick}>
        <div className='attraction-info-box'>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${this.photo}&key=AIzaSyCF9bG6U4JFw5LcqXZm-mVh6sdoj7uY1S8`} alt="" />
          <h3>{name}</h3>
          <h4>{vicinity}</h4>
          <h5>rating: {rating} by {userRatingTotal} people</h5>
        </div>
      </li>
    );
  }
}
