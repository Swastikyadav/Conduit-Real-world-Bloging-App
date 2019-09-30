import React from 'react';
import { NavLink } from 'react-router-dom';

function Header({ user }) {
    return(
        <header>
            <NavLink className="logo a" to="/"><h3>Conduit</h3></NavLink>
            <div className="nav-links">
                <ul>
                    {
                        user || localStorage.token ? (
                            <>
                                <NavLink className="a" to="/"><li>Home</li></NavLink>
                                <NavLink className="a" to="/article/new"><li>Post</li></NavLink>
                                <NavLink className="a" to="/profile/settings"><li>Setting</li></NavLink>
                                <NavLink className="a" to="/profile"><li>Profile</li></NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink className="a" to="/"><li>Home</li></NavLink>
                                <NavLink className="a" to="/user/login"><li>Sign in</li></NavLink>
                                <NavLink className="a" to="/user/register"><li>Register</li></NavLink>
                            </>
                        )
                    }
                </ul>
            </div>
        </header>
    );
}

export default Header;