import React, { Component } from 'react';

class Home extends Component {

  render() {
    var userPhoto = {width:"80px",height:"80px",margintop:"10px"};    
    return (
        <div>
            {
                this.props.userInfo.map((profile)=> {
                return (
                    <React.Fragment key={profile.uid}>
                        <h2>{ profile.displayName } - Welcome to Helpdesk Application</h2>
                        <div style={userPhoto}>
                            <img src = { profile.photoURL } alt="user"/>
                            <br/>
                            <span><b>Eamil:</b></span> {profile.email }
                        </div>
                    </React.Fragment>
            )})
        }
        </div>
    )
  }
}

export default Home;
