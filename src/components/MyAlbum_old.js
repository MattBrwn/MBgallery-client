import React, { Component } from 'react'
import { Link } from 'react-router-dom'

 class MyAlbum extends Component {
  render() {
     const {album} = this.props
        return (
          <div>
            <h1>My Portfolio</h1>    
            {
           album.map((image) => { 
              return
             (
               <h3></h3>
             )
              })
            }
          </div>
          )
  }
  }
export default MyAlbum