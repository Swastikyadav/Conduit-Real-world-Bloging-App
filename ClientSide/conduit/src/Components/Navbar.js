import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return(
        <header>
            <NavLink className="logo a" to="/"><h3>Conduit</h3></NavLink>
            <div className="nav-links">
                <ul>
                    {
                        localStorage.token ? (
                            <>
                            <NavLink className="a" to="/"><li>Home</li></NavLink>
                            <NavLink className="a" to="/"><li>Post</li></NavLink>
                            <NavLink className="a" to="/"><li>Settings</li></NavLink>
                            <NavLink className="a" to="/"><li>Profile</li></NavLink>
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