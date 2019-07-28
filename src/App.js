import React from 'react';
import ImageForm from './components/ImageForm.js';
import ImageDisplay from './components/ImageDisplay';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [{ id: 1, description: "", files: [], names: [], display: false }]
    };
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

    let image = this.state.imageData.find(el => el.id===prevId);
    image.display = true;
    let imageDisplay = this.state.imageData.map(el => el.id === prevId ? image : el);
    this.setState({ imageDisplay });

    this.setState({
      imageData: [...imageData, { id: prevId + 1, description: "", files: [], names: [], display: false }]
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col-md-3" onSubmit={this.handleSubmit}>
          <ImageForm images={this.state.imageData}/>
          <button type="submit" className="btn btn-primary ml-4" >
            Submit
          </button>
        </form>
        <div className="col-md-9">
          <ImageDisplay images={this.state.imageData}/>
        </div>
      </div>
    );
  }
}
