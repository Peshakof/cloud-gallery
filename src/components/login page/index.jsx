import React from 'react';
// import './style.scss';

const LoginPage = () => {

  

   

  return (
    <div className="register-form-wrapper">
      <form className="register-form">
        <header>
          <h3>Login form</h3>
        </header>
        <p>
          <input className="form-input" type="text" name="username" placeholder="username" />
        </p>
        <p>
          <input className="form-input" type="password" name="password" placeholder="password" />
        </p>
        <p>
          <input className="signup-btn" type="submit" value="Signin" />
        </p>
      </form>
    </div>
  )
}

export default LoginPage;