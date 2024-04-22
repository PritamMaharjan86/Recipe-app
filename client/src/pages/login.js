import React, { useEffect, useState } from "react";
import "./login.css";
import http from "../pages/http";
import { resolvePath, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post('/auth/login', { username, password });
      console.log(response)
      if(response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken)
        setIsLoggedIn(true);}
    } catch (error) {
      console.error(error.response);
    }
  };

useEffect(()=>{
  if(isLoggedIn){ console.log('isloggedin', isLoggedIn)
    navigate('/home');
  }
},[isLoggedIn])
  return (
    <div className="login">
      <div className="column1">
      <img
          className="logo"
          src="https://res.cloudinary.com/dvmumi2mb/image/upload/v1713698554/recipe_pcnsla.png"
        ></img>
        <h4>Welcome back !!!</h4>
        <h1>Log In</h1>
        <input
          className="login_detail"
          type="text"
          placeholder="Username"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        ></input>{" "}
        <br />
        <input
          className="login_detail"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        ></input>{" "}
        <br />
        <button className="button_login" type="submit" onClick={handleSubmit}>
          LOGIN{" "}
        </button>
      </div>

      <div className="column2">
        <img
          className="image"
          src="https://res.cloudinary.com/dvmumi2mb/image/upload/v1712205911/cld-sample-4.jpg"
        ></img>
      </div>
    </div>
  );
}
export default Login;
