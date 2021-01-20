import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class Home extends React.Component {
    state = {
        clients: []
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/clients`)
          .then(res => {
            const clients = res.data;
            console.log(clients);
            this.setState({ clients });
          })
    }

    render() {
        return (
            <Container style={{ marginTop: '100px' }}>
                <h1>Liste des clients</h1>

                <Button variant="success" style={{ float: 'right', margin: '20px' }} class="btn btn-secondary" 
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
                    <tbody>

                        { this.state.clients.map(client => 
                            <tr>
                                <td>{client.idClient}</td>
                                <td>{client.nomClient} {client.prenomClient}</td>
                                <td>{client.emailClient}</td>
                                <td>{client.gsmClient}</td>
                                <td>{client.villeAdrClient}</td>
                                <td style={{ width:'200px', margin:5 }}>
                                    <Button onClick={() => this.props.history.push("/clients/" + client.idClient )} style={{margin:5}}> Update</Button> 
                                    <Button variant="danger" style={{margin:5}}
                                        onClick={() => { 
                                                            if (window.confirm('Are you sure you wish to delete this item?') ) 
                                                            {
                                                                axios.delete(process.env.REACT_APP_API_END_POINT_URI + `/api/clients/`+ client.idClient)
                                                              
                                                            }
 
                                                       } 
                                                    }
                                    >Delete</Button> 
                                </td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </Container>
        )
    }
}
