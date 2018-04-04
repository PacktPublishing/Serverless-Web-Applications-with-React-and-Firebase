import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route 
} from 'react-router-dom'
import firebase from './firebase/firebase-config';
import ToastrContainer from 'react-toastr-basic';
import { ToastDanger } from 'react-toastr-basic';
import Header from './header/header.jsx';
import Home from './home/index.jsx';
import Login from './login/login.jsx';
import Logout from './logout/logout.jsx';
import AddTicketForm from './add-ticket/AddTicketForm.jsx';
import ViewTicketTable from './tickets-listing/ViewTickets.jsx';
import ProfileUpdateForm from './profile-update/profile-update';
import AppUsers from './admin/getAllUsers';
import GetAllTickets from './admin/tickets';
import AddNewUserForm from './admin/newUserForm';



class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated : false,
      data:'',
      userUid:'',
      role:{
        admin:false,
        type:''
      }
    }
  }
  getIdToken(user){
    return user.getIdToken(true);
  }
  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        console.log(user,"information");
        this.getIdToken(user).then((idToken)=>{
          console.log(idToken);
          fetch('http://localhost:3000/setCustomClaims', {
              method: 'POST', // or 'PUT'
              body: JSON.stringify({idToken:idToken}), 
              headers: new Headers({
                'Content-Type': 'application/json'
              })
            }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(res => {
                console.log(res,"after token valid");
                if(res.status === 'success' && res.role === 'admin'){
                  firebase.auth().currentUser.getIdToken(true);
                  this.setState({
                    authenticated:true,
                    data:user.providerData,
                    userUid:user.uid,
                    role:{
                      admin:true,
                      type:'admin'
                    }
                  })
                }
                else if (res.status === 'success' && res.role === 'employee'){
                  this.setState({
                    authenticated:true,
                    data:user.providerData,
                    userUid:user.uid,
                    role:{
                      admin:false,
                      type:'employee'
                    }
                  })
                }
                else{
                  ToastDanger('Invalid Token !!')
                }
          })
        });

      }
      else{
        this.setState({
          authenticated:false,
          data:'',
          userUid:'',
          role:{
            admin:false,
            type:'employee'
          }
        })
      }
    })
   }
  componentWillUnmount(){
    this.removeAuthListener();
  }

  render() {
    return (
      
    <Router>
      <div className="container">
      <ToastrContainer />
      <Route exact path="/logout" render={() => (<Logout authenticated = {this.state.authenticated} />)}/>
        {
            this.state.authenticated
      ? (
          <React.Fragment>
            <Header authenticated = {this.state.authenticated} role = {this.state.role} />
            <Route path="/" render={() => (<Home userInfo = {this.state.data} role={this.state.role} />)} />
          </React.Fragment>
        ):(
          <React.Fragment>
              <Header authenticated = {this.state.authenticated}/>
              <Route path="/login" component={Login}/>
          </React.Fragment>
          )
        }{
          this.state.authenticated && !this.state.role.admin
          ?
          (
            <React.Fragment>
              <Route path="/view-ticket" render={() => (
                <ViewTicketTable userId = {this.state.userUid} />
              )}/>
              <Route path="/add-ticket" render={() => (
                <AddTicketForm userId = {this.state.userUid} userInfo = {this.state.data} />
              )}/>
              <Route path="/user-profile" render={() => (
                <ProfileUpdateForm userId = {this.state.userUid} userInfo = {this.state.data} />
              )}/>
            </React.Fragment>
          )
          :
          (
            <React.Fragment>
              <Route path="/get-alluser" component = { AppUsers }/>
              <Route path="/tickets" component = { GetAllTickets }/>
              <Route path="/add-new-user" component = { AddNewUserForm }/>
            </React.Fragment>
          )
        }
          
      </div>
    </Router>
    )
  }

}

export default App;
