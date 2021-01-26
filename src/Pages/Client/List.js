import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useHistory } from "react-router-dom";
 

export default  class Home extends React.Component{
   constructor(){
      super();
      this.state = {
        clients: []
      }
      this.delete = this.delete.bind(this);
   }
   
    componentDidMount() {
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/clients`)
          .then(res => {
            const clients = res.data;
            console.log(clients);
            this.setState({ clients });
          })
    }
   
   
   
   delete(id){
      this.setState(prevState => ({
          clients: prevState.clients.filter(el => el != id )
      }));
   }
   
   render(){
      return(
      
        <Container style={{ marginTop: '100px' }}>
            <h1>Liste des clients</h1>
    
            <Button variant="success" style={{ float: 'right', margin: '20px' }} className="btn btn-secondary" 
            onClick={() => this.props.history.push('/clients/create')}>Ajouter client</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nom & prenom</th>
                    <th>Email</th>
                    <th>GSM</th>
                    <th>Ville</th>
                    <th>Action</th>
                    </tr>
                </thead>
                
          
                    <Child delete={this.delete} data={this.state.clients} {...this.props} />
                  
                  
              </Table>
          </Container>
      );
   }
}

class Child extends React.Component{



   delete(client){       
      
        if (window.confirm('Are you sure you wish to delete this item?') ) 
        {          
            axios.delete(process.env.REACT_APP_API_END_POINT_URI + `/api/clients/`+ client.idClient)   
            this.props.delete(client);
        }
   }
   
   render(){   
      return(
         <tbody>
           {
              this.props.data.map(client =>

                  <tr>
                      <td>{client.idClient}</td>
                      <td>{client.nomClient} {client.prenomClient}</td>
                      <td>{client.emailClient}</td>
                      <td>{client.gsmClient}</td>
                      <td>{client.villeAdrClient}</td>
                      <td style={{ width:'200px', margin:5 }}>
                          <Button onClick={() => this.props.history.push("/clients/" + client.idClient )} style={{margin:5}}> Update</Button> 
                          <Button variant="danger" style={{margin:5}}
                              onClick={this.delete.bind(this, client)}     
                          >Delete</Button> 
                      </td>
                  </tr>
 
              )
 
           }
         </tbody>
      )
   }
}
 