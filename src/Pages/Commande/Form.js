import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        desigCommande: '',
        puCommande: 0,
        qteCommande: 0,
        configCommande: '',
        marqueCommande: '',
        modeleCommande: '',
        urlElements: ''
    }
 
    componentDidMount() {
        let urlElements = window.location.href.split('/').pop()
        this.setState({ urlElements })
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/commandes/`+urlElements)
          .then(res => {
            const commande = res.data;
            console.log(commande.desigCommande);
            this.setState(commande);
        })
    }
 
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
 
    handleSubmit = event => {
        event.preventDefault();

        let commande = {
          categorie: {
                "idCateg": 1,
                "codeCateg": "1",
                "libelleCateg": "LabTops",
                "hibernateLazyInitializer": {}
            },
          desigCommande: this.state.desigCommande,
          puCommande: this.state.puCommande,
          qteCommande: this.state.qteCommande,
          configCommande: this.state.configCommande,
          marqueCommande: this.state.marqueCommande,
          modeleCommande: this.state.modeleCommande
        };

        if(this.state.urlElements != "create")
        {
            commande.idClient = this.state.urlElements
        }
    
        axios.post(process.env.REACT_APP_API_END_POINT_URI + `/api/commandes`, commande)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/commandes');
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
                <h1>{pageName} commande</h1>

                <Form style={{ margin: '50px', maxWidth:'600px' }} onSubmit={this.handleSubmit} >

                    <Form.Group controlId="desigCommande">
                        <Form.Label>Libellé</Form.Label>
                        <Form.Control name="desigCommande" value={this.state.desigCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="puCommande">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="number" name="puCommande" value={this.state.puCommande} onChange={this.handleChange} required />
                    </Form.Group>
    
                    <Form.Group controlId="qteCommande">
                        <Form.Label>Qte</Form.Label>
                        <Form.Control type="number" name="qteCommande" value={this.state.qteCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="configCommande">
                        <Form.Label>Config</Form.Label>
                        <Form.Control name="configCommande" value={this.state.configCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="marqueCommande">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control name="marqueCommande" value={this.state.marqueCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="modeleCommande">
                        <Form.Label>modele</Form.Label>
                        <Form.Control name="modeleCommande" value={this.state.modeleCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Button type="submit" style={{ width:'180px', margin:5 }}>{pageName}</Button> 
                    <button type="button" class="btn btn-secondary" style={{ width:'180px', margin:5 }} 
                        onClick={() => this.props.history.push('/commandes')} >Annuler</button>
 
                </Form>
            </Container>
        )
    }
}
