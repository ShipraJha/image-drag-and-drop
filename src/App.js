import React from 'react';
import './App.css';
var ReactGridLayout = require('react-grid-layout');

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [{ id: 1, description: "", files: [], names: [], display: false }],
      showImages: false
    };
  }

  addClick(){
    const { imageData } = this.state;
    let prevId;
    console.log(this.state.imageData);

    if (imageData.length) {
      prevId = imageData[imageData.length - 1].id;
    } else {
      prevId = 0;
    }

    this.setState({
      imageData: [...imageData, { id: prevId + 1, description: "", files: [], names: [], display: false }],
      showImages: false
    });
  }

  findImageData = (id) => {
    return this.state.imageData.find(el => el.id===id);
  }

  createUI(){
    return this.state.imageData.map(el => (
      <div key={el.id} >
        <input type='file' className="ml-4 mt-4" name="image" onChange={this.handleImageChange.bind(this, el.id)} multiple required />
        <textarea placeholder="Add Description" className="ml-4 my-2" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, el.id)} />
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
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { imageData } = this.state;
    let prevId;

    if (imageData.length) {
      prevId = imageData[imageData.length - 1].id;
    } else {
      prevId = 0;
    }

    let image = this.findImageData(prevId);
    image.display = true;
    let imageData2 = this.state.imageData.map(el => el.id === prevId ? image : el);
    this.setState({ imageData2 });

    this.setState({
      imageData: [...imageData, { id: prevId + 1, description: "", files: [], names: [], display: false }],
      showImages: true
    });
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

  displayImages = (element) => {
    //var images = JSON.parse(JSON.stringify(this.state.imageData));
    var key = 0;
    //console.log(m);
    
    //return images.map((element) => {
      let id = element.id;
      let description = element.description;
      let names = element.names;
      var k = -3;
      var index = 0;
      return element.files.map((x) => {
        k = k + 3;
        if (k === 12)
        {
          k = 0;
        }
        return (
          <div className="card" key={id + " " + key++} data-grid={{x: k, y: 1, w: 3, h: 6}}>
            <img title = {names[index++] + "\n" + description} src={x} height="180" width="222"/>
            <button type='button' className="btn btn-danger" name={index-1} onMouseDown={this.removeClick.bind(this, id)} onTouchStart={this.removeClick.bind(this, id)}>
              X
            </button>
          </div>
        );
      });
    //});
  }

  render() {
    let imageHtml = [];

    if (this.state.imageData.length > 1) {
      this.state.imageData.map((element) => {
        if(element.display == true)
        {
          imageHtml.push(this.displayImages(element));
        }
      });
    }

    return (
      <div className="row">
        <form className="col-md-3" onSubmit={this.handleSubmit}>
          {this.createUI()}
          <button type="submit" className="btn btn-primary ml-4" >
            Submit
          </button>
          {console.log(imageHtml)}
        </form>
        <div className="col-md-9">
          <ReactGridLayout className="layout card mt-4" cols={12} rowHeight={30} width={950}>
            {imageHtml}
          </ReactGridLayout>
        </div>
      </div>
    );
  }
}
