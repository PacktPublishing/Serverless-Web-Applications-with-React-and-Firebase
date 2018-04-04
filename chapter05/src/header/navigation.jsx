import React from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
            <div>
            {
                !this.props.role.admin
            ?
              (
                <React.Fragment>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/view-ticket">Tickets</Link></li>
                        <li><Link to="/add-ticket">Add new ticket</Link></li>
                        <li><Link to="/profile-update">Update Profile</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </React.Fragment>
                ):(
                <React.Fragment>
                    <ul className="nav navbar-nav">
                        <li><Link to="/get-alluser">Application Users</Link></li>
                        <li><Link to="/tickets">All Tickets</Link></li>
                        <li><Link to="/add-new-user">Create New User</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </React.Fragment>
                )
            }
            </div>
              
        );
    }
}

export default Navigation;