import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            msg: ''
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
                password:  this.state.password
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                this.props.history.push("/user/login");
            } else {
                this.setState({
                    msg: data.msg
                });
            }
        })
        
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <h2 className="form-heading">Signup to Conduit</h2>
                <NavLink to="/user/login"><p className="form-para">Have an account?</p></NavLink>
                <p className="errMsg" style={this.state.msg ? {display: 'block'} : {display: 'none'}}>{this.state.msg}</p>
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <input type="text" name="username" placeholder="Enter Your Username" value={this.state.username} onChange={this.handleChange} />
                    <input type="email" name="email" placeholder="Enter Email Address" value={this.state.email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                    <input type="submit" className="submit-btn" value="Signup" />
                </form>
            </>
        );
    }
}

export default Login;