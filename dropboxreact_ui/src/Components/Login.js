import React, {Component} from 'react';
import {Route,withRouter,Link} from 'react-router-dom';
import * as API from '../api/API';
import Register from "./Register"
import logo from '../logo.png';
import img from '../img.png';
import Welcome from "./Welcome";
import Error from "./Error";
import Error1 from "./Error1";
import Info from "./Info";
import Folder from "./Folder";
import Logs from "./Logs";


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
                    this.setState(
                        {
                            tag : res.email
                        });
                    this.props.history.push("/welcome");
                }
                else alert(res.message);
            });}
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div className="row justify-content-md-center">
                        <div className="col">
                            <h1 className="text-center">
                                <img src={logo} alt="logo"/>Dropbox
                            </h1>
                            <hr/>
                        </div>
                        <div className="col-md-3 col-md-offset-3 col-sm-5 col-sm-offset-1 col-xs-6">
                            <img src={img} className="img-responsive" alt="logo" />
                        </div>
                        <div className="col-md-4 col-md-offset-0 col-sm-5 col-sm-offset-0 col-xs-6">
                            <Link to="/register">create an account</Link><br/><br/>
                            OR
                            <hr/>
                            <form action="" className="form-group">
                                <input type="email" className="form-control" placeholder="Email" onChange={this.handleChange.bind(this, 'email')} value={this.state.userData.email}/><br/>
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleChange.bind(this, 'password')} value={this.state.userData.password}/><br/>
                                <button className="btn btn-primary" type="submit" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Sign In</button>
                            </form>
                        </div>
                    </div>
                )}/>
                <Route exact path="/register" render={() => (
                    <div>
                        <Register/>
                    </div>
                )}/>
                <Route exact path="/welcome/" render={() => (
                    <div>
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
                <Route exact path="/info" render={() => (
                    <div>
                        <Info tag={this.state.tag}/>
                    </div>
                )}/>
                <Route exact path="/welcome/:folder" render={() => (
                    <div>
                        <Folder/>
                    </div>
                )}/>
                <Route exact path="/logs" render={() => (
                    <div>
                        <Logs/>
                    </div>
                )}/>

            </div>
        );
    }
}

export default withRouter(Login);