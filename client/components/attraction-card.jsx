import React from 'react';
import Card from './card';

export default function AttractionCard(props) {
  if (!props.attraction[0]) {
    return (
      <h1>Loading....</h1>
    );
  } else {
    const listItems = props.attraction.map(location => (
      <Card location={location} key={location.place_id} />
    ));
    return (
      <ul className='row attraction-card-list'>
        {listItems}
      </ul>
    );
  }
}
