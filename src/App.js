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
import EditForm from "./components/EditForm";
import MyPurchase from "./pages/MyPurchase";
import ErrorPage from "./components/ErrorPage";
// import AllPurchases from "./pages/AllPurchases";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./components/CheckoutForm";


// import MyNav from "./components/MyNav";

class App extends Component {
  state = {
    images: [],
    loggedInUser: null,
    // is_admin: false,
    error: null,
  }

  // Get initial data
  componentDidMount(){
    axios.get(`${config.API_URL}/api/album`, {withCredentials:true})
      .then((response) => {
        console.log("response from API", response.data)
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

    axios.post(`${config.API_URL}/api/signup`, user, {withCredentials: true})
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

 handlePurchase = () => {
  axios.get(`${config.API_URL}/api/purchase`, {}, {withCredentials: true})
  const {images, loggedInUser, error} = this.state
   .then(() => {
      this.setState({
        loggedInUser: null
      }, () => {
        this.props.history.push('/')
      })
  })

 }
  
 handleBuy = (purchase, price) => {
    console.log(purchase)
        //1. Make an API call to the server side Route to create a purchase
      axios.post(`${config.API_URL}/api/purchase`, {
          image_id: purchase,
          totalprice: price,
          date : new Date()

        },
        {withCredentials: true}
        )
        .then((response) => {
            // 2. Once the server has successfully created a new image, update your state that is visible to the user
            this.setState({
              
            }, () => {
              //3. Once the state is update, redirect the user to the album page
              this.props.history.push('/album')
            })
       })
        .catch((err) => {
          console.log('Create purchase failed', err)
        })
 }

 handleDelete = (imageId) => {

  //1. Make an API call to the server side Route to delete that specific image
    axios.delete(`${config.API_URL}/api/album/${imageId}`, {}, {withCredentials: true})
    // console.log(image._id)
      .then(() => {
         // 2. Once the server has successfully created a new image, update your state that is visible to the user
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
   console.log(image)
  axios.patch(`${config.API_URL}/api/album/${image._id}`, {
    title: image.title,
    genre: image.genre,
    description: image.description,
    imageUrl: image.imageUrl,
    price: image.price,
  }, {withCredentials: true})
    .then(() => {
        let newAlbum = this.state.images.map((singleImage) => {
            if (image._id === singleImage._id) {
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
          this.props.history.push(`/album/${image._id}`)
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
    axios.post(`${config.API_URL}/api/upload`, uploadForm, {withCredentials: true})
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
                  image: [response.data, ...this.state.images]
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
        {/* <AllPurchases stripe={promise}>
          {/* <CheckoutForm /> 
        </AllPurchases> */}
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
          <Route  exact path="/album/:imageId" render={(routeProps) => {
                return <ImageDetail onDelete={this.handleDelete}  handleBuy={this.handleBuy} {...routeProps}/>
            }} />
           <Route exact path="/album/:imageId/edit" render={(routeProps) => {
                return <EditForm onEdit={this.handleEditImage} onDelete={this.handleDelete} {...routeProps}/>
            }} />
            <Route exact path="/purchase" render={(routeProps) => {
                return <MyPurchase onPurchase={this.handlePurchase}/>
            }} />
            {/* <Route path="" render={(routeProps) => {
                return <ErrorPage />
            }} /> */}
        </Switch>
        <MyFooter />
      </div>
    )
  }
}

export default withRouter(App);



