import React, { Component } from "react";
import axios from "axios";


export default class Newlisting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: ""
      },
      error: {  
        title: "",
      },
      success: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  getCurrentUser() {
    axios
      .get("http://localhost:8000/api/currentuser")
      .then(
        function(result) {
          console.log(result);
          this.setState({
            user: result.data,
            error: ""
          });
        }.bind(this)
      )
      .catch(error => console.log(error));
  }

  handleChange(element) {
    var formData = this.state.data;
    formData[element.target.name] = element.target.value;
    this.setState({ data: formData });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let _this = this;
    axios
      .post("http://localhost:8000/api/postlist", this.state.data)
      .then(res => {
        console.log("res", res);
        if (res.data.errors) {
          let mainErrors = res.data.errors;
          let err_msg = {
            title: mainErrors.title ? mainErrors.title.msg : ""
          };
          _this.setState({
            error: err_msg,
            success: ""
          });
        } else {
          _this.setState({
            data: {
              title: ""
            },
            error: {
              title: ""
            
            },
            success: "Thank you for posting item"
          }
       );window.location.href="http://localhost:3000/feed"
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="main-post">
        <br />
        <h3>Post Your Article Here</h3>
          <form onSubmit={this.handleSubmit}>
              <input
                  type="text"
                  name="title"
                  value={this.state.data.title}
                  onChange={this.handleChange}
                  className="input-box"                
                                />
              <p className="text-danger">{this.state.error.title}</p>
              <button type="submit" className="btn btn-primary">
              Post 
              </button>
          </form>
          {this.state.success === "" ? (
            <p />
        ) : (
          <p className="text-success">{this.state.success}</p>
        )}
        <br />
        <br />
      </div>
    );
  }
}
