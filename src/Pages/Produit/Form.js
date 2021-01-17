import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        desigProduit: '0',
        puProduit: 0,
        qteProduit: 0,
        configProduit: '',
        marqueProduit: '',
        modeleProduit: ''
    }
 
    componentDidMount() {
        let urlElements = window.location.href.split('/').pop();
        axios.get(`http://localhost:8091/api/produits/`+urlElements)
          .then(res => {
            const produit = res.data;
            console.log(produit.desigProduit);
            this.setState(produit);
        })
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
 
    handleSubmit = event => {
        event.preventDefault();

    
        const produit = {
          categorie: {
                "idCateg": 1,
                "codeCateg": "1",
                "libelleCateg": "LabTops",
                "hibernateLazyInitializer": {}
            },
          desigProduit: this.state.desigProduit,
          puProduit: this.state.puProduit,
          qteProduit: this.state.qteProduit,
          configProduit: this.state.configProduit,
          marqueProduit: this.state.marqueProduit,
          modeleProduit: this.state.modeleProduit
        };
    
        axios.post(`http://localhost:8091/api/produits`, produit)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/produits');
        })
    }
    
    render() {
        return (
            <Container style={{ marginTop: '50px' }}>
                <h1>Add Produit</h1>

                <Form style={{ margin: '50px', maxWidth:'600px' }} onSubmit={this.handleSubmit} >

                    <Form.Group controlId="desigProduit">
                        <Form.Label>Libellé</Form.Label>
                        <Form.Control name="desigProduit" value={this.state.desigProduit} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="puProduit">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="number" name="puProduit" value={this.state.puProduit} onChange={this.handleChange} required />
                    </Form.Group>
    
                    <Form.Group controlId="qteProduit">
                        <Form.Label>Qte</Form.Label>
                        <Form.Control type="number" name="qteProduit" value={this.state.qteProduit} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="configProduit">
                        <Form.Label>Config</Form.Label>
                        <Form.Control name="configProduit" value={this.state.configProduit} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="marqueProduit">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control name="marqueProduit" value={this.state.marqueProduit} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="modeleProduit">
                        <Form.Label>modele</Form.Label>
                        <Form.Control name="modeleProduit" value={this.state.modeleProduit} onChange={this.handleChange} required />
                    </Form.Group>

                    <Button type="submit" style={{ width:'180px' }}>Add</Button>
                </Form>
            </Container>
        )
    }
}
