import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class Home extends React.Component {
    state = {
        commandes: []
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/commandes`)
          .then(res => {
            const commandes = res.data;
            console.log(commandes);
            this.setState({ commandes });
          })
    }

    render() {
        return (
            <Container style={{ marginTop: '100px' }}>
                <h1>Liste des Commandes</h1>

                <Button variant="success" style={{ float: 'right', margin: '20px' }} class="btn btn-secondary" 
                onClick={() => this.props.history.push('/commandes/create')}>Ajouter commande</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Employee Email</th>
                        <th>Employee Mobile</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        { this.state.commandes.map(commande => 
                            <tr>
                                <td>{commande.desigCommande}</td>
                                <td>{commande.puCommande}</td>
                                <td>{commande.qteCommande}</td>
                                <td>{commande.configCommande}</td>
                                <td style={{ width:'200px', margin:5 }}>
                                    <Button onClick={() => this.props.history.push("/commandes/" + commande.idCommande )} style={{margin:5}}> Update</Button> 
                                    <Button variant="danger" style={{margin:5}}
                                        onClick={() => { 
                                                            if (window.confirm('Are you sure you wish to delete this item?') ) 
                                                            {
                                                                axios.delete(process.env.REACT_APP_API_END_POINT_URI + `/api/commandes/`+ commande.idCommande)
                                                              
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
