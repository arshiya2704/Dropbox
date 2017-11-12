import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import SharedImageGridList from "../Components/SharedImageGridList";
import logo2 from '../logo2.png';
import dropbox from '../dropbox.png';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import StarList from "../Components/StarList";


class SharedFiles extends Component {

    constructor() {
        super();
        this.state = {
            files: [],
            dirName:'',
            owner:'',
            message:'',
            parent:'root',
            logs:[]
        };
        this.init();
    }


    init() {
        console.log("component check");
        API.checkSession().then((res) => {
            if (res.status === 500){
                this.props.history.push("/");
            }
            else if(res.status === 200) {
                this.setState({
                    owner:res.owner
                });
                var owner1 = res.owner;
                if (!this.state.files || this.state.files.length === 0) {
                    API.getSharedImages({value: owner1})
                        .then((data) => {
                            console.log(data);
                            this.setState({
                                files: data
                            });
                        });

                }
            }});
    }


    render() {
        var buttons={
            float:"right"
        };

        var logo={
            marginLeft : "2 rem"
        };
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
                            <h4 className="text-primary">Shared Files</h4>
                        </nav>
                    </div>
                    <br/>
                    <br/>
                    <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                            <h4>Files</h4>
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <SharedImageGridList files={this.state.files}/>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>

        );

    }

}


export default withRouter(SharedFiles);