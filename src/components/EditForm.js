import axios from 'axios'
import React, { Component } from 'react'
import config from '../config'

export default class EditForm extends Component {

  state = {
    image: {}
  }

  componentDidMount(){
    console.log(this.props) 
    let imageId = this.props.match.params.imageId
    axios.get(`${config.API_URL}/api/album/${imageId}`)
      .then((response) => {
        this.setState({
          image: response.data
        })
      })
      .catch(() => {
        console.log('Detail fetch failed')
      })
  }

  handleNameChange = (event) => {
    let text = event.target.value
    console.log(text)
    let cloneImage = JSON.parse(JSON.stringify(this.state.image))
    cloneImage.title = text

    this.setState({
      image: cloneImage
    })
  }

  handleDescChange = (event) => {
    let text = event.target.value
    let cloneImage = JSON.parse(JSON.stringify(this.state.image))
    cloneImage.description = text

    this.setState({
      image: cloneImage
    })
  }

  render() {
    const {image} = this.state
    const {onEdit} = this.props
    return (
      <div>
          <h5>Title</h5><input type="text" onChange={this.handleNameChange} value={image.title}/>
          <h5>Description</h5> <input type="text" onChange={this.handleDescChange} value={image.description}/>
          <h5>Genre</h5> <input type="text" onChange={this.handleDescChange} value={image.genre}/>
          
          <button onClick={ () => { onEdit(image) } }  >Submit</button>

      </div>
    )
  }
}

