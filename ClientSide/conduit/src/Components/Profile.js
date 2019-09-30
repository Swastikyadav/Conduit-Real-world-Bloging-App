import React from 'react';

function Profile({logoutUser}) {
    return(
        <>
            <h2 style={{padding: '100px 0', textAlign: 'center'}}>Welcome to your profile</h2>
            <button onClick={logoutUser}>Logout</button>
        </>
    );
}

export default Profile;