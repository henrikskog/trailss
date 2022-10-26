import React from 'react';
import './Login.scss';

export default function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
        <form className="login-form">
          <label>
            <input type="text" placeholder="Username" required></input>
          </label>
          <label>
            <input type="text" placeholder="E-Mail" required></input>
          </label>
          <label>
            <input type="password" placeholder="Password" required></input>
          </label>
          <button>Register</button> 
        </form>
        <div className="login">
            You already have an account? <a href="INCLUDE_LINK_HERE">Login</a> 
        </div>
    </div>
  );
}
