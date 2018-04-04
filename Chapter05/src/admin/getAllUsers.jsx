import React, { Component } from 'react';
// import firebase from '../firebase/firebase-config';

class AppUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      search:''
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
  }
  deleteUser(uid){
    console.log(uid,"delete user");
    fetch('http://localhost:3000/deleteUser', {
        method: 'POST', // or 'PUT'
        body:JSON.stringify({uid:uid}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
  }
  viewProfile(uid){
    console.log(uid,"view profile");
    fetch('http://localhost:3000/getUserProfile', {
        method: 'POST', // or 'PUT'
        body:JSON.stringify({uid:uid}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response.data,"User Profile");
        })
  }
  componentDidMount() {
    fetch('http://localhost:3000/users', {
        method: 'GET', // or 'PUT'
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response,"after token valid");
          this.setState({
              users:response
          })
          console.log(this.state.users,'All Users');
    })
  }
  render() {
      var marginRight = {marginRight:'10px'};
    return (
        <div>
        <form className="form-inline">
            <div className="form-group" style={marginRight}>
                <input type="text" id="search" className="form-control"
                placeholder="Search user" value={this.state.search} required />
            </div>
            <select className="form-control" style={marginRight}>
                <option value="email">Search by Email</option>
                <option value="phone">Search by Phone Number</option>
            </select>
            <button className="btn btn-primary btn-sm">Search</button>
        </form>
        
        <table className="table">
        <thead>
        <tr> 
            <th>Email</th>
            <th>Name</th> 
            <th>Last Sign in Time</th> 
            <th>Creation Time</th>
            <th>Action</th> 
        </tr>
        </thead>
        <tbody>
              {
                this.state.users.length > 0 ?
                this.state.users.map((list,index) => {
                return (
                  <tr key={list.uid}>
                    <td>{list.email}</td>
                    <td>{list.displayName}</td> 
                    <td>{list.metadata.lastSignInTime}</td> 
                    <td>{list.metadata.creationTime}</td> 
                    <td>
                      
                    <button className="btn btn-sm btn-primary" type="button" style={marginRight} onClick={()=>{this.deleteUser(list.uid)}}>Delete User</button>
                    <button className="btn btn-sm btn-primary" type="button" onClick={()=>{this.viewProfile(list.uid)}}>View Profile</button>
                    </td> 
                  </tr>
                )
              }) :
              <tr>
                <td colSpan="5" className="text-center">No users found.</td>
              </tr>
            }
        </tbody>
        </table>
        </div>
    );
  }
}

export default AppUsers;
