import React from 'react';
import Navbar from './Navbar';

function Settings() {
    return(
        <>
            <Navbar />
            <h2 className="form-heading">Your Settings</h2>
            <form className="auth-form" >
                <input type="text" name="profileUrl" placeholder="URL of profile picture" />
                <input type="text" name="username" placeholder="Username" />
                <textarea rows="6" cols="64" placeholder="Short bio about you"></textarea>
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="New Password" />
                <input type="submit" className="submit-btn" value="Update" />
            </form>
        </>
    );
}

export default Settings;