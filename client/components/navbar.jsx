import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalClass: 'modal hidden', iconClass: 'fa-solid fa-bars fa-2x modal-icon' };

    this.modal = this.modal.bind(this);
  }

  modal() {
    if (this.state.modalClass === 'modal hidden') {
      this.setState({ modalClass: 'modal' });
      this.setState({ iconClass: 'fa-solid fa-xmark fa-2x modal-icon' });
    } else {
      this.setState({ modalClass: 'modal hidden' });
      this.setState({ iconClass: 'fa-solid fa-bars fa-2x modal-icon' });
    }
  }

  render() {
    return (
      <div>
        <div className='navbar'>
          <div className='column-third'><i className={this.state.iconClass} onClick={this.modal} /></div>
          <div className='column-third logo'><button>Aloha🍍</button></div>
          <div className='column-third' />
        </div>
        <div className={this.state.modalClass}>
          <div className="col-30 modal-self">
            <button className='modal-button'>Log In</button>
            <button className='modal-button'>My favorite</button>
            <button className='modal-button'>Sign Out</button>
            <button className='modal-button'>Connect us!</button>
          </div>
          <div className="col-70 modal-hid" onClick={this.modal} />
        </div>
      </div>
    );
  }
}
