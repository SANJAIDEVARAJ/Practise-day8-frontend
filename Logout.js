import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';//this is for routing


class Logout extends Component {

componentDidMount() {
    axios.get("http://localhost:8000/api/logout").then((res)=>null)
}

    render() {
        return (
            <div>
                 <Link className="btn nav-link btn-success" to="/">
              Back to login and register
            </Link>
            </div>
        );
    }
}

export default Logout;