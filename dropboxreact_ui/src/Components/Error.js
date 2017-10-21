import React, {Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import img from '../img.png';
import imgerr from '../error.png';
import logo from '../logo.png';

class Error extends Component {

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="col">
                    <h1 className="text-center">
                        <img src={logo} alt="logo"/>Dropbox
                    </h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-md-3 col-md-offset-3 col-sm-5 col-sm-offset-1 col-xs-6">
                        <img src={img} className="img-responsive" alt="logo"/>
                    </div>
                    <div className="col-md-4 col-md-offset-0 col-sm-5 col-sm-offset-0 col-xs-6">
                        <img src={imgerr} alt="error" height={20}/>
                        <label className="text-danger">Enter values</label><br/><br/>
                        <Link to="/">Go back</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Error);