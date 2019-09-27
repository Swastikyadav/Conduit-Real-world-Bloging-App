import React from 'react';
import Hero from '../Components/Hero';
import ArticleCard from '../Components/ArticleCard';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            post: '',
            populartags: ''
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/articles", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => this.setState({post: data}));

        fetch("http://localhost:3000/api/tags", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => this.setState({populartags: data}));
    }

    handleClick = (e) => {
        e.persist();
        let articleArr = '';
        fetch("http://localhost:3000/api/articles", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            articleArr = data.articles;

             let articles = articleArr.reduce((acc, cv, i, arr) => {
                this.state.populartags.tags.forEach((tag, tagIndex) => {
                    if(tag.tagText === e.target.innerText) {
                        tag.articleId.forEach((articleid, arIndex) => {
                            if(cv._id === articleid) {
                                acc.push(cv);
                            }
                        });
                    }
                });
                return acc;
            }, []);

            this.setState({
                post: {articles}
            });

            console.log(articles);
        });
    }

    render() {
        const {post, populartags} = this.state;
        if(!this.state.post) return '';
        if(!this.state.populartags) return '';
        // console.log(this.state.populartags.tags);
        return(
            <>
                <Hero />
                <h4 className="global-feed">Global Feed</h4>
                <div className="main">
                    <div className="card">
                        {
                            post.articles.reverse().map((article, index) => {
                                return <ArticleCard 
                                    key={index}
                                    title={article.title}
                                    about={article.about}
                                    description={article.description}
                                    author={article.userId.username}
                                    profilePicture={article.userId.profilePicture}
                                />
                            })
                        }
                    </div>
                    <div className="tags">
                        <h4>Tags</h4>
                        <section className="tagname">
                            {
                                populartags.tags.map((tag, index) => {
                                    return <button onClick={this.handleClick} key={index}>{tag.tagText}</button>
                                })
                            }
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;