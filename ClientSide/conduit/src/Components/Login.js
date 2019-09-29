import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedUser: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.loggedUser.email,
                password: this.state.loggedUser.password,
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                localStorage.setItem("token", data.token)
                this.props.history.push("/")
            } else {
                console.log(data.msg)
            }
        })
        
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            loggedUser: {
                ...this.state.loggedUser,
                [name]: value,
            }
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <h2 className="form-heading">Login to Conduit</h2>
                <NavLink to="/user/register"><p className="form-para">Need an account?</p></NavLink>
                <form className="auth-form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <input type="email" name="email" placeholder="Enter Email Address" defaultValue={this.state.loggedUser.email} />
                    <input type="password" name="password" placeholder="Enter Password" defaultValue={this.state.loggedUser.password} />
                    <input type="submit" className="submit-btn" value="Login" />
                </form>
            </>
        );
    }
}

export default Login;