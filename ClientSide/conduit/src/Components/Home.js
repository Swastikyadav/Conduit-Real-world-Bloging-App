import React from 'react';
import Hero from '../Components/Hero';
import ArticleCard from '../Components/ArticleCard';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            post: ''
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/articles", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => this.setState({post: data}));
    }

    render() {
        const {post} = this.state;
        if(!this.state.post) return '';
        return(
            <>
                <Hero />
                <h4 className="global-feed">Global Feed</h4>
                <div className="main">
                    <div className="card">
                        {
                            post.articles.map((article, index) => {
                                console.log(article);
                                return <ArticleCard 
                                    key={index}
                                    title={article.title}
                                    about={article.about}
                                    description={article.description}
                                    author={article.userId.username}
                                />
                            })
                        }
                        {/* <ArticleCard /> */}
                    </div>
                    <div className="tags">
                        <h4>Tags</h4>
                        <section className="tagname">
                            <button>tag 1</button>
                            <button>tag 2</button>
                            <button>tag 4</button>
                            <button>tag 5</button>
                            <button>tag 6</button>
                            <button>tag 7</button>
                            <button>tag 8</button>
                            <button>tag 9</button>
                            <button>tag 3</button>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;