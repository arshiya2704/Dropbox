import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import * as API from '../api/API';
import TextField from 'material-ui/TextField';
import ImageGridList from "../Components/ImageGridList";


class Welcome extends Component {
    handleFileUpload = (event) => {

        const payload = new FormData();
        var owner = this.props.tag;
        payload.append('mypic', event.target.files[0]);
        payload.append('owner',owner);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                files: data
                            });
                        });
                }
            });

    };

    handleDirectory(){
        var owner =this.props.tag;
        const payload = new FormData();
        payload.append('owner',owner);
        payload.append('dirName',this.state.dirName);
        API.createDirectory(payload).then((status) => {
            if (status === 204) {
                API.getImages()
                    .then((data) => {
                        this.setState({
                            files: data
                        });
                    });
            }
        });

    };
    constructor() {
        super();
        this.state = {
            files: [],
            tag:'',
            dirName:''
        };
    }
    handleChange (propertyName, event) {
        const val = this.state;
        val[propertyName] = event.target.value;
        this.setState({ val: val });
    }

    componentDidUpdate() {
        var owner1 = this.props.tag;
if(!this.state.files || this.state.files.length===0)
{
    API.getImages({value: owner1})
        .then((data) => {
            console.log(data);
            this.setState({
                files: data

            });
        });
}


    };

    render() {

        var btnstyle={
            float: 'right',
            marginLeft: '900px'
        };
        var uploadstyle={
            float:'right',
            marginRight:'10px',
            marginTop:'200px'
        };
        return (
            <div className="container-fluid">
                <div className="container-fluid">
                        <div className="row">
                            <div>
                                <Link to="/" style={btnstyle}>Sign out</Link>
                                <Link to="/info" style={btnstyle}>Update info</Link>
                                <TextField
                                    className={'fileupload'}
                                    type="file"
                                    name="mypic"
                                    onChange={this.handleFileUpload}
                                    style={uploadstyle}
                                />
                                <ImageGridList files={this.state.files}/>
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
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default Welcome;