import React from 'react';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { destination: '' };

    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDestinationChange(event) {
    this.setState({ destination: event.target.value });
  }

  handleSubmit(event) {
    alert(this.state.destination);
    event.preventDefault();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-full'>
            <form className='home-page' onSubmit={this.handleSubmit}>
              <label htmlFor="destination">WHERE TO GO?</label>
              <input type="text" name='destination' placeholder='Enter Your Destination!' value={this.state.destination} onChange={this.handleDestinationChange} />
              <button type='submit'>Lets Go!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
