import React from 'react';

export default class FavCardRender extends React.Component {
  constructor(props) {
    super(props);

    this.state = { photo1: '', locationName: null, address: null, rating: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const placeId = event.target.closest('.attraction-card').getAttribute('itemID');
    window.location.hash = `#attractiondetail?attraction=${placeId}`;
    event.preventDefault();
  }

  componentDidMount() {
    fetch(`/api/attraction/${this.props.location.placeId}`)
      .then(res => res.json())
      .then(detail =>
        this.setState({
          photo1: detail.result.photos[0].photo_reference,
          locationName: detail.result.name,
          address: detail.result.formatted_address,
          rating: detail.result.rating
        })
      )
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.photo1 !== '') {
      return (
        <li itemID={this.props.location.placeId} className='column-third attraction-card' onClick={this.handleClick}>
          <div className='attraction-info-box'>
            <img src={`/api/image/${this.state.photo1}`} alt="" />
            <h3>{this.state.locationName}</h3>
            <h4>{this.state.address}</h4>
            <h5>rating: {this.state.rating}</h5>
          </div>
        </li>
      );
    }
  }
}
