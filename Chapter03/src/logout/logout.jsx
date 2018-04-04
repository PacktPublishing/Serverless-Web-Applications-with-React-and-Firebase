import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { firebaseApp } from '../firebase/firebase-config';

class Logout extends Component {
  constructor(props) {
    super();
    this.state = {
        redirect: props.authenticated,
        data:''
    }
  }
  componentWillMount(){
    firebaseApp.auth().signOut().then((user)=>{
      this.setState({
        redirect:true,
        data: null
      })
    })
  }

  
  render() {
      if(this.state.redirect === true){
          return <Redirect to = "/" />
      }
    return (
        <div style={{textAlign:"center",position:"absolute",top:"25%",left:"50%"}}>
          <h4>Logging out...</h4>
        </div>
      
    );
  }
}

export default Logout;
