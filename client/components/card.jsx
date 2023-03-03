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
          <img src={`/api/image/${this.photo}`} alt="" />
          <h3>{name}</h3>
          <h4>{vicinity}</h4>
          <h5>Rated: {rating} by {userRatingTotal} people</h5>
        </div>
      </li>
    );
  }
}
