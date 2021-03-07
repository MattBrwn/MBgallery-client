import axios from 'axios'
import config from '../config'
import {Link, Redirect} from 'react-router-dom'
import React, { Component } from 'react'


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
        const {onDelete, user} = this.props
        console.log(this.props)
    
        if (!user) {
            return <Redirect to={'/login'} />
        }
    
        return (
          <div>
            <h4>Details are:</h4>
            <div>Title: {image.title}</div>
            <div>Description: {image.description}</div>
            {
              todo.image ? (
                <img src={image.imageUrl} alt={image.title} />
              ) : null
            }
            <Link to={`/image/${image._id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => { onDelete(image._id)  } } >Delete</button>
    
          </div>
        )
      }
    }
export default ImageDetail