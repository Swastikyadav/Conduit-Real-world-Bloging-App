import React from 'react';
import Navbar from './Navbar';

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            profileUrl: '',
            username: '',
            bio: '',
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify({
                profilePicture: this.state.profileUrl,
                username: this.state.username,
                bio: this.state.bio,
                email: this.state.email,
                password:  this.state.password
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                // console.log(data);
                this.props.history.push("/profile");
            } else {
                console.log(data);
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
        return(
            <>
                <Navbar />
                <h2 className="form-heading">Your Settings</h2>
                <form className="auth-form" onSubmit={this.handleSubmit} >
                    <input type="text" name="profileUrl" placeholder="URL of profile picture" value={this.state.profileUrl} onChange={this.handleChange} />
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                    <textarea rows="6" cols="64" name="bio" placeholder="Short bio about you" value={this.state.bio} onChange={this.handleChange}></textarea>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="New Password" value={this.state.password} onChange={this.handleChange} />
                    <input type="submit" className="submit-btn" value="Update" />
                </form>
            </>
        );
    }
    
}

export default Settings;