import React from 'react';
import {NavLink} from 'react-router-dom';

function ArticleCard(props) {
    return(
        <>
            <section className="feed">
                <div className="article-card">
                    <div className="userpic">
                        {
                            localStorage.token ? (
                                <>
                                    <NavLink className="a" to={`/profiles/${props.author}`}>
                                        <img src={props.profilePicture} alt="user" width="50px" height="50px" />
                                    </NavLink>
                                    <NavLink className="a" to={`/profiles/${props.author}`}><p>{props.author}</p></NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className="a" to={`/user/login`}>
                                        <img src={props.profilePicture} alt="user" width="50px" height="50px" />
                                    </NavLink>
                                    <NavLink className="a" to={`/user/login`}><p>{props.author}</p></NavLink>
                                </>
                            )
                        }
                    </div>

                    <h3 className="title">{props.title}</h3>
                    <p className="about">{props.about}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <NavLink className="a" to="/"><small className="articlePage">Read More...</small></NavLink>
                        <p style={{padding: '4px', border: '1px solid gray', cursor: 'pointer'}}>Like</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ArticleCard;