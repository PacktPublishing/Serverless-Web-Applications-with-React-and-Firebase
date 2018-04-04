import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navigation from './navigation';
import './header.css';

class Header extends Component {

  render() {
    return (
    <div className="navbar navbar-inverse firebase-nav" role="navigation">
        {
            this.props.authenticated
        ?
          (
            <Navigation role={this.props.role}/>
        ):(
            <React.Fragment>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login">Register/Login</Link></li>
                </ul>
          </React.Fragment>
        )
        }
      </div>
      
    );
  }
}

export default Header;
