import React from "react";

class SingleArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      singleArticle: "",
      currentUser: false
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
        this.setState({
          singleArticle: article
        });
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
              this.setState({ currentUser: true });
            }
          });
      });
  }

  deleteArticle = () => {
      fetch(`http://localhost:3000/api/articles/${this.props.match.params.slug}`, {
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.token
          }
      }).then(res => res.json()).then(data => {
          console.log(data);
          this.props.history.push('/');
      });
  }

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
            {this.state.currentUser ? (
              <div>
                <button>Edit Article</button>
                <button onClick={this.deleteArticle}>Delete Article</button>
              </div>
            ) : (
              ""
            )}
          </section>
          <div className="articleContent">
              {this.state.singleArticle.article.description}
          </div>
        </>
      );
    } else {
      return "";
    }
  }
}

export default SingleArticle;
