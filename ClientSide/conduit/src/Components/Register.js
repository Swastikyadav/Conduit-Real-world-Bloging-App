import React from 'react';
import { NavLink } from 'react-router-dom';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json()).then(data => {
            if(data.success) {
                this.setState = {
                    username: data.user.username,
                    email: data.user.email,
                    password: data.user.password
                }
            } else {
                console.log(data.msg)
            }
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <>
                <h2 className="form-heading">Register to Conduit</h2>
                <NavLink to="/user/login"><p className="form-para">Have an account?</p></NavLink>
                <form className="auth-form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <input type="text" name="username" placeholder="Enter UserName" defaultValue={this.state.username} />
                    <input type="email" name="email" placeholder="Enter Email Address" defaultValue={this.state.email} />
                    <input type="password" name="password" placeholder="Enter Password" defaultValue={this.state.password} />
                    <input type="submit" className="submit-btn" value="Register" />
                </form>
            </>
        );
    }
}

export default Register;