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
                <h1>Liste des commandes</h1>

                <Button variant="success" style={{ float: 'right', margin: '20px' }} className="btn btn-secondary" 
                onClick={() => this.props.history.push('/commandes/create')}>Ajouter commande</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Quantité</th>
                        <th>Date</th>
                        <th>Etat</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        { this.state.commandes.map(commande => 
                            <tr>
                                <td>{commande.idCommande}</td>
                                <td>{commande.qteCommande}</td>
                                <td>{commande.dateCommande}</td>
                                <td>{commande.etatCommande}</td>
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
