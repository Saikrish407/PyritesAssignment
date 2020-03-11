import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        const userData = localStorage.getItem('user');
        const parsedUser = JSON.parse(userData)
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light">
                <ul className="navbar-nav">
                    {
                        parsedUser !== null && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        )
                    }
                    {
                        parsedUser === null && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sign-in">sign-in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">sign-up</Link>
                                </li>
                            </React.Fragment>
                        )
                    }
                </ul>
            </nav>
        );
    }
}

export default NavBar;