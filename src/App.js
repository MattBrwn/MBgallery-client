import React, { Component } from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import axios from "axios";
import config from './config'
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import MyAlbum from "./pages/MyAlbum";
import ImageDetail from "./components/ImageDetail";
import AddForm from "./components/AddForm";


// import MyNav from "./components/MyNav";

class App extends Component {
  state = {
    images: [],
    loggedInUser: null,
    error: null,
  }

  // Get initial data
  componentDidMount(){
    axios.get(`${config.API_URL}/api/album`, {withCredentials:true})
      .then((response) => {
        console.log(response.data)
        this.setState({ images: response.data})
      })
      .catch(() => {
        console.log('Fetching failed')
      })

    if (!this.state.loggedInUser) {
      axios.get(`${config.API_URL}/api/user`, {withCredentials: true})
        .then((response) => {
            this.setState({
              loggedInUser: response.data
            })
        })
        .catch(() => {

        })
    }  
  }

  handleSignUp = (event) => {
    
    event.preventDefault()
    let user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    } 

    axios.post(`${config.API_URL}/api/signup`, user)
      .then((response) => {
          this.setState({
            loggedInUser: response.data
          }, () => {
            this.props.history.push('/')
          })
      })
      .catch((err) => {
          this.setState({
            error: err.response.data
          })
      })
 }

 handleLogIn = (event) => {
   
  event.preventDefault()
  let user = {
    email: event.target.email.value,
    password: event.target.password.value
  } 

  axios.post(`${config.API_URL}/api/login`, user, {withCredentials: true})
    .then((response) => {
        this.setState({
          loggedInUser: response.data
        }, () => {
          this.props.history.push('/')
        })
    })
    .catch((err) => {
        console.log('Something went wrong', err)
    })
 }

 handleLogout = () => {
  
  axios.post(`${config.API_URL}/api/logout`, {}, {withCredentials: true})
  .then(() => {
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
  })

 }

 handleDelete = (imageId) => {

  //1. Make an API call to the server side Route to delete that specific todo
    axios.delete(`${config.API_URL}/api/album/${imageId}`)
      .then(() => {
         // 2. Once the server has successfully created a new todo, update your state that is visible to the user
          let filteredImages = this.state.images.filter((image) => {
            return image._id !== imageId
          })

          this.setState({
            images: filteredImages
          }, () => {
            this.props.history.push('/album')
          })
      })
      .catch((err) => {
        console.log('Delete failed', err)
      })

 }



 handleEditImage = (image) => {
  axios.patch(`${config.API_URL}/api/album/${imageId}`, {
    title: image.title,
    genre: image.genre,
    description: image.description,
    imageUrl: image.imageUrl,
    price: image.price,
  })
    .then(() => {
        let newAlbum = this.state.images.map((singleImage) => {
            if (imageId === singleImage._id) {
              singleImage.title  = image.title
              singleImage.description = image.description
              singleImage.genre = image.genre
              singleImage.price = image.price
            }
            return singleImage
        })
        this.setState({
          Album: newAlbum
        }, () => {
          this.props.history.push('/')
        })

        
    })
    .catch((err) => {
      console.log('Edit failed', err)
    })

}


 handleSubmit = (event) => {
  event.preventDefault()
    let title = event.target.title.value 
    let genre = event.target.genre.value
    let description = event.target.description.value
    let price = event.target.price.value
    let image = event.target.imageUrl.files[0]
  
  let uploadForm = new FormData()
  uploadForm.append('imageUrl', image)

    // send image to cloudinary
    axios.post(`${config.API_URL}/api/upload`, uploadForm)
      .then((response) => {
            //1. Make an API call to the server side Route to create a new image
          axios.post(`${config.API_URL}/api/create`, {
            title: title,
            genre: genre,
            description: description,
            image: response.data.image, 
            price : event.target.price.value,
          })
            .then((response) => {
                // 2. Once the server has successfully created a new image, update your state that is visible to the user
                this.setState({
                  image: [response.data, ...this.state.image]
                }, () => {
                  //3. Once the state is update, redirect the user to the album page
                  this.props.history.push('/album')
                })

            })
            .catch((err) => {
              console.log('Create failed', err)
            })
      })
      .catch(() => {

      })
    
  }
 



  render(){
    return (
      <div>
        <MyNav onLogout={this.handleLogout} user={this.state.loggedInUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup"  render={(routeProps) => {
                return  <SignUp onSignUp={this.handleSignUp} {...routeProps}  />
          }}
          />
          <Route path="/login"  render={(routeProps) => {
                return  <LogIn onLogIn={this.handleLogIn} {...routeProps}  />
          }}
          />
          <Route exact path="/album" render={(routeProps) => {
                return  <MyAlbum  images={this.state.images}  {...routeProps}/>
          }} 
          />
          <Route path="/add-form" render={(routeProps) => {
                return <AddForm onAdd={this.handleSubmit}  {...routeProps}/>
          }} 
          />
          <Route  path="/album/:imageId" render={(routeProps) => {
                return <ImageDetail onDelete={this.handleDelete}  {...routeProps}/>
            }} />
           <Route  path="/album/:imageId/edit" render={(routeProps) => {
                return <EditForm onEdit={this.handleEditImage} onDelete={this.handleDelete} {...routeProps}/>
            }} />
        </Switch>
        <MyFooter />
      </div>
    )
  }
}

export default withRouter(App);
