import React, { Component } from "react";
import axios from "axios";
import Allposts from "./Allposts";
import { Link } from 'react-router-dom';
import Newlisting from "./Newlisting";
import "./Home.css";
axios.defaults.withCredentials = true;

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        user:null,
        error:'Please Login'
    }
    axios.get('http://localhost:8000/api/currentuser')
    .then(function(result){
        console.log(result);
        this.setState({
            user: result.data,
            error: ''
        })
    }.bind(this))
    .catch(error => console.log(error))   
    
}

 render() {

   return this.state.user ? (
    <div className="mainmain-container">
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <h1 className="navbar-brand">The Articles and Upvotes</h1>
                </div>
                {/* <Link className='btn btn-default navbar-btn navbar-right' to='/search'>
                Search
                </Link>  {" "} {" "} */}
                <Link className='btn btn-default navbar-btn navbar-right' to='/Logout'>
                Log out
                </Link>  
            </div>  
        </nav>
        <br/><br/>
        {<h3 className="highlight"> Welcome, {this.state.user.name}</h3>}
        <br/><br/>
        <div className="home-container">
            <div className="row">
                <div className="col-xs-12 col-md-8" >
                <Allposts/>
                </div>
            <   div className="col-xs-12 col-md-4">
                <div>
                <Newlisting /> 
                </div>
                         
                </div>
            </div>       
        </div>            
       
    </div>
   ):(
        <h1>Loading...</h1>
   )
 }
}





