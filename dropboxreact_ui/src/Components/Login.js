import React, {Component} from 'react';
import {Route,withRouter,Link} from 'react-router-dom';
import * as API from '../api/API';
import Register from "./Register"
import logo from '../logo.png';
import img from '../img.png';
import Welcome from "./Welcome";
import Error from "./Error";
import Error1 from "./Error1"

class Login extends Component {
    constructor() {
        super();
    this.state = {
        tag:'',
        userData: {
            email: '',
            password: ''
        }
    }};
    handleChange (propertyName, event) {
        const userData = this.state.userData;
        userData[propertyName] = event.target.value;
        this.setState({ userData: userData });
    }

    handleSubmit = (userdata) => {
        if(userdata.userData.email === '' || userdata.userData.password === '') {
            this.props.history.push("/error");
        }
        else{
        API.login(userdata)
            .then((res) => {
            console.log(res);
                if (res.message === 'logged in'){
                    this.props.history.push("/welcome");
                    this.setState({tag:res.email});
                }
                else alert(res.message);
            });}
    };
    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col xs={4} sm={4} md={4} lg={4}">
                        <h1 className="text-center">
                            <img src={logo} alt="logo" />Dropbox
                        </h1>
                        <hr/>
                    </div>
                </div>
                <Route exact path="/" render={() => (
                    <div className="card card-size mx-auto p-5">
                        <div className="row">
                            <div className="col-sm- col-md-6">
                                <img src={img} alt="logo"/>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <Link to="/register">create an account</Link><br/><br/>
                                OR
                                <hr/>
                                <form action="">
                                    <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.userData.email}/><br/>
                                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.userData.password}/><br/>
                                    <button className="btn btn-primary" type="submit" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}/>
                <Route exact path="/register" render={() => (
                    <div>
                        <Register/>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <div>
                        Welcome: {this.state.tag}
                        <Welcome tag={this.state.tag}/>
                    </div>
                )}/>
                <Route exact path="/error" render={() => (
                    <div>
                        <Error/>
                    </div>
                )}/>
                <Route exact path="/error1" render={() => (
                    <div>
                        <Error1/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(Login);