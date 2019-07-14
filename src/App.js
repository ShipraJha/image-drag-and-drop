import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	users: [{name: "", description: "", file: ""}]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  addClick(){
    this.setState(prevState => ({ 
    	users: [...prevState.users, { name: "", description: "", file: "" }]
    }))
  }
  
  createUI(){
    return this.state.users.map((el, i) => (
      <div key={i}>
        <input placeholder="Name" name="name" value={el.name ||''} onChange={this.handleChange.bind(this, i)} />
        <input placeholder="Description" name="description" value={el.description ||''} onChange={this.handleChange.bind(this, i)} />
        <input type='file' name="image" onChange={this.handleImageChange.bind(this, i)} />
        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
      </div>          
    ))
  }
  
  handleChange(i, e) {
     const { name, value } = e.target;
     let users = [...this.state.users];
     users[i] = {...users[i], [name]: value};
     this.setState({ users });
  }

  handleImageChange(i, e) {
    let file = e.target.files[0];
    let read = new FileReader();
    let users = [...this.state.users];
    read.readAsDataURL(file);
    read.onloadend = () => {
      users[i] = {...users[i], file: read.result};
      this.setState({ users });
    }
 }
  
  removeClick(i){
     let users = [...this.state.users];
     users.splice(i, 1);
     this.setState({ users });
  }
  
  handleSubmit(event) {
    var preview = document.querySelector('#preview');
    var file = JSON.parse(JSON.stringify(this.state.users)).map(x => x.file);
    file.forEach(function(item){
      var image = new Image();
      image.height = 100;
      image.src = item;
      preview.appendChild( image );
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
          {this.createUI()}        
          <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
          <input type="submit" value="Submit" />
      </form>
      <div id="preview"></div>
      </div>
    );
  }
}
