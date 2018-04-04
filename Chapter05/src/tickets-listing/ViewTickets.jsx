import React, { Component } from 'react';
import firebase from '../firebase/firebase-config';

class ViewTicketTable extends Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    }
  }

  componentDidMount() {
    const itemsRef =  firebase.database().ref('/helpdesk/tickets/'+this.props.userId);

    itemsRef.on('value', (snapshot) => {
      let tickets = snapshot.val();
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
    // firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
    //   // Send token to your backend via HTTPS
    //   // ...
    //   console.log(idToken);
    // }).catch(function(error) {
    //   // Handle error
    // });
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
            <th>Date</th> 
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
                    <td>{item.status === 'progress'?'In Progress':''}</td>  
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

export default ViewTicketTable;
