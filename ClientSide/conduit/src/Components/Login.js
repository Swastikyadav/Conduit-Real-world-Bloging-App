import React from 'react';

function Register() {
    return(
        <>
            <h2 className="form-heading">Login to Conduit</h2>
            <a href="http://localhost:3000"><p className="form-para">Have an account?</p></a>
            <form className="auth-form">
                <input type="email" name="email" placeholder="Enter Email Address" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit" className="submit-btn" value="Login" />
            </form>
        </>
    );
}

export default Register;