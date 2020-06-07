import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    fetch('http://localhost:5000/users/logout', {
      method: 'GET',
      credentials: 'include',
    }).then(res => {
      this.props.userStatusChanged(false, "");
    });
  }

  render() {
    let loginComponent = (
      <li className="navbar-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    );

    if (this.props.isLoggedIn) {
      loginComponent = (
        <li className="navbar-item">
          <div onClick={this.onLogout} className="nav-link">Logout ({this.props.username})</div>
        </li>
      );
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Images</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {loginComponent}
          </ul>
        </div>
      </nav>
    )
  }
}
