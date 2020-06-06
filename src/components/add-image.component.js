import React, { Component } from 'react';

export default class AddImage extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    // Automatically called before anything displays on page
    fetch('http://localhost:5000/images', {
      method: 'GET',
    }).then(res => {
      res.json().then(imgInfo => {
        console.log(imgInfo);
        this.setState({
          images: imgInfo,
        });
      });
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
    if (file.length == 0) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append('img', file[0]);

    const fname = file[0].name;

    fetch('http://localhost:5000/', {
      method: 'POST',
      body: formData,
    }).then(res => {
      this.setState(prevState => ({
        images: [...prevState.images, fname],
      }));
    });

  }

  render() {
    const imgItems = this.state.images.map((fname) =>
      <img
        style={{ display: "block" }}
        src={"http://localhost:5000/images/" + fname}
      />
    )

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
        {imgItems}
      </div>
    )
  }
}
