import React from 'react';
import logo from './logo.svg';
import './App.css';
var ReactGridLayout = require('react-grid-layout');

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [{ id: 1, name: "", description: "", file: "" }],
      showImages: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    	imageData: [...imageData, { id: prevId + 1, name: "", description: "", file: "" }]
    });
  }

  findImageData = (id) => {
    return this.state.imageData.find(el => el.id===id);
  }
  
  createUI(){
    return this.state.imageData.map(el => (
      <div key={el.id}>
        <input type='file' name="image" onChange={this.handleImageChange.bind(this, el.id)} />
        <input placeholder="Name" name="name" value={el.name ||''} onChange={this.handleChange.bind(this, el.id)} />
        <input placeholder="Description" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, el.id)} />
        <input type='button' value='remove' onClick={this.removeClick.bind(this, el.id)}/>
      </div>          
    ))
  }
  
  handleChange(id, e) {
    const { name, value } = e.target;
    let image = this.findImageData(id);
    image[name] = value;

    let imageData = this.state.imageData.map(el => el.id === id ? image : el);

    this.setState({ imageData });
  }

  handleImageChange(id, e) {
    let file = e.target.files[0];
    let read = new FileReader();
    let image = this.findImageData(id);
    read.readAsDataURL(file);
    read.onloadend = () => {
      image.file = read.result
      let imageData = this.state.imageData.map(el => el.id === id ? image : el);
      this.setState({ imageData });
    }
  }
  
  removeClick(id){
    const imageData = this.state.imageData.filter(el => el.id !== id);
    this.setState({ imageData });
  }
  
  handleSubmit(event) {
    // var preview = document.querySelector('.preview');
    // var gridLayout = document.querySelector('.react-grid-layout');
    // var images = JSON.parse(JSON.stringify(this.state.imageData));
    // images.forEach(function(item){
    //   var image = new Image();
    //   image.height = 100;
    //   image.width = 150;
    //   image.src = item.file;
    //   image.title = item.name;
    //   image.alt = item.description;
    //   console.log(preview.appendChild( image ));
      
    // });
    event.preventDefault();
  }

  displayImages = () => {
    var images = JSON.parse(JSON.stringify(this.state.imageData));

    return images.map(image => {
      console.log(image);
      return (
        <div className="preview" key={image.description} data-grid={{x: 0, y: 0, w: 1, h: 2}}>
          <img title={image.name + "\n" + image.description} src={image.file} height="50" width="100"/>
        </div>
      );
    });
  }

  render() {
    console.log(this.state.imageData);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            {this.createUI()}        
            <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
            <input type="submit" value="Submit" />
        </form>
        <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          {this.displayImages()}
        </ReactGridLayout>
      </div>
    );
  }
}