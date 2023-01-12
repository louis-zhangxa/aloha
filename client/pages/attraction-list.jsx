import React from 'react';
import AttractionCard from '../components/attraction-card';

export default class AttractionListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attraction: [] };
  }

  componentDidMount() {
    fetch(`/api/list/${this.props.destination}`)
      .then(res => res.json())
      .then(attractions => this.setState({ attraction: attractions.results }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <AttractionCard attraction={this.state.attraction}/>
      </div>
    );
  }
}
