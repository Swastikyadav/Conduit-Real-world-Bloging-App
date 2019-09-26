import React from 'react';
import { NavLink } from 'react-router-dom';

function Register() {
    return(
        <>
            <h2 className="form-heading">Register to Conduit</h2>
            <NavLink to="/user/login"><p className="form-para">Have an account?</p></NavLink>
            <form className="auth-form">
                <input type="text" name="username" placeholder="Enter UserName" />
                <input type="email" name="email" placeholder="Enter Email Address" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" className="submit-btn" value="Register" />
            </form>
        </>
    );
}

export default Register;