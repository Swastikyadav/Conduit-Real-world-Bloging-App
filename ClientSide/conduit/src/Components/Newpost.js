import React from 'react';
import Navbar from './Navbar';

function NewPost() {
    return(
        <>
            <Navbar />
            <h2 className="form-heading">Write a new article</h2>
            <form className="auth-form" >
                <input type="text" name="title" placeholder="Article Title" />
                <input type="text" name="about" placeholder="What's this article about?" />
                <textarea rows="6" cols="64" name="description" placeholder="Write your article."></textarea>
                <input type="email" name="tag" placeholder="Enter tags (comma seprated)" />
                <input type="submit" className="submit-btn" value="Publish" />
            </form>
        </>
    );
}

export default NewPost;