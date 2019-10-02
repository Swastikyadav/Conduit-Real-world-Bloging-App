import React from "react";
import Navbar from "./Navbar";
import { withRouter } from "react-router-dom";

class UpdatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      about: "",
      description: "",
      tag: "",
      isArticle: false
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/articles/${this.props.match.params.slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        }
      }
    )
      .then(res => res.json())
      .then(article => {
        this.setState({
          title: article.article.title,
          about: article.article.about,
          description: article.article.description,
          tag: article.article.tag,
          isArticle: true
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch(
      `http://localhost:3000/api/articles/${this.props.match.params.slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          title: this.state.title,
          about: this.state.about,
          description: this.state.description,
          tag: this.state.tag
        })
      }
    )
      .then(res => res.json())
      .then(article => {
        console.log(article);
        this.props.history.push(`/article/${this.props.match.params.slug}`);
      });
  };

  handleChange = event => {
    let { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    if (this.state.isArticle) {
      return (
        <>
          <Navbar />
          <h2 className="form-heading">Update your article</h2>
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="about"
              placeholder="What's this article about?"
              value={this.state.about}
              onChange={this.handleChange}
            />
            <textarea
              rows="6"
              cols="64"
              name="description"
              placeholder="Write your article."
              value={this.state.description}
              onChange={this.handleChange}
            ></textarea>
            <input
              type="text"
              name="tag"
              placeholder="Enter tags (comma seprated)"
              value={this.state.tag}
              onChange={this.handleChange}
            />
            <input type="submit" className="submit-btn" value="Update" />
          </form>
        </>
      );
    } else {
      return "";
    }
  }
}

export default UpdatePost;
