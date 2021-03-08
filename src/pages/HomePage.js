import React, { Component } from 'react'
import { Link } from "react-router-dom"

// import MyAlbum from "./MyAlbum";


 class HomePage extends Component {
  render() {
    return (
      <div> 
        <h1>M.B. | Gallery</h1>
        <h5>Welcome here!</h5>
        <Link to={`/album`}><h2>My Portfolio</h2></Link>
      </div>
    )
  }
}

export default HomePage;
