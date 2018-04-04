import React, { Component } from 'react';
import firebase from '../firebase/firebase-config';

class GetAllTickets extends Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({
        [event.target.id]: event.target.value
    });
  }
  componentWillMount() {
      console.log("sdfsdf");
    const itemsRef =  firebase.database().ref('/helpdesk/tickets').child('all')
    console.log(itemsRef);
    itemsRef.on('value', (snapshot) => {
      let tickets = snapshot.val();
      console.log(tickets)
      if(tickets != null){
        let ticketKeys = Object.keys(tickets);
        let newState = [];
        for (let ticket in tickets) {
          newState.push({
            id:ticketKeys,
            email:tickets[ticket].email,
            issueType:tickets[ticket].issueType,
            department:tickets[ticket].department,
            comments:tickets[ticket].comments,
            status:tickets[ticket].status,
            date:tickets[ticket].date
        });
      }
        this.setState({
          tickets: newState
        });
      }
    });
  }
  render() {
    return (
        <table className="table">
        <thead>
        <tr> 
            <th>Email</th>
            <th>Issue Type</th> 
            <th>Department</th> 
            <th>Comments</th>
            <th>Status</th>  
            <th>Creation Date</th>
        </tr>
        </thead>
        <tbody>
              {
                this.state.tickets.length > 0 ?
                this.state.tickets.map((item,index) => {
                return (
                  <tr key={item.id[index]}>
                    <td>{item.email}</td>
                    <td>{item.issueType}</td> 
                    <td>{item.department}</td> 
                    <td>{item.comments}</td>
                    <td>
                    <select className="form-control" id="status" value={item.status} required onChange={this.handleChange}>
                        <option value="select">Select</option>
                        <option value="reolved">Reolved</option>
                        <option value="progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                    </td>  
                    <td>{item.date}</td>
                  </tr>
                )
              }) :
              <tr>
                <td colSpan="5" className="text-center">No tickets found.</td>
              </tr>
            }
        </tbody>
        </table>
    );
  }
}

export default GetAllTickets;
