import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useInput from '../input-change-hook/useInputChange';
import loginValidator from '../../validations/login-validator';
import userService from '../../services/user-service';

import 'react-toastify/dist/ReactToastify.css';

const LoginPage = (props) => {

  const [username, bindUserName, updateUsername] = useInput('');
  const [password, bindPassword, updatePassword] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    updateUsername();
    updatePassword();

    if (loginValidator(username, password)) {
      userService.login(username, password);
      props.history.push('/');
    }
  }   

  return (
    <div className="register-form-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <header>
          <h3>Login form</h3>
        </header>
        <p>
          <input className="form-input" type="text" name="username" placeholder="username" {...bindUserName}/>
        </p>
        <p>
          <input className="form-input" type="password" name="password" placeholder="password" {...bindPassword}/>
        </p>
        <p>
          <input className="signup-btn" type="submit" value="Signin" />
        </p>
      </form>
    </div>
  )
}

export default LoginPage;