import React, { Component } from 'react';
// import firebase from '../firebase/firebase-config';
import { ToastDanger,ToastSuccess } from 'react-toastr-basic';

class ProfileUpdateForm extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(props.userInfo);

    this.state={
      uId:props.userId,
      name:props.displayName,
      email:props.email,
      password:props.password,
      phoneNumber:props.phoneNumber
    }
  }
  
  handleChange(event) {
    this.setState({
        [event.target.id]: event.target.value
    });
  }
  
  handleSubmitEvent(e) {
    e.preventDefault();
    //React form data object
    const userId = this.state.uId; 
    var data = {
        displayName: this.state.name,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber,
        photoURL: this.fileInput.files[0]
    }
    console.log(data);

    fetch('http://localhost:3000/updateUserProfile', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({data:data,userId:userId}), 
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => { console.error('Error:', error);
            ToastDanger(error);
        })
        .then(res => {
          console.log(res,"after token valid");
          ToastSuccess(res.msg);
    })
  }
  render() {
    var style = {color: "#ffaaaa"};
    return (
      <form onSubmit={this.handleSubmitEvent}>
      <div className="form-group">
          <label htmlFor="name">Display Name <span style={style}>*</span></label>
            <input type="text" id="name" className="form-control"
                placeholder="Enter your name" value={this.state.name} required onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email <span style={style}>*</span></label>
            <input type="text" id="email" className="form-control"
                placeholder="Enter email" value={this.state.email} disabled required onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password <span style={style}>*</span></label>
            <input type="password" id="password" className="form-control"
                placeholder="Enter your password" value={this.state.password} required onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number <span style={style}>*</span></label>
            <input type="text" id="phoneNumber" className="form-control"
                placeholder="Enter your phone number" value={this.state.phoneNumber} required onChange={this.handleChange}/>
        </div>
        <div className="form-group">
        <label htmlFor="Image">Profile Image
        <span style={style}> *</span></label>
            <image src={this.state.profileImage} width="100" />
            <input  type="file" ref={input => { this.fileInput = input; }} />
        </div>
        <div className="btn-group">
            <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
}

export default ProfileUpdateForm;
