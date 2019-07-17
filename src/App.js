import React from 'react';
import './App.css';
var ReactGridLayout = require('react-grid-layout');

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageDescription: "",
      imageNames: [],
      files: [],
      showImages: false,
    };
  }
  
  handleChange = (e) => {
    this.setState({description: e.target.value});
  }

  handleImageChange = (e) => {
    let files = e.target.files;
    Object.keys(files).forEach(key => {
      let read = new FileReader();
      read.readAsDataURL(files[key]);
      read.onloadend = () => {
        this.setState({ files: [...this.state.files, read.result] });
        this.setState({ imageNames: [...this.state.imageNames, files[key].name] });
      }
    });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({showImages: true});
  }

  removeClick = (e) => {
    e.stopPropagation();
    let index = e.target.name;
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({ files });
  }

  displayImages = () => {
    const images = JSON.parse(JSON.stringify(this.state.files));
    const description = this.state.description;
    const name = JSON.parse(JSON.stringify(this.state.imageNames));
    var k = -2;
    
    return images.map((image, index) => {
      k = k + 2;
      if (k === 12)
      {
        k = 0;
      }
      return (
        <div key={index} data-grid={{x: k, y: 1, w: 2, h: 6}}>
          <img title = {name[index] + " " + description} src={image} height="150" width="150"/>
          <button 
            type='button'
            name = {index}
            onMouseDown={this.removeClick}
            onTouchStart={this.removeClick}
          >
            X
          </button>
        </div>
      );
    });
  }

  render() {
    let imageHtml = null;

    if (this.state.showImages === true) {
      imageHtml = this.displayImages();
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <input type='file' name="image" onChange={this.handleImageChange} multiple/>
            <textarea placeholder="Description" name={this.state.description} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
        </form>

        <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          {imageHtml}
        </ReactGridLayout>
        <div id="preview"></div>
      </div>
    );
  }
}
