import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch ,Link, BrowserRouter as Router } from 'react-router-dom';

import About from './Pages/About';
import Portfolio from './Pages/Portfolio';

import form_Produit from './Pages/Produit/Form';
import Home_Produit from './Pages/Produit/Home';

import NotFound from './Pages/404.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


function App() {
  return (
    <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/about'>About</Nav.Link>
          <Nav.Link href='/portfolio'>Portfolio</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
        <Route exact path="/produits" component={Home_Produit} />
        <Route path="/produits/create" component={form_Produit} />
        <Route path="/produits/:id" component={form_Produit} />
        
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route component={NotFound} />
    </Switch>
  </Router>
  );
}

export default App;
