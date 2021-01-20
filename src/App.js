import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch ,Link, BrowserRouter as Router } from 'react-router-dom';

 
import List_Produit from './Pages/Produit/List';
import form_Produit from './Pages/Produit/Form';

import List_Client from './Pages/Client/List';
import form_Client from './Pages/Client/Form';

import List_Categorie from './Pages/Categorie/List';
import form_Categorie from './Pages/Categorie/Form';

import List_Commande from './Pages/Commande/List';
import form_Commande from './Pages/Commande/Form';

import List_Profile from './Pages/Profile/List';
import form_Profile from './Pages/Profile/Form';


import NotFound from './Pages/404.js';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
 

function App() {
  return (
    <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/produits'>Produits</Nav.Link>
          <Nav.Link href='/clients'>Clients</Nav.Link>
          <Nav.Link href='/categories'>Categories</Nav.Link>
          <Nav.Link href='/commandes'>Commandes</Nav.Link>
          <Nav.Link href='/profile'>Profile</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
        <Route exact path="/produits" component={List_Produit} />
        <Route path="/produits/create" component={form_Produit} />
        <Route path="/produits/:id" component={form_Produit} />

        <Route exact path="/clients" component={List_Client} />
        <Route path="/clients/create" component={form_Client} />
        <Route path="/clients/:id" component={form_Client} />

        <Route exact path="/categories" component={List_Categorie} />
        <Route path="/categories/create" component={form_Categorie} />
        <Route path="/categories/:id" component={form_Categorie} />

        <Route exact path="/commandes" component={List_Commande} />
        <Route path="/commandes/create" component={form_Commande} />
        <Route path="/commandes/:id" component={form_Commande} />

        <Route exact path="/profile" component={List_Profile} />
        <Route path="/profile/create" component={form_Profile} />
        <Route path="/profile/:id" component={form_Profile} />

        <Route component={NotFound} />
    </Switch>
  </Router>
  );
}

export default App;
