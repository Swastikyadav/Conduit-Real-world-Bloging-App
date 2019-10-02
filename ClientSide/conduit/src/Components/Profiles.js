import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import ArticleCard from "./ArticleCard";

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilepic: "",
      username: "",
      bio: "",
      active: "My Articles",
      myPosts: "",
      favPosts: "",
      currentUser: false,
      following: false
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/profiles/${this.props.match.params.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          profilepic: data.user.profilePicture,
          username: data.user.username,
          bio: data.user.bio,
          myPosts: data.user.articlesId,
          favPosts: data.user.favorited
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
            if (this.state.username === userData.user.username) {
              this.setState({
                currentUser: true
              });
            }
            if (userData.user.following.includes(data.user._id)) {
              this.setState({ following: true });
            } else {
              this.setState({ following: false });
            }
          });
      });
  }

  handleClick = event => {
    let text = event.target.innerText;
    this.setState({
      active: text
    });
  };

  follow = event => {
    fetch(
      `http://localhost:3000/api/profiles/${this.props.match.params.username}/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ following: true });
        console.log(data);
      });
  };

  unfollow = event => {
    fetch(
      `http://localhost:3000/api/profiles/${this.props.match.params.username}/follow`,
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
        this.setState({ following: false });
        console.log(data);
      });
  };

  render() {
    const { myPosts, active, favPosts, currentUser } = this.state;
    let myElement = "";
    let favElement = "";

    if (myPosts.length === 0) {
      myElement = <p>No articles written yet...</p>;
    } else {
      myElement = myPosts.map((article, index) => {
        return (
          <ArticleCard
            key={index}
            title={article.title}
            about={article.about}
            description={article.description}
            author={article.userId.username}
            profilePicture={article.userId.profilePicture}
            slug={article.slug}
          />
        );
      });
    }

    if (favPosts.length === 0) {
      favElement = <p>You have no favorite articles...</p>;
    } else {
      favElement = favPosts.map((article, index) => {
        return (
          <ArticleCard
            key={index}
            title={article.title}
            about={article.about}
            description={article.description}
            author={article.userId.username}
            profilePicture={article.userId.profilePicture}
          />
        );
      });
    }

    return (
      <>
        <section className="profilebar">
          <img src={this.state.profilepic} alt="profilepic" />
          <h3>{this.state.username}</h3>
          <p>{this.state.bio}</p>
          <div>
            {currentUser ? (
              <>
                <NavLink className="a" to="/profile/settings">
                  <button>Edit Profile</button>
                </NavLink>
                <button onClick={this.props.logoutUser}>Logout</button>
              </>
            ) : this.state.following ? (
              <button onClick={this.unfollow}>Unfollow</button>
            ) : (
              <button onClick={this.follow}>Follow</button>
            )}
          </div>
        </section>
        <div className="myArticle">
          <div className="tab">
            <h4
              onClick={this.handleClick}
              className={
                this.state.active === "My Articles" ? "active-feed" : ""
              }
            >
              My Articles
            </h4>
            <h4
              onClick={this.handleClick}
              className={this.state.active === "Favorites" ? "active-feed" : ""}
            >
              Favorites
            </h4>
          </div>
          <hr style={{ color: "#6BDAED", margin: "0.2px 0 10px 0" }} />
          <div className="card">
            {/* {element} */}
            {active === "My Articles"
              ? myElement
              : active === "Favorites"
              ? favElement
              : ""}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Profiles);
