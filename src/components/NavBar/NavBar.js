import { Link } from "react-router-dom"
import * as userService from "../../utilities/users-service"
import { useState } from "react"
import Container  from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../../index.css"



export default function NavBar(props) {
    const { user, setUser } = props
    function handleLogOut(){
        userService.logOut()
        setUser(null)
    }
   
    return(
      <Navbar id='navbar' collapseOnSelect expand="lg"  variant="dark">
      <Container>
        <Navbar.Brand style={{fontFamily:"Chubiy", fontSize:"2.5em"}} id="logo" className="ml-1" href="/">Concert-Hi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`/profile/${user.username}`}>Profile</Nav.Link>
            <Nav.Link href='/findconcert'>Find Concerts</Nav.Link>
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href={`/update/${user.username}`}>
                Update Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={handleLogOut}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      

    )
}

