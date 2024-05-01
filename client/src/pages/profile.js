import React, { useState } from 'react'
import "./profile.css";
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import http from "../pages/http";
import { resolvePath, useNavigate } from 'react-router-dom';


export default function Profile() {

    const username = localStorage.getItem('username');
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newUsername: username,
        currentPassword: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post('/user/update-user',
                {
                    username: formData.newUsername,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.password
                },
                {
                    headers :{Authorization : `Bearer ${token}`}
                });
            console.log(response);
            localStorage.removeItem('token');
            navigate('/');
            


        } catch (error) {

            console.error(error.response);

        }
    }

    return (
        <div>

            <div className="container">

                <div className="profile">
                    <h1>Edit Profile</h1>
                    <div className="column1">
                        <Input value={formData.newUsername} name="newUsername" onChange={(e) => handleChange(e)} />
                        <Input placeholder="Current Password" name="currentPassword" type='password' onChange={(e) => handleChange(e)} />
                        <Input placeholder="New Password" name="password" type='password' onChange={(e) => handleChange(e)} />
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>



                </div>
            </div>
        </div>
    )
}
