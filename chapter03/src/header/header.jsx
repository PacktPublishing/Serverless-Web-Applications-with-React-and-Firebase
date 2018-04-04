import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './header.css';

class Header extends Component {

  render() {
    return (
    <div className="navbar navbar-inverse firebase-nav" role="navigation">
        {
            this.props.authenticated
        ?
          (
        <React.Fragment>
            <ul className="nav navbar-nav">
                <li  className="active"><Link to="/">Home</Link></li>
                <li><Link to="/view-ticket">Tickets</Link></li>
                <li><Link to="/add-ticket">Add new ticket</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/logout">Logout</Link></li>
            </ul>
            </React.Fragment>
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
