import React, { Component } from 'react';
import axios from 'axios';



function Result(props) {
  return (
    
    props.posts.slice(0, 3).map((post)=>{
      return <div>
                <ul className="users" key={post._id}>
                  <div className="">
                    <h3 className="">  {post.title}</h3>
                    <br/>
                      <p className="card-title">By: {post.user.name}| {post.vote} upvotes </p>                              
                    <button className="btn btn-success" 
                    onClick={props.handleVote.bind(this, post._id)}>
                    Upvote
                    </button>
                  <hr />
                  </div>
              </ul>
            </div>;
        }
      )
    )
}

class Allposts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: null, user: null};
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/Allposts/")
      .then(res => this.setState({ posts: res.data }));

    

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

  
  handleVote(id) {
    console.log("hi");
    axios
      .put("http://localhost:8000/api/post/vote/" + id)
      .then(result => {
        window.location.href = "/feed";
      })
      .catch(error => console.log(error));
  }

  

  render() {
    return (
      <div className="main-container">
          <div className="container">
            <div className="row">
              <div className= "col-xs-12 col-md-6 ">
                {this.state.posts && (
                <Result
                  user={this.state.user}
                  posts={this.state.posts}
                  handleVote={this.handleVote}
                />
                )}
              </div>
            </div>
          </div>
      </div>
        
    );
  }
}

export default Allposts;