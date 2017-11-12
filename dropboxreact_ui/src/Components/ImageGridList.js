import React, {Component} from 'react';
import * as API from '../api/API';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Route,withRouter,Link} from 'react-router-dom';

class ImageGridList extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            fileName: '',
            path:'/welcome/',
            parent:'root'
        };
    }

    handleShare= (fileName, event) => {
        const email = this.state.email;
        API.share({fileName,email})
            .then((res) => {
                if (res.status === 200) {
                    NotificationManager.success('', res.message, 1000);
                }
                else{
                    NotificationManager.info('', res.message, 1000);
                }
            });
        setTimeout(function(){
            window.location.reload(1);
        }, 500);

    };

    delete= (fileName, owner) =>{
        console.log(fileName);
        API.del({fileName,owner})
            .then((res) => {
                if (res.status === 200) {
                    NotificationManager.success('', res.message, 1000);
                    setTimeout(function(){
                        window.location.reload(1);
                    }, 2000)

                }
            });

    };

    star (fileName, starVal, glyphVal, owner) {
        console.log(fileName);
        console.log(starVal);
        console.log(glyphVal);
        API.star({fileName, starVal,glyphVal, owner})
            .then((res) => {
                if (res.status === 200) {
                    NotificationManager.success('', res.message, 1000);
                }
                else{
                    NotificationManager.info('', res.message, 1000);
                }
            });
        setTimeout(function(){
            window.location.reload(1);
        }, 500);
  }

    handleChange (propertyName, event) {
        const val = this.state;
        val[propertyName] = event.target.value;
        this.setState({ val: val });
    }

    change(fileName){
        this.setState({
            fileName: fileName
        });
    }
    push(id){

        this.setState({
            parent: id,
            path: this.state.path + id
        },() => { this.props.history.push(
            {
                pathname: "/welcome/"+this.state.parent,
                state: { parent: id }
            });
        });

        setTimeout(function(){
            window.location.reload(1);
        }, 500)
    }

    render(){

        var fileStyle={
            float:'left',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };

        var fileStyle1={
            float:'right',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };

        var fileName={
            float: 'left',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '5px'
        };

        const files= this.props.files;
        console.log(files);

        const fileList = files.map((file) =>
            (1)?
            (file.fileType ==='F') ?
                <li key={file.name}>{
            <div>
                <span style={fileStyle} className="glyphicon glyphicon-file" aria-hidden="true"></span>
                <p style={fileName}>{file.name}</p>
                <span id="star" className={file.glyphVal} style={fileStyle} aria-hidden="true" role="button" onClick={() => this.star(file.name, file.starVal, file.glyphVal,file.owner)}></span>
                <span className="glyphicon glyphicon-trash" style={fileStyle1} aria-hidden="true" role="button" data-toggle="modal"  data-target="#myModal_delete" onClick={() => this.change(file.name)}></span>
                <div className="modal fade" id="myModal_delete" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Are you sure you want to remove {this.state.fileName}?</h4>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.delete(this.state.fileName,file.owner)} >Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="glyphicon glyphicon-share" style={fileStyle1} aria-hidden="true" role="button" data-toggle="modal" data-target="#myModal_share" onClick={() => this.change(file.name)}></span>
                <div className="modal fade" id="myModal_share" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Enter Recipient's Email</h4>
                            </div>
                            <div className="modal-body">
                                <form className="form">
                                    <div className="form-group">
                                        <input type="text" className="form-control" onChange={this.handleChange.bind(this, 'email')} value={this.state.email}></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.handleShare(this.state.fileName)}>Share</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <hr/>
                <NotificationContainer/>
            </div>}
                </li>:
                <li key={file.name}>{
                <div>
                    <span style={fileStyle} className="glyphicon glyphicon-folder-close" aria-hidden="true" role="button"  onClick={() => this.push(file.id)}></span>
                    <p style={fileName}>{file.name}</p>
                    <span id="star" className={file.glyphVal} style={fileStyle} aria-hidden="true" role="button" onClick={() => this.star(file.name,file.starVal,file.glyphVal,file.owner)}></span>
                    <span className="glyphicon glyphicon-trash" style={fileStyle1} aria-hidden="true" role="button" data-toggle="modal"  data-target="#myModal_delete" onClick={() => this.change(file.name)} ></span>
                    <div className="modal fade" id="myModal_delete" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Are you sure you want to remove {this.state.fileName}?</h4>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.delete(this.state.fileName, file.owner)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="glyphicon glyphicon-share" style={fileStyle1} aria-hidden="true" role="button" data-toggle="modal" data-target="#myModal_share" onClick={() => this.change(file.name)}></span>
                    <div className="modal fade" id="myModal_share" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Enter Recipient's Email</h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form">
                                        <div className="form-group">
                                            <input type="text" className="form-control" onChange={this.handleChange.bind(this, 'email')} value={this.state.email}></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.handleShare(this.state.fileName)}>Share</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <NotificationContainer/>
                </div>}</li>:
                file.fileType === '' ?
                    <div>
                    </div>:
                    <div></div>
        );

        {
                return(
                    <div>
                        <ul>{fileList}</ul>
                    </div>


                )

        }
    }


}


export default withRouter(ImageGridList);