import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class Home extends React.Component {
    state = {
        produits: []
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/produits`)
          .then(res => {
            const produits = res.data;
            console.log(produits);
            this.setState({ produits });
          })
    }

    render() {
        return (
            <Container style={{ marginTop: '100px' }}>
                <h1>Liste des Produits</h1>

                <Button variant="success" style={{ float: 'right', margin: '20px' }} class="btn btn-secondary" 
                onClick={() => this.props.history.push('/produits/create')}>Ajouter produit</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Libellé</th>
                        <th>Prix unitaire</th>
                        <th>Qte</th>
                        <th>Marque</th>
                        <th>Modéle</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        { this.state.produits.map(produit => 
                            <tr>
                                <td>{produit.idProduit}</td>
                                <td>{produit.desigProduit}</td>
                                <td>{produit.puProduit}</td>
                                <td>{produit.qteProduit}</td>
                                <td>{produit.marqueProduit}</td>
                                <td>{produit.modeleProduit}</td>
                                <td style={{ width:'200px', margin:5 }}>
                                    <Button onClick={() => this.props.history.push("/produits/" + produit.idProduit )} style={{margin:5}}> Update</Button> 
                                    <Button variant="danger" style={{margin:5}}
                                        onClick={() => { 
                                                            if (window.confirm('Are you sure you wish to delete this item?') ) 
                                                            {
                                                                axios.delete(process.env.REACT_APP_API_END_POINT_URI + `/api/produits/`+ produit.idProduit)
                                                              
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
