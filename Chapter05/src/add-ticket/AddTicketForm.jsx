import React, { Component } from 'react';
import firebase from '../firebase/firebase-config';
import { ToastSuccess,ToastDanger } from 'react-toastr-basic';

class AddTicketForm extends Component {
  
  constructor(props) {
    super(props);
    this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log(props.userInfo);

    this.state={
      uId:props.userId,
      email:props.userInfo[0].email,
      issueType:"",
      department:"",
      comment:""
    }
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
    const userId = this.state.uId; 
    var data = {
      date: Date(),
      email:this.state.email,
      issueType:this.state.issueType,
      department:this.state.department,
      comments:this.state.comment,
      status:"progress"
    }

    console.log(data);

  var newTicketKey = firebase.database().ref('/helpdesk').child('tickets').push().key;
  // Write the new ticket data simultaneously in the tickets list and the user's ticket list.
  var updates = {};
  updates['/helpdesk/tickets/' + userId + '/' + newTicketKey] = data;
  updates['/helpdesk/tickets/all/'+ newTicketKey] = data;
  
  return firebase.database().ref().update(updates).then(()=>{
    ToastSuccess("Saved Successfully!!");
    this.setState({
      issueType:"",
      department:"",
      comment:""
    });
  }).catch((error)=>{
    ToastDanger(error.message);
  });

  }
  render() {
    var style = {color: "#ffaaaa"};
    return (
      <form onSubmit={this.handleSubmitEvent}>
        <div className="form-group">
          <label htmlFor="email">Email <span style={style}>*</span></label>
            <input type="text" id="email" className="form-control"
                placeholder="Enter email" value={this.state.email} disabled required onChange={this.handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="issueType">Issue Type <span style={style}> *</span></label>
            <select className="form-control" value={this.state.issueType} id="issueType" required onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="Access Related Issue">Access Related Issue</option>
                <option value="Email Related Issues">Email Related Issues</option>
                <option value="Hardware Request">Hardware Request</option>
                <option value="Health & Safety">Health & Safety</option>
                <option value="Network">Network</option>
                <option value="Intranet">Intranet</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div className="form-group">
        <label htmlFor="department">Assign Department
        <span style={style}> *</span></label>
            <select className="form-control" value={this.state.department} id="department" required onChange={this.handleChange}>
                <option value="">Select</option>
                <option value="Admin">Admin</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Development">Development</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="comments">Comments <span style={style}> *</span></label>
            (<span id="maxlength"> 200 </span> characters left)
            <textarea className="form-control" rows="3" id="comment" value={this.state.comment} onChange={this.handleChange} required></textarea>
        </div>
        <div className="btn-group">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="reset" className="btn btn-default">cancel</button>
        </div>
      </form>
    );
  }
}

export default AddTicketForm;
