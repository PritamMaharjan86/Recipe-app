import React from 'react'
import "./register.css";

export default function Register() {
  return (
    <div className="container">
    <div className="register">
      <div className="column1">
        <img
          className="logo"
          src="https://res.cloudinary.com/dvmumi2mb/image/upload/v1713698554/recipe_pcnsla.png"
        ></img>
        
        <h1>Register Here</h1>
        <div><input className='email_register' placeholder='Email' type='text'></input></div>
        <div><input className='password_register' placeholder='Create password' type='password'></input></div>
        <div><button type='submit'>Register</button></div>
        
      </div>

      </div>
      </div>
  )
}
