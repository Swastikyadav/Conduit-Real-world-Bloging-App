import React from 'react';

function Header() {
    return(
        <header>
            <a href="/"><h3 className="logo">Conduit</h3></a>
            <div className="nav-links">
                <ul>
                    <a href="http://localhost:3000"><li>Home</li></a>
                    <a href="http://localhost:3000"><li>Sign in</li></a>
                    <a href="http://localhost:3000"><li>Register</li></a>
                </ul>
            </div>
        </header>
    );
}

export default Header;