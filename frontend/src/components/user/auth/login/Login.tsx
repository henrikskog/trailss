import React from 'react';
import './Login.scss';

export default function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
        <form className="login-form">
          <label>
            <input type="test" placeholder="Username" required></input>
          </label>
          <label>
            <input type="password" placeholder="Password" required></input>
          </label>
          <button>Login</button> 
        </form>
        <div className="forgotPassword">Forgot password?</div>
        <div className="register">
            Not registered yet? <a href="INCLUDE_LINK_HERE">Register here.</a> 
        </div>
    </div>
  );
}
