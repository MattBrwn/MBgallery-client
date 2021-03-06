import React from  'react'
import {Navbar, Nav} from  'react-bootstrap'
import {Link} from  'react-router-dom'

function MyNav(props) {
  return (
    <Navbar  bg="light"  expand="lg">
      <Navbar.Toggle  aria-controls="basic-navbar-nav"  />
      <Navbar.Collapse  id="basic-navbar-nav">
        <Nav  className="mr-auto">
        <Link  to="/">Home</Link>
          <Link  to="/album">Portfolio</Link>
          <Link  to="/add-form">Image upload</Link>
          <Link  to="/purchase">My Purchase</Link>
          {
            props.user ? (
              <button onClick={props.onLogout} type="button" class="btn btn-light">Logout</button>
            ) : (
              <>
                <Link  style={{marginLeft: '10px'}}  to="/login">LogIn</Link>
                <Link  style={{marginLeft: '10px'}}  to="/signup">SignUp</Link>
                <Link  style={{marginLeft: '10px'}}  to="/">LogOut</Link>
              </>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
}
export default MyNav
