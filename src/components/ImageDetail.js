import axios from 'axios'
import React, { Component } from 'react'
import config from '../config'
import {Link, Redirect} from 'react-router-dom'

 class ImageDetail extends Component {

  state = {
    image: {}
  }


  

  componentDidMount(){
    console.log(this.props) 
 
   let imageId = this.props.match.params.imageId
    axios.get(`${config.API_URL}/api/album/${imageId}`)
      .then((response) => {
        this.setState({ image: response.data })
      })
      .catch(() => {
        console.log('Detail fetch failed')
      })
  }

  render() {
    const {image} = this.state
    const{onDelete, handleBuy, user}= this.props
    console.log(this.props)

    return (
      <div>      
        <img style={{ width: '400px' }} src={image.imageUrl} alt={image.title} />
        <div>
          <h5>{image.title}</h5>
        </div>
        <div>Description: <br/>
          <p>{image.description}</p></div>
          <div>Album: {image.genre}</div>
          <div>Price: {image.price} € </div>
        <div>
          <Link to={`/album/${image._id}/edit`}>
            <button>Edit</button>
          </Link>
        <button onClick={() => { onDelete(image._id)  } } >Delete</button>
        <button onClick={() => { handleBuy(image._id, image.price)  } } >Buy this picture</button>
        </div>  
      </div>
    )
  }
}
export default ImageDetail;