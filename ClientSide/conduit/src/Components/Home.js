import React from "react";
import Hero from "../Components/Hero";
import ArticleCard from "../Components/ArticleCard";
import FeedTab from "./FeedTab";
import myFetch from "../utils/myFetch";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      post: "",
      populartags: "",
      activeTag: "",
      active: "Global Feed",
      feed: ""
    };
  }

  componentDidMount() {
    // const data = [`http://localhost:3000/api/articles`, `http://localhost:3000/api/tags`];
    // const promises = data.map(url => myFetch(url));
    // Promise.all(promises).then(res => console.log(res));
    fetch("http://localhost:3000/api/articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ post: data }));

    fetch("http://localhost:3000/api/tags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ populartags: data }));

    fetch("http://localhost:3000/api/articles/following/feed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(feed => {
        this.setState({
          feed: feed.articles
        });
      });
  }

  handleClick = e => {
    let tagName = e.target.innerText;
    this.setState({
      active: "Tag",
      activeTag: tagName
    });
  };

  tabClick = e => {
    if (e.target.innerText === "Global Feed") {
      this.setState({
        active: "Global Feed"
      });
    } else if (e.target.innerText === "Your Feed") {
      this.setState({
        active: "Your Feed"
      });
    }
  };

  render() {
    const { post, populartags, feed } = this.state;
    if (!this.state.post) return "";

    let element = "";
    if (this.state.active === "Global Feed") {
      element = post.articles.reverse().map((article, index) => {
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
      console.log(element);
    } else if (this.state.active === "Tag") {
      // for(let i = 0; i < populartags.tags.length; i++) {
      element = populartags.tags.map((tag, i) => {
        console.log(tag.articleId);
        if (populartags.tags[i].tagText !== this.state.activeTag) return "";
        return tag.articleId.map((article, index) => {
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
      });
      // }
    } else if (this.state.active === "Your Feed") {
      element = feed.map((article, index) => {
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
      console.log(feed);
    }
    return (
      <>
        <Hero />
        <div className="tab-container">
          {localStorage.token ? (
            <FeedTab
                className={this.state.active === "Your Feed" ? "active-feed" : ""}
                feedName="Your Feed"
                click={this.tabClick} />
          ) : (
            ""
          )}
          <FeedTab
            className={this.state.active === "Global Feed" ? "active-feed" : ""}
            feedName="Global Feed"
            click={this.tabClick}
          />
          <FeedTab
            className={this.state.active === "Tag" ? "active-feed" : ""}
            feedName={`#${this.state.activeTag}`}
          />
        </div>
        <div className="main">
          <div className="card">{element}</div>
          <div className="tags">
            <h4>Tags</h4>
            <section className="tagname">
              {!populartags
                ? ""
                : populartags.tags.map((tag, index) => {
                    return (
                      <button onClick={this.handleClick} key={index}>
                        {tag.tagText}
                      </button>
                    );
                  })}
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
