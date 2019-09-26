import React from 'react';

function Header() {
    return(
        <header>
            <h3 className="logo">Conduit</h3>
            <div className="nav-links">
                <ul>
                    <a href="#"><li>Home</li></a>
                    <a href="#"><li>Sign in</li></a>
                    <a href="#"><li>Register</li></a>
                </ul>
            </div>
        </header>
    );
}

export default Header;