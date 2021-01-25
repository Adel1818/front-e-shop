import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        desigProfile: '',
        puProfile: 0,
        qteProfile: 0,
        configProfile: '',
        marqueProfile: '',
        modeleProfile: '',
        urlElements: ''
    }
 
    componentDidMount() {
        let urlElements = window.location.href.split('/').pop()
        this.setState({ urlElements })
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/profiles/`+urlElements)
          .then(res => {
            const profile = res.data;
            console.log(profile.desigProfile);
            this.setState(profile);
        })
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
 
    handleSubmit = event => {
        event.preventDefault();

        let profile = {
          categorie: {
                "idCateg": 1,
                "codeCateg": "1",
                "libelleCateg": "LabTops",
                "hibernateLazyInitializer": {}
            },
          desigProfile: this.state.desigProfile,
          puProfile: this.state.puProfile,
          qteProfile: this.state.qteProfile,
          configProfile: this.state.configProfile,
          marqueProfile: this.state.marqueProfile,
          modeleProfile: this.state.modeleProfile
        };

        if(this.state.urlElements != "create")
        {
            profile.idClient = this.state.urlElements
        }
    
        axios.post(process.env.REACT_APP_API_END_POINT_URI + `/api/profiles`, profile)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/profiles');
        })
    }
    
    render() {

        let pageName = 'Ajout'
        if(this.state.urlElements != "create")
        {
            pageName = 'Edit'
        }

        return (
            <Container style={{ marginTop: '50px' }}>
                <h1>{pageName} profile</h1>

                <Form style={{ margin: '50px', maxWidth:'600px' }} onSubmit={this.handleSubmit} >

                    <Form.Group controlId="desigProfile">
                        <Form.Label>Libellé</Form.Label>
                        <Form.Control name="desigProfile" value={this.state.desigProfile} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="puProfile">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="number" name="puProfile" value={this.state.puProfile} onChange={this.handleChange} required />
                    </Form.Group>
    
                    <Form.Group controlId="qteProfile">
                        <Form.Label>Qte</Form.Label>
                        <Form.Control type="number" name="qteProfile" value={this.state.qteProfile} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="configProfile">
                        <Form.Label>Config</Form.Label>
                        <Form.Control name="configProfile" value={this.state.configProfile} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="marqueProfile">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control name="marqueProfile" value={this.state.marqueProfile} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="modeleProfile">
                        <Form.Label>modele</Form.Label>
                        <Form.Control name="modeleProfile" value={this.state.modeleProfile} onChange={this.handleChange} required />
                    </Form.Group>

                    <Button type="submit" style={{ width:'180px', margin:5 }}>{pageName}</Button> 
                    <button type="button" className="btn btn-secondary" style={{ width:'180px', margin:5 }} 
                        onClick={() => this.props.history.push('/profiles')} >Annuler</button>
 
                </Form>
            </Container>
        )
    }
}
