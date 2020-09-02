import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      err: null,
      valerrors: null
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:8000/api/login", this.state.data).then(res => {
      console.log(res);
      if (res.data.error) {
        return this.setState({ err: res.data.message });
      }
      if(res.data.errors){
        return this.setState({valerrors:res.data.errors});
      }
      return this.props.history.push("/feed");
    });
  }

  changeHandler(e) {
    var formData = this.state.data;
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  }

  render() {
    var changeHandler = this.changeHandler;
    return (
      <div className="loginform">
        <h1>Login</h1>
        {this.state.err && <p>{this.state.err}</p>}
        <form onSubmit={this.submitHandler}>
          {this.state.valerrors && 
            this.state.valerrors.email && 
              <p>{this.state.valerrors.email.msg}</p>}
          <div className="form-group">
            <input
              type="text"
              value={this.state.data.email}
              name="email"
              onChange={changeHandler}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            
          </div>
          <div className="form-group">
          {this.state.valerrors && 
            this.state.valerrors.password && 
              <p>{this.state.valerrors.password.msg}</p>}
            <input
              onChange={changeHandler}
              value={this.state.data.password}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
