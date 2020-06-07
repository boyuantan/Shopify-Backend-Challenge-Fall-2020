import React, { Component } from 'react';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);

    this.state = {};
  }

  onLogin(e) {
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    const {history} = this.props;

    const body = JSON.stringify({
      username: username,
      password: password,
    });

    fetch('http://localhost:5000/users/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: body,
    }).then(res => {
      if (res.status === 200) {
        console.log(res.headers);
        this.props.userStatusChanged(true, username);
        history.push('/');
      } else {
        alert("Login unsuccessful!");
      }
    });
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
          <div className="form-group">
            <div className="btn-toolbar pull-right">
              <button type="button" className="btn mr-3 btn-primary" onClick={this.onLogin}>Login</button>
              <button type="button" className="btn mr-3 btn-success" onClick={this.onRegister}>Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
