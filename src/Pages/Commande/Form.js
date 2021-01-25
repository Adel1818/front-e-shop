import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        qteCommande: 0,
        dateCommande: '2016-11-22',
        etatCommande: 0,
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
            qteCommande: this.state.qteCommande,
            dateCommande: this.state.dateCommande,
            etatCommande: this.state.etatCommande
        };

        if(this.state.urlElements != "create")
        {
            commande.idCommande = this.state.urlElements
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

                    <Form.Group controlId="qteCommande">
                        <Form.Label>Quantité</Form.Label>
                        <Form.Control name="qteCommande" value={this.state.qteCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="dateCommande">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" name="dateCommande" value={this.state.dateCommande} onChange={this.handleChange} required />
                    </Form.Group>
    
                    <Form.Group controlId="etatCommande">
                        <Form.Label>Etat</Form.Label>
                        <Form.Control type="number" name="etatCommande" value={this.state.etatCommande} onChange={this.handleChange} required />
                    </Form.Group>

                    <Button type="submit" style={{ width:'180px', margin:5 }}>{pageName}</Button> 
                    <button type="button" className="btn btn-secondary" style={{ width:'180px', margin:5 }} 
                        onClick={() => this.props.history.push('/commandes')} >Annuler</button>
 
                </Form>
            </Container>
        )
    }
}
