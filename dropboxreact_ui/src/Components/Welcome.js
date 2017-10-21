import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import ImageGridList from "../Components/ImageGridList";
import logo2 from '../logo2.png';


class Welcome extends Component {

    handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        payload.append('owner',this.state.owner);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                            this.init();
                        });
                }
            });

    };

    handleDirectory(){
        const payload = new FormData();
        payload.append('owner',this.state.owner);
        payload.append('dirName',this.state.dirName);
        API.createDirectory(payload).then((status) => {
            if (status === 204) {
                API.getImages()
                    .then((data) => {
                        this.setState({
                            files: data
                        });
                        this.init();
                    });
            }
        });

    };

    constructor() {
        super();
        this.state = {
            files: [],
            tag:'',
            dirName:'',
            owner:''
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
                owner:res.owner
            });
            var owner1 = res.owner;
            if (!this.state.files || this.state.files.length === 0) {
                API.getImages({value: owner1})
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
                Welcome: {this.state.owner}
                    <div className="row">
                        <div className="col-md-2">
                            <nav className="navbar navbar-custom">
                                <br/>
                                <br/>
                                <img src={logo2} alt="logo"/>
                                <br/>
                                <br/>
                                <br/>
                                Home
                                <br/>
                                <br/>
                                <div className="fileinput fileinput-new" data-provides="fileinput">
                                    <span className="btn btn-info btn-file file-upload"><span>Choose file</span><input type="file" name="mypic" onChange={this.handleFileUpload}/></span>
                                </div>
                                <br/>
                                <br/>
                                <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Create Folder</button>
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
                            </nav>
                        </div>
                        <div>
                            <button type="button" style={buttons} className="btn btn-link" onClick={() => this.logOut()}>Sign out</button><br/><br/>
                            <Link to="/info" style={buttons} >Update info</Link><br/><br/><br/><br/>
                            <ImageGridList files={this.state.files}/>
                        </div>
                    </div>
            </div>

        );

    }

}


export default withRouter(Welcome);