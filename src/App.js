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





















import React from 'react';
import './App.css';
var ReactGridLayout = require('react-grid-layout');

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [{ id: 1, description: "", files: [] }],
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
    	imageData: [...imageData, { id: prevId + 1, description: "", files: [] }]
    });
  }

  findImageData = (id) => {
    return this.state.imageData.find(el => el.id===id);
  }

  createUI(){
    return this.state.imageData.map(el => (
      <div key={el.id}>
        <input type='file' name="image" onChange={this.handleImageChange.bind(this, el.id)} multiple />
        <input placeholder="Description" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, el.id)} />
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
      }
    });
    let imageData = this.state.imageData.map(el => el.id === id ? image : el);
    this.setState({ imageData });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({showImages: true});
  }

  removeClick = (e) => {
    e.stopPropagation();
    let index = e.target.name;
    let files = [...this.state.files];
    let names = [...this.state.imageNames];
    files.splice(index, 1);
    names.splice(index, 1);
    this.setState({ files });
    this.setState({ names });
  }

  // displayImages = () => {  
  //   console.log("imageData", this.state.imageData);  
  //   return this.state.imageData.map((data, i) => {
  //     var images = JSON.parse(JSON.stringify(data.files));
  //     console.log("images", images);
  //     return (
  //       <div key={i}>
  //         {this.spreadImages(images, data)}
  //       </div>
  //     );
  //   });
  // }

  // spreadImages = (images, data) => {
  //   return images.map((image, index) => {
  //     return (
  //       <div className="preview" key={data.description + index.toString()} data-grid={{x: 0, y: 0, w: 1, h: 2}}>
  //         <img src={image.file} height="50" width="100"/>
  //       </div>
  //     );
  //   });
  // }

  displayImages = () => {
    var images = JSON.parse(JSON.stringify(this.state.imageData)).map(x => (x.files));

    var files = JSON.parse(JSON.stringify(images[0]));
    console.log(files[0]);
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
        <div id="preview"></div>
      </div>
    );
  }
}
