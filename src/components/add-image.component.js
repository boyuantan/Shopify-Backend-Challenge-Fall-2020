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

    const image = {
      username: this.state.username,
      description: this.state.description,
      date: this.state.date,
    };

    console.log(image);
    window.location = '/';  // Go back to homepage
  }

  render() {
    return (
      <div>
        <h3>Add New Image</h3>
        <form onSubmit="onSubmit">
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile"/>
            <label class="custom-file-label" for="customFile">Choose file</label>
          </div>
        </form>
      </div>
    )
  }
}
