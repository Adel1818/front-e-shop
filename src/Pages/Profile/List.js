import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

export default class Home extends React.Component {
    state = {
        profiles: []
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/profiles`)
          .then(res => {
            const profiles = res.data;
            console.log(profiles);
            this.setState({ profiles });
          })
    }

    render() {
        return (
            <Container style={{ marginTop: '100px' }}>
                <h1>Liste des Profiles</h1>

                <Button variant="success" style={{ float: 'right', margin: '20px' }} class="btn btn-secondary" 
                onClick={() => this.props.history.push('/profiles/create')}>Ajouter profile</Button>
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

                        { this.state.profiles.map(profile => 
                            <tr>
                                <td>{profile.desigProfile}</td>
                                <td>{profile.puProfile}</td>
                                <td>{profile.qteProfile}</td>
                                <td>{profile.configProfile}</td>
                                <td style={{ width:'200px', margin:5 }}>
                                    <Button onClick={() => this.props.history.push("/profiles/" + profile.idProfile )} style={{margin:5}}> Update</Button> 
                                    <Button variant="danger" style={{margin:5}}
                                        onClick={() => { 
                                                            if (window.confirm('Are you sure you wish to delete this item?') ) 
                                                            {
                                                                axios.delete(process.env.REACT_APP_API_END_POINT_URI + `/api/profiles/`+ profile.idProfile)
                                                              
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
