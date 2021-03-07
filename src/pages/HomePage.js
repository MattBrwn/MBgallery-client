import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAlbum from "./MyAlbum";


 class HomePage extends Component {
  render() {
    return (
      <div> 
        <h1>M.B. | Gallery</h1>
        <h5>Welcome on my Homepage!</h5>
        <MyAlbum />
      </div>
    )
  }
}

export default HomePage;
