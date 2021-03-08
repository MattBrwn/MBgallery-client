import React, { Component } from 'react'

class AddForm extends Component {
   
    
    render() {
        return (
          <form onSubmit={this.props.onAdd}>
            <input name="title" type="text" placeholder="Enter title"/>
            <input name="genre" type="text" placeholder="Enter Genre"/>
            <input name="description" type="text" placeholder="Enter description"/>
            <input name="price" type="number" placeholder="Enter price in €"/>
            <input name="imageUrl" type="file" accept="image/png, image/jpg"/>
            <button type="submit" >Submit</button>
          </form>
        )
      }
    }


export default AddForm