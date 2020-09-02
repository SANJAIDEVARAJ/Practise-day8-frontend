import React, { Component } from 'react';
import './index.css';
import Logreg from './components/Logreg';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";//this is for routing
import Home from './components/Home';
import Logout from './components/Logout';



class App extends Component {
  render() {
    return <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Logreg} />
            <Route path="/feed" component={Home} />
            <Route path="/Logout" component={Logout} />
         
            <Route render={function() {
                return <p>
                    {" "}
                    404 Not Found
                    <br />
                    <Link className="btn nav-link btn-success" to="/">
                      Back to log and Reg
                    </Link>
                  </p>;
              }} />
          </Switch>
        </Router>
      </div>;
  }
}

export default App;
