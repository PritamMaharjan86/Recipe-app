import React, { useState } from "react";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit({ username, password });
  };

  return (
    <div>
        
      <div className="login">
      <h3>Welcome back!!</h3>
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
        <button className="button_login" type="submit" onSubmit={handleSubmit}>
          LOGIN{" "}
        </button>
      </div>
    </div>
  );
}
export default Login;
