import React from 'react';
let ReactGridLayout = require('react-grid-layout');

export default class ImageDisplay extends React.Component {
  displayImages = (element) => {
    const id = element.id;
    const description = element.description;
    const names = element.names;
    let key = 0;
    let k = -3;
    return element.files.map((x, index) => {
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
  }

  removeClick = (id,e) => {
    e.stopPropagation();
    let index = e.target.name;
    let image = this.props.images.find(el => el.id===id);
    image.files.splice(index, 1);
    image.names.splice(index, 1);
    let imageData = this.props.images.map(el => el.id === id ? image : el);
    this.setState({ imageData });
  }

  render() {
    let imageHtml = [];
    if (this.props.images.length > 1) {
      this.props.images.map((element) => {
        if(element.display === true)
        {
          imageHtml.push(this.displayImages(element));
        }
      });
    }

    return (
      <ReactGridLayout className="layout card mt-4" cols={12} rowHeight={30} width={950}>
        {imageHtml}
      </ReactGridLayout>
    );
  }
}
