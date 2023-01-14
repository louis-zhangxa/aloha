import React from 'react';
import FavCardRender from './fav-card-render';

export default function FavCard(props) {
  const listItems = props.attraction.map(location => (
    <FavCardRender location={location} key={location.placeId} />
  ));
  return (
    <ul className='row attraction-card-list'>
      {listItems}
    </ul>
  );
}
