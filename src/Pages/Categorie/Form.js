import React from 'react';
import { Container , Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';


export default class Create extends React.Component {

    state = {
        codeCateg: '',
        libelleCateg: '',
        urlElements: ''
    }
 
    componentDidMount() {
        let urlElements = window.location.href.split('/').pop()
        this.setState({ urlElements })
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/categories/`+urlElements)
          .then(res => {
            const categorie = res.data;
            console.log(categorie);
            this.setState(categorie);
        })
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
 
    handleSubmit = event => {
        event.preventDefault();

        let categorie = {
          codeCateg: this.state.codeCateg,
          libelleCateg: this.state.libelleCateg,
        };

        if(this.state.urlElements != "create")
        {
            categorie.idCateg = this.state.urlElements
        }
    
        axios.post(process.env.REACT_APP_API_END_POINT_URI + `/api/categories`, categorie)
          .then(res => {
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
                <h1>{pageName} catégorie</h1>

                <Form style={{ margin: '50px', maxWidth:'600px' }} onSubmit={this.handleSubmit} >

                    <Form.Group controlId="codeCateg">
                        <Form.Label>Code</Form.Label>
                        <Form.Control name="codeCateg" value={this.state.codeCateg} onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="libelleCateg">
                        <Form.Label>Libellé </Form.Label>
                        <Form.Control name="libelleCateg" value={this.state.libelleCateg} onChange={this.handleChange} required />
                    </Form.Group>
 
                    <Button type="submit" style={{ width:'180px', margin:5 }}>{pageName}</Button> 
                    <button type="button" className="btn btn-secondary" style={{ width:'180px', margin:5 }} 
                        onClick={() => this.props.history.push('/categories')} >Annuler</button>
 
                </Form>
            </Container>
        )
    }
}
