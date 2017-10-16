import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import img from '../img.png';
import * as API from '../api/API';

class Info extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                Email: '',
                Work: '',
                Edu: '',
                Interest: ''
            }
        }};
    handleChange (propertyName, event) {
        this.state.Email=this.props.tag;
        const formData = this.state.formData;
        formData[propertyName] = event.target.value;
        this.setState({ formData: formData });
    }

    handleSubmit = (formdata) => {
            API.update(formdata)
                .then((res) => {
                    console.log(res);
                    alert(res.message);
                });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="card card-size mx-auto p-5">
                    <div className="row">
                        <div className="col-sm- col-md-6">
                            <img src={img} alt="logo"/>
                        </div>
                        <div className="col-sm-4 col-md-4">
                            Update account info
                            <hr/>
                            <form action="">
                                <input type="text" className="form-control"  value={this.props.tag}/><br/>
                                <input type="text" className="form-control" placeholder="Work Experience" onChange={this.handleChange.bind(this, 'Work')} value={this.state.formData.Work}/><br/>
                                <input type="text" className="form-control" placeholder="Education" onChange={this.handleChange.bind(this, 'Edu')} value={this.state.formData.Edu}/><br/>
                                <input type="text" className="form-control" placeholder="Interests" onChange={this.handleChange.bind(this, 'Interest')} value={this.state.formData.Interest}/><br/><br/>
                                <button type="submit" className="btn btn-primary" onClick={(e) => (e.preventDefault(), this.handleSubmit(this.state))}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Info);