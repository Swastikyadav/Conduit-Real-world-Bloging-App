import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ''
        }
    }

    componentDidMount() {
        if(localStorage.token) {
            fetch("http://localhost:3000/api/user", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            }
        }).then(res => res.json()).then(data => {
            this.setState({
                currentUser: data.user.username
            });
        });
        }
    }

    render() {
        return(
            <header>
                <NavLink className="logo a" to="/"><h3>Conduit</h3></NavLink>
                <div className="nav-links">
                    <ul>
                        {
                            this.props.user || localStorage.token ? (
                                <>
                                    <NavLink className="a" to="/"><li>Home</li></NavLink>
                                    <NavLink className="a" to="/article/new"><li>Post</li></NavLink>
                                    <NavLink className="a" to="/profile/settings"><li>Setting</li></NavLink>
                                    <NavLink className="a" to={`/profiles/${this.state.currentUser}`}><li>Profile</li></NavLink>
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
}

export default Header;