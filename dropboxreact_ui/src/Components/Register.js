import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../img.png';
import * as API from '../api/API';

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
            <div className="container-fluid">
                <div className="card card-size mx-auto p-5">
                    <div className="row">
                        <div className="col-sm- col-md-6">
                            <img src={img} alt="logo"/>
                        </div>
                        <div className="col-sm-4 col-md-4">
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
                </div>
            </div>
        );
    }
}

export default withRouter(Register);