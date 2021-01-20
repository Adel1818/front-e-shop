import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class Home extends React.Component {
    state = {
        categories: []
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/categories`)
          .then(res => {
            const categories = res.data;
            console.log(categories);
            this.setState({ categories });
          })
    }

    render() {
        return (
            <Container style={{ marginTop: '100px' }}>
                <h1>Liste des Categories</h1>

                <Button variant="success" style={{ float: 'right', margin: '20px' }} class="btn btn-secondary" 
                onClick={() => this.props.history.push('/categories/create')}>Ajouter categorie</Button>
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

                        { this.state.categories.map(categorie => 
                            <tr>
                                <td>{categorie.desigCategorie}</td>
                                <td>{categorie.puCategorie}</td>
                                <td>{categorie.qteCategorie}</td>
                                <td>{categorie.configCategorie}</td>
                                <td style={{ width:'200px', margin:5 }}>
                                    <Button onClick={() => this.props.history.push("/categories/" + categorie.idCategorie )} style={{margin:5}}> Update</Button> 
                                    <Button variant="danger" style={{margin:5}}
                                        onClick={() => { 
                                                            if (window.confirm('Are you sure you wish to delete this item?') ) 
                                                            {
                                                                axios.delete(process.env.REACT_APP_API_END_POINT_URI + `/api/categories/`+ categorie.idCategorie)
                                                              
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
