import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
    }
  this.handleChangeImage = this.handleChangeImage.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeImage(event) {
    let image = event.target.files[0];
    let form = new FormData();
    form.append('image', image);
    this.setState({
        image: form,
    });
  }

  handleSubmit(event) {
    alert('Image was uploaded');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select Image:
          <input type="file" id="InputFile" accept="image/*" value={this.state.image} onChange={this.handleChangeImage} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}