import React from 'react';
import AppContext from '../lib/app-context';

export default class AttractionDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attraction: null, photo1: '', photo2: '', photo3: '', classHeart: '', classPen: 'row attraction-info', comment: 'attraction-comment hidden', favoriteId: null, userComment: '', deleted: '' };
    this.photos = this.photos.bind(this);
    this.openingHours = this.openingHours.bind(this);
    this.website = this.website.bind(this);
    this.userFunction = this.userFunction.bind(this);
    this.saveAttraction = this.saveAttraction.bind(this);
    this.startComment = this.startComment.bind(this);
    this.stopComment = this.stopComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    this.commentDelete = this.commentDelete.bind(this);
  }

  componentDidMount() {
    if (this.context.user) {
      const info = { placeId: this.props.attraction, userId: this.context.user.userId };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-access-token': window.localStorage.getItem('react-context-jwt')
        },
        body: JSON.stringify(info)
      };
      fetch('/api/fav/data', req)
        .then(res => res.json())
        .then(msg => {
          if (msg !== 'Not exist') {
            this.setState({ classHeart: 'save', favoriteId: msg.favoriteId });
          }
        })
        .catch(err => console.error(err));
      fetch('/api/comment/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-access-token': window.localStorage.getItem('react-context-jwt')
        },
        body: JSON.stringify(info)
      })
        .then(res => {
          return res.json();
        })
        .then(comment => {
          if (comment.error === undefined) {
            this.setState({ userComment: comment, usercomment: comment });
          }
        })
        .catch(err => console.error(err));

    }
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

  comment() {
    return (
      <div className={this.state.comment}>
        <h1>My comments</h1>
        <form action="" onSubmit={this.commentSubmit}>
          <textarea name="usercomment" id="comment" cols="30" rows="10" value={this.state.usercomment} onChange={this.handleChange} required/>
          <div className='comment-save'>
            <button type='submit' className='save-button'>SAVE</button>
          </div>
        </form>
        <div className='comment-action'>
          <button className='delete-button' onClick={this.commentDelete}>DELETE</button>
          <button className='back-button' onClick={this.stopComment}>Back</button>
        </div>
        <h3>{this.state.deleted}</h3>
      </div>
    );
  }

  showComment() {
    if (this.state.userComment !== '') {
      return (
        <div>
          <h3>My Comment</h3>
          <p>{this.state.userComment}</p>
        </div>
      );
    }
  }

  userFunction() {
    if (this.context.user) {
      return (
        <div className='user-function'>
          <button onClick={this.saveAttraction} className={this.state.classHeart}><i className='fa-solid fa-heart' /></button>
          <button onClick={this.startComment}><i className="fa-solid fa-pen-nib" /></button>
        </div>
      );
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  startComment() {
    this.setState({ classPen: 'row attraction-info hidden', comment: 'attraction-comment', deleted: '' });
  }

  stopComment() {
    this.setState({ classPen: 'row attraction-info', comment: 'attraction-comment hidden' });
  }

  commentSubmit(event) {
    event.preventDefault();
    const info = { placeId: this.props.attraction, userId: this.context.user.userId, comment: this.state.usercomment };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-access-token': window.localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(info)
    };
    fetch('/api/comment/upload', req)
      .then(res => res.json())
      .then(msg => {
        this.setState({ userComment: msg, classPen: 'row attraction-info', comment: 'attraction-comment hidden' });
      })
      .catch(err => console.error(err));
  }

  commentDelete(event) {
    const info = { placeId: this.props.attraction, userId: this.context.user.userId, comment: this.state.usercomment };
    const req = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-access-token': window.localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(info)
    };
    fetch('/api/comment/delete', req)
      .then(res => res.json())
      .then(msg => this.setState({ deleted: msg, userComment: '', usercomment: '' }))
      .catch(err => console.error(err));
  }

  saveAttraction() {
    const info = { placeId: this.props.attraction, userId: this.context.user.userId };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-access-token': window.localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(info)
    };
    fetch('/api/fav/upload', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.deleteAttraction(info.placeId, info.userId);
        } else {
          this.setState({ classHeart: 'save' });
        }
      })
      .catch(err => console.error(err));
  }

  deleteAttraction(placeId, userId) {
    const info = { placeId, userId };
    const req = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-access-token': window.localStorage.getItem('react-context-jwt')
      },
      body: JSON.stringify(info)
    };
    fetch('/api/fav/delete', req)
      .then(this.setState({ classHeart: '' }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.photo3 !== '') {
      const attraction = this.state.attraction;
      return (
        <div>
          {this.photos()}
          {this.comment()}
          <div className={this.state.classPen}>
            <h1>{attraction.name}</h1>
            {this.userFunction()}
            <div className='column-half left-info'>
              <h3>Address:</h3>
              <p>{attraction.formatted_address}</p>
              {this.openingHours()}
              {this.website()}
            </div>
            <div className='column-half right-info'>
              <h3>Rating from Google: {attraction.rating}</h3>
              <h3>Reviews from google</h3>
              <p>&#34;{attraction.reviews[0].text}&#34; by {attraction.reviews[0].author_name}</p>
              <p>&#34;{attraction.reviews[1].text}&#34; by {attraction.reviews[1].author_name}</p>
              {this.showComment()}
            </div>
          </div>
        </div>
      );
    }
  }
}

AttractionDetailPage.contextType = AppContext;
