import React, { Component } from 'react';
// import firebase from '../firebase/firebase-config';
import { ToastDanger,ToastSuccess } from 'react-toastr-basic';

class AddNewUserForm extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      email:'',
      password:'',
      phoneNumber:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({
        [event.target.id]: event.target.value
    });
  }
  
  handleSubmitEvent(e) {
    e.preventDefault();
    //React form data object
    var data = {
      email:this.state.email,
      emailVerified: false,
      password:this.state.password,
      displayName:this.state.name,
      phoneNumber:this.state.phoneNumber,
      profilePhoto:this.fileInput.files[0],
      disabled: false
    }
    fetch('http://localhost:3000/createNewUser', {
        method: 'POST', // or 'PUT'
        body:JSON.stringify({data:data}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => { 
          ToastDanger(error)
        })
        .then(response => {
          ToastSuccess(response.msg)
          this.setState({
            name:'',
            email:'',
            password:'',
            phoneNumber:''
          });
          this.fileInput = '';
      });
  }
  render() {
    return (
        <div>
        <form className="form" onSubmit={this.handleSubmitEvent}>
            <div className="form-group">
                <input type="text" id="name" className="form-control"
                placeholder="Enter Employee Name" value={this.state.name} required onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <input type="text" id="email" className="form-control"
                placeholder="Employee Email ID" value={this.state.email} required onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <input type="password" id="password" className="form-control"
                placeholder="Application Password" value={this.state.password} required onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <input type="text" id="phoneNumber" className="form-control"
                placeholder="Employee Phone Number" value={this.state.phoneNumber} required onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <input  type="file" ref={input => { this.fileInput = input; }} />
            </div>
            <button className="btn btn-primary btn-sm">Submit</button>
        </form>
        </div>
    );
  }
}

export default AddNewUserForm;
