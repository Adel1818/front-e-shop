import React, { Component } from "react";
import axios from 'axios';
 
export default class Login extends Component {

    state = {
        email: '',
        password: '',
        error: 0
    }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }


    handleSubmit = event => {
        event.preventDefault(); 
 
        axios.get(process.env.REACT_APP_API_END_POINT_URI + `/api/login/`+this.state.email+`/`+this.state.password)
          .then(res => {
 
            if(res.data == 1)
            {
                this.props.history.push("/produits" );
                window.location.reload();
            }
            else
            {
                this.setState({ error: 1 })
            }
 
          })
     
    }
 
    render() {
        return (
            <form style={{width:400, margin: '100px auto'}}  onSubmit={this.handleSubmit}>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password"  className="form-control" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" />
                </div>
                                                                                                                                                    
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                                             
                <button type="submit" className="btn btn-dark btn-lg btn-block" >Sign in</button>
                <br/>
                
         
                <div className={!this.state.error ? 'hidden  alert alert-danger' : 'alert alert-danger'} role="alert">
                  Email ou mot de passe incorrect.
                </div>
                
                
                
            </form>
        );
    }
}