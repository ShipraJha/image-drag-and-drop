import React from 'react';

export default class ImageForm extends React.Component {
  handleChange = (id, e) => {
    let image = this.findImageData(id);
    image.description = e.target.value;

    let imageData = this.props.images.map(el => el.id === id ? image : el);
    this.setState({ imageData });
  }

  handleImageChange = (id, e) => {
    let image = this.findImageData(id);
    let files = e.target.files;

    Object.keys(files).forEach(key => {
      let read = new FileReader();
      read.readAsDataURL(files[key]);
      read.onloadend = () => {
        image.files.push(read.result);
        image.names.push(files[key].name);
      }
    });

    let imageData = this.props.images.map(el => el.id === id ? image : el);
    this.setState({ imageData });
  }

  findImageData = (id) => {
    return this.props.images.find(el => el.id===id);
  }

  render () {
    return this.props.images.map(el => (
      <div key={el.id} >
        <input type='file' className="ml-4 mt-4" name="image" onChange={this.handleImageChange.bind(this, el.id)} multiple required />
        <textarea placeholder="Add Description" className="ml-4 my-2" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, el.id)} />
      </div>
    ))
  }
}
