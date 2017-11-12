import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../img.png';
import * as API from '../api/API';
import logo from '../logo.png';
import '../App.css';
import ImageGridList from "../Components/ImageGridList";
import logo2 from '../logo2.png';
import dropbox from '../dropbox.png';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import StarList from "../Components/StarList";



class Info extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                Email: '',
                Work: '',
                Edu: '',
                Interest: ''
            },
            owner:'',
        };
        this.init();
    };
    handleChange (propertyName, event) {
        this.state.Email=this.state.owner;
        const formData = this.state.formData;
        formData[propertyName] = event.target.value;
        this.setState({ formData: formData });
    }

    handleSubmit = (formdata) => {
            API.update(formdata)
                .then((res) => {
                    console.log(res);
                    NotificationManager.success('', res.message, 1000);
                });
    };
    init() {
        console.log("update check");
        API.checkSession().then((res) => {
            if (res.status === 500){
                this.props.history.push("/");
            }
            else if(res.status === 200) {
                this.setState({
                    owner:res.owner,
                    formData:{
                        Work: res.work,
                        Edu: res.edu,
                        Interest : res.interest
                    }
                });
            }});
    }

    render() {
        var buttons={
            float:"right"
        };
        var textField={
          float:"left"
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
                        <h4 className="text-primary">Info</h4>
                    </nav>
                </div>
                <br/>
                <br/>
                <div className="col-lg-8 col-md-8 col-sm-6 col-xs-6">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <h4>Personal Info</h4>
                    </div>
                    <br/>
                    <br/>
                    <hr/>
                    <div className="col-lg-3" style={textField}>
                        <h5 className="text-primary">Email:</h5>
                        <input className="form1" type="text" value={this.state.owner} disabled={true}/>
                        <br/>
                        <br/>
                        <h5 className="text-primary">Work:</h5>
                        <input className="form1" type="text" value={this.state.formData.Work} disabled={true}/>
                        <br/>
                        <br/>
                        <h5 className="text-primary">Edu:</h5>
                        <input className="form1" type="text" value={this.state.formData.Edu} disabled={true}/>
                        <br/>
                        <br/>
                        <h5 className="text-primary">Interest:</h5>
                        <input className="form1" type="text" value={this.state.formData.Interest} disabled={true}/>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <button className="btn btn-circle btn-block dropdown-toggle" id="menu1" type="button" style={buttons} data-toggle="modal" data-target="#myModal_edit">
                        </button><br/><br/>
                    <h6 style={buttons}>Click to edit</h6>
                    <div className="modal fade" id="myModal_edit" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Enter New Info</h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Work Experience" onChange={this.handleChange.bind(this, 'Work')} value={this.state.formData.Work}/><br/>
                                            <input type="text" className="form-control" placeholder="Education" onChange={this.handleChange.bind(this, 'Edu')} value={this.state.formData.Edu}/><br/>
                                            <input type="text" className="form-control" placeholder="Interests" onChange={this.handleChange.bind(this, 'Interest')} value={this.state.formData.Interest}/><br/><br/>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Update</button>
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

export default withRouter(Info);