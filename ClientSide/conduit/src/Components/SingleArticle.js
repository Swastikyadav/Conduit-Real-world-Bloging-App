import React from "react";
import { NavLink } from "react-router-dom";

class SingleArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      singleArticle: "",
      currentUser: "",
      isCurrentUser: false,
      comments: "",
      newComment: ""
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/articles/${this.props.match.params.slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
          //   Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(article => {
        console.log(article);
        this.setState({
          singleArticle: article
        });
        console.log(this.state);
        fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token
          }
        })
          .then(res => res.json())
          .then(userData => {
            if (userData.user.username === article.article.userId.username) {
              this.setState({ isCurrentUser: true });
            }
            this.setState({
              currentUser: userData.user
            });
          });
      });
    fetch(
      `http://localhost:3000/api/articles/${this.props.match.params.slug}/comments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(comment => {
        this.setState({
          comments: comment.comments
        });
        console.log(this.state);
      });
  }

  deleteArticle = () => {
    fetch(
      `http://localhost:3000/api/articles/${this.props.match.params.slug}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.history.push("/");
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(
      `http://localhost:3000/api/articles/${this.props.match.params.slug}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          commentText: this.state.newComment
        })
      }
    )
      .then(res => res.json())
      .then(comment => {
        console.log(comment);
      });
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    if (this.state.singleArticle) {
      return (
        <>
          <section className="profilebar">
            <div>
              <h2>{this.state.singleArticle.article.title}</h2>
              <p>{this.state.singleArticle.article.about}</p>
            </div>
            <img
              src={this.state.singleArticle.article.userId.profilePicture}
              alt="profilepic"
            />
            <h5>
              Article By: {this.state.singleArticle.article.userId.username}
            </h5>
            {this.state.isCurrentUser ? (
              <div>
                <NavLink
                  to={`/article/update/${this.state.singleArticle.article.slug}`}
                >
                  <button>Edit Article</button>
                </NavLink>
                <button onClick={this.deleteArticle}>Delete Article</button>
              </div>
            ) : (
              ""
            )}
          </section>
          <div className="articleContent">
            {this.state.singleArticle.article.description}
            <hr style={{ margin: "20px 0" }} />
          </div>
          <form className="comment-section" onSubmit={this.handleSubmit}>
            <textarea
              rows="5"
              placeholder="Add your comment"
              name="newComment"
              value={this.state.newComment}
              onChange={this.handleChange}
            ></textarea>
            <input type="submit" value="Post" />
          </form>
          
            {this.state.comments
              ? this.state.comments.map(comm => {
                  return (
                    <div className="articleComments">
                    <div key={comm._id}>
                      <p style={{ padding: "20px" }}>{comm.commentText}</p>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          width: "80%",
                          margin: '0 auto',
                          textAlign: 'center',
                          justifyContent: "space-between"
                        }}
                      >
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={comm.userId.profilePicture}
                          alt="userpic"
                        />
                        <p>{comm.userId.username}</p>
                        {
                        this.state.currentUser.username === comm.userId.username ? (
                          <button style={{
                            padding: "8px",
                            margin: '5px',
                            border: 'none',
                            color: '#fff',
                            background: 'red',
                            borderRadius: '5px'
                          }}>Delete</button>
                        ) : ""}
                      </div>
                    </div>
                    </div>
                  );
                })
              : ""}
        </>
      );
    } else {
      return "";
    }
  }
}

export default SingleArticle;
