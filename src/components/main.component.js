import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./navbar.component";
import Login from "./login.component";
import AddImage from "./add-image.component";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
    };
  }

  userStatusChanged = (isLoggedIn, username) => {
    console.log("user status changed!");
    this.setState({
      isLoggedIn: isLoggedIn,
      username: username,
    });
  }

  componentDidMount() {
    // Automatically called before anything displays on page
    fetch('http://localhost:5000/users/', {
      method: 'GET',
      credentials: 'include',
    }).then(res => {
      if (res.status === 200) {
        res.json().then((body) => {
          this.setState({
            isLoggedIn: true,
            username: body.username,
          });
        });
      }
    });
  }

  // <Route path="/" exact component={AddImage}/>
  
  render() {
    return (
      <Router>
        <Navbar
          isLoggedIn={this.state.isLoggedIn}
          username={this.state.username}
          userStatusChanged={this.userStatusChanged}
        />
        <br/>
        <Route
          path="/"
          exact render={(props) =>
            <AddImage {...props}
              isLoggedIn={this.state.isLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          render={(props) =>
            <Login {...props}
              userStatusChanged={this.userStatusChanged}
            />
          }
        />
      </Router>
    );
  }
}
