import React, { Component } from 'react';

export default class AddImage extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      date: new Date(),
    };
  }

  componentDidMount() {
    // Automatically called before anything displays on page
    this.setState({
      username: 'test user'
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const file = document.getElementById('customFile').files;
    const formData = new FormData();

    formData.append('img', file[0]);

    fetch('http://localhost:5000/', {
      method: 'POST',
      body: formData,
    }).then(res => {
      console.log(res);
    });

    document
      .getElementById("img")
      .setAttribute("src", `http://localhost:5000/${file[0].name}`);

    console.log(file[0]);

    // const image = {
    //   username: this.state.username,
    //   description: this.state.description,
    //   date: this.state.date,
    // };
    //
    // console.log(image);
    // window.location = '/';  // Go back to homepage
  }

  render() {
    return (
      <div className="container">
        <h3>Add New Image</h3>
        <form onSubmit={this.onSubmit}>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="customFile"/>
            <label className="custom-file-label" htmlFor="customFile">
              Choose file
            </label>
          </div>
          <input type="submit" value="Upload" className="btn btn-primary"/>
        </form>

        <img id="img" style={{ display: "block" }}/>
      </div>
    )
  }
}
