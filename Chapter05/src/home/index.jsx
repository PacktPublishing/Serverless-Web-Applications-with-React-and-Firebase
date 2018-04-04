import React, { Component } from 'react';

class Home extends Component {
  render() {
    var heading = {display: "inline-block", margin: "0px"};  
    var userPhoto = {float: "left", marginRight: "25px"}  ;
    var marginBtm = {marginBottom:"15px"};
    var admin = this.props.role.admin;
    return (
        <div>
            {
                this.props.userInfo.map((profile,index)=> {
                return (
                    <div className="clearfix" style={marginBtm} key={index}>
                        <h2 style={heading}>{ profile.displayName } - Welcome to Helpdesk Application {admin ? 'Admin' : ''}</h2>
                        <img style={userPhoto} src = { profile.photoURL } alt="user" width="100"/>
                        <br/>
                        <span><b>Eamil:</b></span> {profile.email }
                    </div>
            )})
        }
        </div>
    )
  }
}

export default Home;
