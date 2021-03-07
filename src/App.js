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
    album: [],
    loggedInUser: null,
    error: null,
  }

  // Get initial data
  componentDidMount(){
    axios.get(`${config.API_URL}/api/album`)
      .then((response) => {
        console.log(response.data)
        this.setState({ album: response.data})
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

 handleEditImage = (image) => {
  axios.patch(`${config.API_URL}/api/album/${image._id}`, {
    title: image.title,
    genre: image.genre,
    description: image.description,
    imageUrl: image.imageUrl,
    price: image.price,
  })
    .then(() => {
        let newAlbum = this.state.album.map((singleImage) => {
            if (image._id === singleImage._id) {
              singleImage.title  = image.name
              singleImage.description = image.description
              singleImage.genre = image.genre
              singleImage.price = image.price
              singleImage.imageUrl = image.ImageUrl
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
    // let imageUrl = event.target.imageUrl.files[0]
  
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
                  album: [response.data, ...this.state.album]
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
          }}/>
          <Route path="/login"  render={(routeProps) => {
                return  <LogIn onLogIn={this.handleLogIn} {...routeProps}  />
          }}/>
          <Route exact path="/album" render={(props) => {
                return  <MyAlbum album={this.state.album}/>
          }} />
          <Route path="/add-form" render={() => {
                return <AddForm onAdd={this.handleSubmit} />
          }} />
          <Route exact path="/imagedetail/:id" component={ImageDetail} />
        </Switch>
        <MyFooter />
      </div>
    )
  }
}

export default withRouter(App);
