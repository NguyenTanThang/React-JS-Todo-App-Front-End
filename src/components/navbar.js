import React, { Component } from 'react';
import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {Link} from "react-router-dom";
import {userLogout} from "../actions/usersActions";
import {connect} from "react-redux";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        }
    }
    
    onLogout = () => {
        this.props.userLogout();
        window.location.replace("/");
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
  <Link className="navbar-brand" to="/dashboard">
       {localStorage.getItem("user_name") || "Todo App"}    
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">What to do</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/notes">Note to self</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link btn-dark text-danger" onClick={this.onLogout}>Logout</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(userLogout())
    }
}

export default connect(null, mapDispatchToProps)(Navbar);
