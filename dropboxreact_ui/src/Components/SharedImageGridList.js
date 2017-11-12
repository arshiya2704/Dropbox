import React, {Component} from 'react';
import * as API from '../api/API';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Route,withRouter,Link} from 'react-router-dom';

class SharedImageGridList extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            fileName: '',
            path:'/welcome/',
            parent:'root',
            fileId:''
        };
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
                (file.fileId.fileType ==='F') ?
                    <li key={file.name}>{
                        <div>
                            <span style={fileStyle} className="glyphicon glyphicon-file" aria-hidden="true"></span>
                            <p style={fileName}>{file.fileId.name}</p>
                            <br/>
                            <hr/>
                            <NotificationContainer/>
                        </div>}
                    </li>:
                    <li key={file.name}>{
                        <div>
                            <span style={fileStyle} className="glyphicon glyphicon-folder-close" aria-hidden="true" role="button"  onClick={() => this.push(file.fileId._id)}></span>
                            <p style={fileName}>{file.fileId.name}</p>
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


export default withRouter(SharedImageGridList);