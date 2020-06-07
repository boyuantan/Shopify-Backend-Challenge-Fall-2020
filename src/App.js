import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import AddImage from "./components/add-image.component";

// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/upload" component={AddImage}/>
      <Route path="/login" component={Login}/>
    </Router>
  );
}

export default App;
