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

                <Button variant="secondary" style={{ float: 'right', margin: '20px' }} 
                onClick={() => this.props.history.push('/produits/create')}>Add a Employee</Button>
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

                        { this.state.produits.map(produit => 
                            <tr>
                                <td>{produit.desigProduit}</td>
                                <td>{produit.puProduit}</td>
                                <td>{produit.qteProduit}</td>
                                <td>{produit.configProduit}</td>
                                <td>
                                    <Button onClick={() => this.props.history.push("/produits/" + produit.idProduit )}> Update</Button> 
                                    <Button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(produit.idProduit) } }variant="danger">Delete</Button> 
                                </td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </Container>
        )
    }
}
