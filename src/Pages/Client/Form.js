import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        loginClient:"",
        motPasseClient:"",
        nomClient:"",
        prenomClient:"",
        civiliteClient:"",
        dateNaissanceClient:"",
        numeroAdrClient:"",
        rueAdrClient:"",
        communeAdrClient:"",
        villeAdrClient:"",
        cpAdrClient:"",
        telClient:"",
        faxClient:"",
        gsmClient:"",
        emailClient:"" 
    }
 
    componentDidMount() {
        let urlElements = window.location.href.split('/').pop()
        this.setState({ urlElements })
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/clients/`+urlElements)
          .then(res => {
            const client = res.data;
            this.setState(client);
        })
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
 
    handleSubmit = event => {
        event.preventDefault();

        let client = {
          loginClient: this.state.loginClient,
          motPasseClient: this.state.motPasseClient,
          nomClient: this.state.nomClient,
          prenomClient: this.state.prenomClient,
          civiliteClient: this.state.civiliteClient,
          dateNaissanceClient: this.state.dateNaissanceClient,
          numeroAdrClient: this.state.numeroAdrClient,
          rueAdrClient: this.state.rueAdrClient,
          communeAdrClient: this.state.communeAdrClient,
          villeAdrClient: this.state.villeAdrClient,
          cpAdrClient: this.state.cpAdrClient,
          telClient: this.state.telClient,
          faxClient: this.state.faxClient,
          gsmClient: this.state.gsmClient,
          emailClient: this.state.emailClient 
        };

        if(this.state.urlElements != "create")
        {
            client.idClient = this.state.urlElements
        }
    
        axios.post(process.env.REACT_APP_API_END_POINT_URI + `/api/clients`, client)
          .then(res => {
            console.log(res.data);
            this.props.history.push('/clients');
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
                <h1>{pageName} client</h1>

                <Form style={{ margin: '50px', maxWidth:'600px' }} onSubmit={this.handleSubmit} >

 
                    <Form.Group controlId="loginClient">
                        <Form.Label>Login</Form.Label>
                        <Form.Control name="loginClient" value={this.state.loginClient} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="motPasseClient">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control name="motPasseClient" value={this.state.motPasseClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="nomClient">
                        <Form.Label>Nom </Form.Label>
                        <Form.Control name="nomClient" value={this.state.nomClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="prenomClient">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control name="prenomClient" value={this.state.prenomClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="civiliteClient">
                        <Form.Label>Civilité</Form.Label>
                        <Form.Control name="civiliteClient" value={this.state.civiliteClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="dateNaissanceClient">
                        <Form.Label>Date naissance </Form.Label>
                        <Form.Control name="dateNaissanceClient" value={this.state.dateNaissanceClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="numeroAdrClient">
                        <Form.Label>Numero Adr </Form.Label>
                        <Form.Control name="numeroAdrClient" value={this.state.numeroAdrClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="rueAdrClient">
                        <Form.Label>Rue Adr</Form.Label>
                        <Form.Control name="rueAdrClient" value={this.state.rueAdrClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="communeAdrClient">
                        <Form.Label>Commune Adr</Form.Label>
                        <Form.Control name="communeAdrClient" value={this.state.communeAdrClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="villeAdrClient">
                        <Form.Label>Ville Adr</Form.Label>
                        <Form.Control name="villeAdrClient" value={this.state.villeAdrClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="cpAdrClient">
                        <Form.Label>Cp Adr</Form.Label>
                        <Form.Control name="cpAdrClient" value={this.state.cpAdrClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="telClient">
                        <Form.Label>Tel </Form.Label>
                        <Form.Control name="telClient" value={this.state.telClient} onChange={this.handleChange} required />
                    </Form.Group>
  
                    <Form.Group controlId="faxClient">
                        <Form.Label>Fax</Form.Label>
                        <Form.Control name="faxClient" value={this.state.faxClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="gsmClient">
                        <Form.Label>GSM</Form.Label>
                        <Form.Control name="gsmClient" value={this.state.gsmClient} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Form.Group controlId="emailClient">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="emailClient" value={this.state.emailClient} onChange={this.handleChange} required />
                    </Form.Group>

 
                    <Button type="submit" style={{ width:'180px', margin:5 }}>{pageName}</Button> 
                    <button type="button" className="btn btn-secondary" style={{ width:'180px', margin:5 }} 
                        onClick={() => this.props.history.push('/clients')} >Annuler</button>
 
                </Form>
            </Container>
        )
    }
}
