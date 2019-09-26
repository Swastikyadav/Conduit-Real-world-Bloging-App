import React from 'react';
import Hero from '../Components/Hero';
import ArticleCard from '../Components/ArticleCard';

function Home() {
    return(
        <>
            <Hero />
            <h4 className="active">Global Feed</h4>
            <div className="main">
                <div className="card">
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
                    <ArticleCard />
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

export default Home;