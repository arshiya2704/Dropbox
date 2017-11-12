import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../img.png';
import * as API from '../api/API';
import '../App.css';
import logo2 from '../logo2.png';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Logs extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         formData: {
    //             Email: '',
    //             Work: '',
    //             Edu: '',
    //             Interest: ''
    //         },
    //         owner:'',
    //     };
    //     this.init();
    // };

    render() {

        var buttons={
            color : "skyblue"
        };

        var logStyle ={
          float: 'left'
        };
        // console.log(this.props.location.state.logVal);
        const logs1= this.props.location.state.logVal;
        //const logs1 =[{action:1},{action:2},{action:3}];
        const logList = logs1.map((log) =>
                        <div>
                            <div style={buttons} className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                <span className="glyphicon glyphicon-check" aria-hidden="true"></span>
                            </div>
                            <div style={logStyle} className="col-lg-10 col-md-10 col-sm-10 col-xs-10 left">
                                <p>{log.action}</p>
                                {}
                            </div>
                            <br/>
                            <hr/>
                        </div>
        );
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3">
                        <nav className="navbar navbar-custom">
                            <br/>
                            <br/>
                            <br/>
                            <img className="img-responsive center-block" src={logo2} alt="logo"/>
                            <br/>
                            <br/>
                        </nav>
                    </div>
                    <br/>
                    <br/>
                    <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <h4>Activities</h4>
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                        {logList}
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default withRouter(Logs);