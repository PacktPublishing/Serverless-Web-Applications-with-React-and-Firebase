import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { firebaseApp , facebookProvider, googleProvider } from '../firebase/firebase-config';
import { ToastDanger } from 'react-toastr-basic';

import './login.css';

class Login extends Component {
  constructor() {
    super();
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.state = {
        redirect: false,
        data:null
    }
  }

  authWithEmailPassword(e){
      e.preventDefault();
      console.log(this.emailField.value);
      const email = this.emailField.value
      const password = this.passwordField.value;

      firebaseApp.auth().fetchProvidersForEmail(email).then((provider)=>{
        if(provider.length === 0){
            //Creating a new user
            firebaseApp.auth().setPersistence('session');
            //return firebaseApp.auth().createUserWithEmailAndPassword(email,password);
        } else if(provider.indexOf("password") === -1){
            this.loginForm.reset();
            ToastDanger('Wrong Password. Please try again!!')
        } else {
            //signin user
            return firebaseApp.auth().signInWithEmailAndPassword(email,password);
        }

      }).then((user) => {

        if(user && user.email){
            this.loginForm.reset();
            this.setState({redirect: true});
        }
      })
      .catch((error)=>{
          console.log(error);
          ToastDanger(error.message);
      })
  }

  authWithFacebook(){
      console.log("facebook");
      firebaseApp.auth().signInWithPopup(facebookProvider).then((result,error)=>{
          if(error){
              console.log("unable to sign in with facebook");
              ToastDanger(error.message)
          }
          else{
              this.setState({redirect:true,data:result.user})
          }
      }).catch((error)=>{
        ToastDanger(error.message);
        // if (error.code === 'auth/account-exists-with-different-credential') {
        //     // Step 2.
        //         var pendingCred = error.credential;
        //         // The provider account's email address.
        //         var email = error.email;
        //         // Get registered providers for this email.
        //         firebaseApp.auth().fetchProvidersForEmail(email).then(function(providers) {
        //         // Step 3.
        //         // If the user has several providers,
        //         // the first provider in the list will be the "recommended" provider to use.
        //         if (providers[0] === 'password') {
        //             // Asks the user his password.
        //             // In real scenario, you should handle this asynchronously.
        //             var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
        //             firebaseApp.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        //             // Step 4a.
        //             return user.link(pendingCred);
        //             }).then(function() {
        //             // Google account successfully linked to the existing Firebase user.
                    
        //             });
        //         }
        //     })
        // }
    })
  }
  authWithGoogle(){
      console.log("Google");
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
      firebaseApp.auth().signInWithPopup(googleProvider).then((result,error)=>{
        if(error){
            console.log("unable to sign in with google");
        }
        else{
            this.setState({redirect:true,data:result.user})
        }
    }).catch((error)=>{
        ToastDanger(error.message);
      })
  }
  
  render() {
      if(this.state.redirect === true){
          return <Redirect to = "/" />
      }
    return (
        <div className="wrapper">
            <form className="form-signin" onSubmit={(event)=>{this.authWithEmailPassword(event)}} ref={(form)=>{this.loginForm = form}}>       
                <h2 className="form-signin-heading">Login</h2>
                <input type="email" className="form-control" name="username" placeholder="Email Address" ref={(input)=>{this.emailField = input}} required />
                <input type="password" className="form-control" name="password" placeholder="Password" ref={(input)=>{this.passwordField = input}} required />      
                    <label className="checkbox">
                        <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                    </label>
                <button className="btn btn-lg btn-primary btn-block btn-normal" type="submit">Login</button> 
                 <br/> 
                <button className="btn btn-lg btn-primary btn-facebook btn-block" type="button" onClick={()=>{this.authWithFacebook()}}>Login with Facebook</button> 
                <button className="btn btn-lg btn-primary btn-google btn-block" type="button" onClick={()=>{this.authWithGoogle()}}>Login with Google</button> 
            </form>

       </div>
      
    );
  }
}

export default Login;
