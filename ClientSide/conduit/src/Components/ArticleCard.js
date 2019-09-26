import React from 'react';

function ArticleCard() {
    return(
        <>
            <section className="feed">
                <div className="article-card">
                    <div className="userpic">
                        <img src="https://swastikyadav.com/static/9190270ec82670b045f4c683c0a8ede8/f53aa/profile.png" alt="user" width="50px" height="50px" />
                        <p>Swastik</p>
                    </div>

                    <h3 className="title">Article Title</h3>
                    <p className="about">Small bit about article...</p>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <a href="http://localhost:3000"><small className="articlePage">Read More...</small></a>
                        <p style={{padding: '4px', border: '1px solid gray', cursor: 'pointer'}}>Like</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ArticleCard;