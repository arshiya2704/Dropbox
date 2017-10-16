import React, {Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import img from '../img.png';
import imgerr from '../error.png';

class Error extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="card card-size mx-auto p-5">
                    <div className="row">
                        <div className="col-sm- col-md-6">
                            <img src={img} alt="logo"/>
                        </div>
                        <div className="col-sm-4 col-md-4">
                            <img src={imgerr} alt="error" height={20}/>
                            <label className="text-danger">First Name,Email and Password are mandatory fields</label><br/><br/>
                            <Link to="/register">Go back</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Error);