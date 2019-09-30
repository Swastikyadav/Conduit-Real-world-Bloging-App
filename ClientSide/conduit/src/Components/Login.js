import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Navbar from './Navbar'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    handleSubmit = (event) => {
        this.setState({
            loading: true
        });
        event.preventDefault();
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password:  this.state.password
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                this.props.changeUser(data.user);
                localStorage.setItem("token", data.token);
                this.props.history.push("/");
                this.setState({loading: false});
            } else {
                console.log(data.msg)
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
        return this.state.loading ? (
            <h2>Loading...</h2>
        ) : (
            <>
                <Navbar />
                <h2 className="form-heading">Login to Conduit</h2>
                <NavLink to="/user/register"><p className="form-para">Need an account?</p></NavLink>
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <input type="email" name="email" placeholder="Enter Email Address" value={this.state.email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
                    <input type="submit" className="submit-btn" value="Login" />
                </form>
            </>
        );
    }
}

export default withRouter(Login);