import React, { useEffect, useState } from 'react'
import "./register.css";
import http from "../pages/http";
import { resolvePath, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        console.log('username:', username);
    }

    const handleEmail= (e) => {
        setEmail(e.target.value);
        console.log('email:', email);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        console.log('password:', password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await http.post('/auth/create-user', { username, password, email });
            console.log(response);
            setIsLoggedIn(true);

        } catch (error) {
            toast.error(error.response.data.error.message); //path to get data from api
            console.error(error.response);

        }
    };


    useEffect(() => {
        if (isLoggedIn) {
            console.log('isloggedin', isLoggedIn)
            navigate('/home'); //navigate to home page 
        }
    }, [isLoggedIn])

    return (
        <>
            <ToastContainer />
            <div className="container">

                <div className="register">

                    <div className="column1">
                        <img
                            className="logo"
                            src="https://res.cloudinary.com/dvmumi2mb/image/upload/v1713698554/recipe_pcnsla.png"
                        ></img>

                        <h1>Register Here</h1>

                        <div><input className='email_register' placeholder='📧 Email' type='text' onChange={handleEmail}></input></div>
                        <div><input className='name_register' placeholder='👤 Username' type='text' onChange={handleUsername}></input></div>
                        <div><input className='password_register' placeholder='🔒 Create password' type='password' onChange={handlePassword}></input></div>
                        <div><button className='register_button' type='submit' onClick={handleSubmit}>Register</button></div>

                    </div>

                </div>
            </div>
        </>

    )
}
