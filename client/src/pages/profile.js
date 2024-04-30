import React from 'react'
import "./profile.css";

export default function Profile() {
    return (
        <div>

            <div className="container">

                <div className="profile">
                    <h1>Edit Profile</h1>

                    <input className='usernameEdit' type='text' placeholder='username'></input>
                    <input className='usernameEdit' type='text' placeholder='password'></input>



                </div>
            </div>
        </div>
    )
}
