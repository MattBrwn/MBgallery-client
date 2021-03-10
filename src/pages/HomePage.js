import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

// import MyAlbum from "./MyAlbum";


 class HomePage extends Component {
  render() {
    return (
      <div> 
        <div class="home-1">
          <h1>M.B. | Gallery</h1>
          <h5>Welcome!</h5>
        </div>
      
        <div class="home">
        <div class="row text-center" >
          
            <div class="home">
              <Link to={`/album`}><h2>My Portfolio</h2></Link>
            </div>
          </div>
        </div>
        </div>
        
    )
  }
}

export default HomePage;
