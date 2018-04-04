import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Header from './header/header.jsx';
import Home from './home/index.jsx';
import Login from './login/login.jsx';
import Logout from './logout/logout.jsx';
import AddTicketForm from './add-ticket/AddTicketForm.jsx';
import ViewTicketTable from './tickets-listing/ViewTickets.jsx';
import firebase from './firebase/firebase-config';
import ToastrContainer from 'react-toastr-basic';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated : false,
      data:''
    }
  }
  componentWillMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        console.log("App user",user);
        this.setState({
          authenticated:true,
          data:user.providerData
        })
      }
      else{
        this.setState({
          authenticated:false,
          data:''
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
        ?
        (
          <React.Fragment>
            <Header authenticated = {this.state.authenticated}/>
            <Route path="/" render={() => (<Home userInfo = {this.state.data} />)} />
            <Route path="/view-ticket" component={ViewTicketTable}/>
            <Route path="/add-ticket" component={AddTicketForm}/>
          </React.Fragment>
        )
          :
          (
          <React.Fragment>
              <Header authenticated = {this.state.authenticated}/>
              <Route path="/login" component={Login}/>
          </React.Fragment>
          )
        }
          
      </div>
    </Router>
    )
  }

}

export default App;
