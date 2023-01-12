import React from 'react';
import Card from './card';

export default function AttractionCard(props) {
  const listItems = props.attraction.map(location => (
    <Card location={location} key={location.place_id} />
  ));
  return (
    <ul className='row'>
      {listItems}
    </ul>
  );
}
