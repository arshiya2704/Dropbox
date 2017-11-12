import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../Components/ImageGridList";
import logo2 from '../logo2.png';
import dropbox from '../dropbox.png';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import StarList from "../Components/StarList";


class Folder extends Component {

    handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        payload.append('owner',this.state.owner);
        payload.append('parent', this.props.location.state.parent);
        console.log(payload);
        API.uploadFile(payload)
            .then((res) => {
                if (res.status === 200) {
                    NotificationManager.success('', res.message , 1000);
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
                else{
                    NotificationManager.error('', res.message , 1000);
                }
            });
        setTimeout(function(){
            window.location.reload(1);
        }, 500);
    };

    handleDirectory = () =>{
        const payload = new FormData();
        payload.append('owner',this.state.owner);
        payload.append('dirName',this.state.dirName);
        payload.append('parent', this.props.location.state.parent);
        API.createDirectory(payload).then((res) => {
            if (res.status === 200) {
                NotificationManager.success('', res.message , 1000);
                API.getImages()
                    .then((data) => {
                        this.setState({
                            files: data,
                        });
                    });
            }
            else{
                NotificationManager.error('', res.message , 1000);
            }
        });
        setTimeout(function(){
            window.location.reload(1);
        }, 500)
    };

    constructor() {
        super();
        this.state = {
            files: [],
            dirName:'',
            owner:'',
            message:'',
            parent:''
        };
        this.init();
    }

    handleChange (propertyName, event) {
        const val = this.state;
        val[propertyName] = event.target.value;
        this.setState({ val: val });
    }

    logOut(){
        API.logOut().then((res) => {
            if(res.status === 200){
                this.props.history.push("/");
            }
        });
    }

    init() {
        console.log("component check");
        API.checkSession().then((res) => {
            if (res.status === 500){
                this.props.history.push("/");
            }
            else if(res.status === 200) {
                this.setState({
                    owner:res.owner,
                    parent: this.props.location.state.parent
                });
                var owner1 = res.owner;
                if (!this.state.files || this.state.files.length === 0) {
                    API.getImages({value: owner1, parent:this.state.parent})
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
                            <h4 className="text-primary">Home</h4>
                        </nav>
                    </div>
                    <br/>
                    <br/>
                    <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            <h4>Home</h4>
                            <br/>
                            {/*<h5 className="text-muted">Starred</h5>*/}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <hr/>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/*<StarList files={this.state.files}/>*/}
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                            <h5 className="text-muted">Files</h5>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <hr/>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <ImageGridList files={this.state.files}/>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <div className="dropdown">
                            <button className="btn btn-circle btn-block dropdown-toggle" id="menu1" type="button" style={buttons} data-toggle="dropdown">
                            </button>
                            <br/>
                            <br/>
                            <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1" >
                                <img src ={dropbox} className="img-responsive" alt="profile"/>
                                <br/>
                                <br/>
                                {this.state.owner}
                                <br/>
                                <li role="presentation" class="divider"></li>
                                <Link to="/info">Show info</Link><br/>
                                <button type="button" className="btn btn-link" onClick={() => this.logOut()}>Sign out</button>
                            </ul>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                            <span className="btn btn-primary btn-file file-upload"><span>Upload Files</span><input type="file" name="mypic" onChange={this.handleFileUpload}/></span>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <button type="button" className="btn btn-primary btn-block" style={buttons} data-toggle="modal" data-target="#myModal">Create Folder</button>
                            <div className="modal fade" id="myModal" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title">Enter Directory Name</h4>
                                        </div>
                                        <div className="modal-body">
                                            <form className="form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" onChange={this.handleChange.bind(this, 'dirName')} value={this.state.dirName}></input>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.handleDirectory()}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>

        );

    }

}


export default withRouter(Folder);