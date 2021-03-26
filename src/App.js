import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration'
import { Nav,NavDropdown,Navbar } from "react-bootstrap"
import './App.css';


function App(){

  return(
    <Router>
    <div className="App">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">E-MALL</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="/Login">Sign in</Nav.Link>
        <Nav.Link eventKey={2} href="/Registration">Register</Nav.Link>
      </Nav>
  </Navbar.Collapse>
</Navbar>
<br></br>
<Route path="/" />
<Route path="/Login" component={Login} />
<Route path="/Registration" component={Registration} />


</div>
</Router>
  );
}

export default App;