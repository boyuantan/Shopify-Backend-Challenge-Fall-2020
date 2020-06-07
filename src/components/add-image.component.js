import React, { Component } from 'react';

export default class AddImage extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      images: [],
      uploadFileName: "Choose file",
    };
  }

  componentDidMount() {
    // Automatically called before anything displays on page
    fetch('http://localhost:5000/images', {
      method: 'GET',
      credentials: 'include',
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

  onChangeFile(e) {
    const file = document.getElementById('inputGroupFile01').files;
    this.setState({
      uploadFileName: file[0].name,
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const file = document.getElementById('inputGroupFile01').files;
    if (file.length == 0) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append('img', file[0]);

    const fname = file[0].name;

    fetch('http://localhost:5000/images/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then(res => {
      this.setState(prevState => ({
        images: [...prevState.images, fname],
      }));
    });

  }

  render() {
    const imgItems = this.state.images.map((fname) =>
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <a href={"http://localhost:5000/images/" + fname}>
          <img
            src={"http://localhost:5000/images/" + fname}
            className="img-fluid"/>
        </a>
      </div>
    )

    return (
      <div className="container">
        <h3>Add New Image</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.onChangeFile}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {this.state.uploadFileName}
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <input type="submit" value="Upload Selected Image" className="btn btn-primary"/>
            </div>
          </div>
        </form>
        <div className="container-fluid">
            <div className="row">
                {imgItems}
            </div>
        </div>
      </div>
    )
  }
}
