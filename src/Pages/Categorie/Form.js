import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        desigCategorie: '',
        puCategorie: 0,
        qteCategorie: 0,
        configCategorie: '',
        marqueCategorie: '',
        modeleCategorie: '',
        urlElements: ''
    }
 
    componentDidMount() {
        let urlElements = window.location.href.split('/').pop()
        this.setState({ urlElements })
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/categories/`+urlElements)
          .then(res => {
            const categorie = res.data;
            console.log(categorie.desigCategorie);
            this.setState(categorie);
        })
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
 
    handleSubmit = event => {
        event.preventDefault();

        let categorie = {
          categorie: {
                "idCateg": 1,
                "codeCateg": "1",
                "libelleCateg": "LabTops",
                "hibernateLazyInitializer": {}
            },
          desigCategorie: this.state.desigCategorie,
          puCategorie: this.state.puCategorie,
          qteCategorie: this.state.qteCategorie,
          configCategorie: this.state.configCategorie,
          marqueCategorie: this.state.marqueCategorie,
          modeleCategorie: this.state.modeleCategorie
        };

        if(this.state.urlElements != "create")
        {
            categorie.idClient = this.state.urlElements
        }
    
        axios.post(process.env.REACT_APP_API_END_POINT_URI + `/api/categories`, categorie)
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/categories');
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
                <h1>{pageName} categorie</h1>

                <Form style={{ margin: '50px', maxWidth:'600px' }} onSubmit={this.handleSubmit} >

                    <Form.Group controlId="desigCategorie">
                        <Form.Label>Libellé</Form.Label>
                        <Form.Control name="desigCategorie" value={this.state.desigCategorie} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="puCategorie">
                        <Form.Label>Prix unitaire</Form.Label>
                        <Form.Control type="number" name="puCategorie" value={this.state.puCategorie} onChange={this.handleChange} required />
                    </Form.Group>
    
                    <Form.Group controlId="qteCategorie">
                        <Form.Label>Qte</Form.Label>
                        <Form.Control type="number" name="qteCategorie" value={this.state.qteCategorie} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="configCategorie">
                        <Form.Label>Config</Form.Label>
                        <Form.Control name="configCategorie" value={this.state.configCategorie} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="marqueCategorie">
                        <Form.Label>Marque</Form.Label>
                        <Form.Control name="marqueCategorie" value={this.state.marqueCategorie} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="modeleCategorie">
                        <Form.Label>modele</Form.Label>
                        <Form.Control name="modeleCategorie" value={this.state.modeleCategorie} onChange={this.handleChange} required />
                    </Form.Group>

                    <Button type="submit" style={{ width:'180px', margin:5 }}>{pageName}</Button> 
                    <button type="button" class="btn btn-secondary" style={{ width:'180px', margin:5 }} 
                        onClick={() => this.props.history.push('/categories')} >Annuler</button>
 
                </Form>
            </Container>
        )
    }
}
