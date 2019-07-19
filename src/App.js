import React from 'react';
import './App.css';
var ReactGridLayout = require('react-grid-layout');

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [{ id: 1, description: "", files: [], names: [] }],
      showImages: false,
    };
  }

  addClick(){
    const { imageData } = this.state;
    let prevId;

    if (imageData.length) {
      prevId = imageData[imageData.length - 1].id;
    } else {
      prevId = 0;
    }

    this.setState({
    	imageData: [...imageData, { id: prevId + 1, description: "", files: [], names: [] }]
    });

    this.setState({showImages: false});
  }

  findImageData = (id) => {
    return this.state.imageData.find(el => el.id===id);
  }

  createUI(){
    return this.state.imageData.map(el => (
      <div key={el.id}>
        <input type='file' name="image" onChange={this.handleImageChange.bind(this, el.id)} multiple />
        <textarea placeholder="Description" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, el.id)} />
      </div>          
    ))
  }
  
  handleChange(id, e) {
    let image = this.findImageData(id);
    image.description = e.target.value;

    let imageData = this.state.imageData.map(el => el.id === id ? image : el);

    this.setState({ imageData });
  }

  handleImageChange(id, e) {
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
    let imageData = this.state.imageData.map(el => el.id === id ? image : el);
    this.setState({ imageData });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({showImages: true});
  }

  removeClick = (id,e) => {
    e.stopPropagation();
    let index = e.target.name;
    let image = this.findImageData(id);
    image.files.splice(index, 1);
    image.names.splice(index, 1);
    let imageData = this.state.imageData.map(el => el.id === id ? image : el);
    this.setState({ imageData });
  }

  displayImages = () => {
    var images = JSON.parse(JSON.stringify(this.state.imageData));
    var i = 0;

    return images.map((element) => {
      let id = element.id;
      let description = element.description;
      let names = element.names;
      var k = -2;
      var l = 0;
      return element.files.map((x) => {
        k = k + 2;
        if (k === 12)
        {
          k = 0;
        }
        return (
          <div key={i++} data-grid={{x: k, y: 1, w: 2, h: 6}}>
            <img title = {names[l++] + "\n" + description} src={x} height="150" width="150"/>
            <button type='button' name={l-1} onMouseDown={this.removeClick.bind(this, id)} onTouchStart={this.removeClick.bind(this, id)}>
            X
            </button>
          </div>
        );
      });
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
          {this.createUI()}        
          <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
          <input type="submit" value="Submit" />
        </form>

        <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          {imageHtml}
        </ReactGridLayout>
      </div>
    );
  }
}
