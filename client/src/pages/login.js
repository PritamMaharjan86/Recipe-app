import React, { useState } from "react";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    console.log("login", handleSubmit);
  };

  return (
    <div className="login">
      <div className="column1">
        <h4>Welcome back !!!</h4>
        <h1>Log In</h1>
        <h5>Email</h5>
        <input
          className="login_detail"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>{" "}
        <br />
        <h5>Password</h5>
        <input
          className="login_detail"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
