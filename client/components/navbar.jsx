import React from 'react';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalClass: 'modal hidden', iconClass: 'fa-solid fa-bars fa-2x modal-icon' };

    this.modal = this.modal.bind(this);
  }

  modal() {
    if (this.state.modalClass === 'modal hidden') {
      this.setState({ modalClass: 'modal', iconClass: 'fa-solid fa-xmark fa-2x modal-icon' });
    } else {
      this.setState({ modalClass: 'modal hidden', iconClass: 'fa-solid fa-bars fa-2x modal-icon' });
    }
  }

  render() {
    return (
      <div>
        <div className='navbar'>
          <div className='col-33'><i className={this.state.iconClass} onClick={this.modal} /></div>
          <div className='col-33 logo'><a href="#" className='aloha'>Aloha🍍</a></div>
          <div className='col-33' />
        </div>
        <div className={this.state.modalClass}>
          <div className="col-30 modal-self">
            <a onClick={this.modal} href="#login" className='modal-link'>Log In</a>
            <a onClick={this.modal} href="" className='modal-link'>My favorite</a>
            <a onClick={this.modal} href="#signup" className='modal-link'>Sign Up</a>
            <a onClick={this.modal} href="#connect" className='modal-link'>Connect us!</a>
          </div>
          <div className="col-70 modal-hid" onClick={this.modal} />
        </div>
      </div>
    );
  }
}
