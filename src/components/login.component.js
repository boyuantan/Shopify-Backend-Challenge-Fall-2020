import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);

    this.state = {};
  }

  onLogin(e) {
    console.log("login");
  }

  onRegister(e) {
    console.log("register");
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="inputUsername">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              aria-describedby="usernameHelp"
              placeholder="Username"/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"/>
          </div>
          <div class="form-group">
            <div class="btn-toolbar pull-right">
              <button type="button" class="btn mr-3 btn-primary" onClick={this.onLogin}>Login</button>
              <button type="button" class="btn mr-3 btn-success" onClick={this.onRegister}>Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
