import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../img.png';
import * as API from '../api/API';
import logo from '../logo.png';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                Fname: '',
                Lname: '',
                email: '',
                password: ''
            }
        }};
    handleChange (propertyName, event) {
        const formData = this.state.formData;
        formData[propertyName] = event.target.value;
        this.setState({ formData: formData });
    }

    handleSubmit = (formdata) => {
        if(formdata.formData.Fname === '' || formdata.formData.email === '' || formdata.formData.password === '' ) {
            this.props.history.push("/error1");
        }
        else{
            API.register(formdata)
                .then((res) => {
                    console.log(res);
                    alert(res.message);
                    this.props.history.push("/");
                });}
    };

    render() {
        return (
                <div className="row justify-content-md-center">
                    <div className="col">
                        <h1 className="text-center">
                            <img src={logo} alt="logo"/>Dropbox
                        </h1>
                        <hr/>
                    </div>
                    <div className="col-md-3 col-md-offset-3 col-sm-5 col-sm-offset-1 col-xs-6">
                        <img src={img} className="img-responsive" alt="logo"/>
                    </div>
                    <div className="col-md-4 col-md-offset-0 col-sm-5 col-sm-offset-0 col-xs-6">
                        Create an account
                        <hr/>
                        <form action="">
                            <input type="text" className="form-control" placeholder="First name" onChange={this.handleChange.bind(this, 'Fname')} value={this.state.formData.Fname}/><br/>
                            <input type="text" className="form-control" placeholder="Surname" onChange={this.handleChange.bind(this, 'Lname')} value={this.state.formData.Lname}/><br/>
                            <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.formData.email}/><br/>
                            <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange.bind(this, 'password')} value={this.state.formData.password}/><br/><br/>
                            <button type="submit" className="btn btn-primary" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Create an account</button>
                        </form>
                    </div>
                </div>
        );
    }
}

export default withRouter(Register);