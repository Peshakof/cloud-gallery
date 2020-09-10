import React, { useState, useContext } from 'react';
import useInput from '../input-change-hook/useInputChange';
import loginValidator from '../../validations/login-validator';
import userService from '../../services/user-service';
import { UserContext } from '../contexts/user-context';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const LoginPage = (props) => {

  const [auth, setAuth] = useContext(UserContext);
  const [username, bindUserName, updateUsername] = useInput('');
  const [password, bindPassword, updatePassword] = useInput('');

  const handleSubmit = e => {
    e.preventDefault();
    updateUsername();
    updatePassword();

    if (loginValidator(username, password)) {
      userService.login(username, password)
        .then((res) => {
          const {token, user} = res.data;
          Cookies.set('token', token);
          Cookies.set('user', user);
          toast.success('You are logged in');
          const cookie = Cookies.get('token') !== undefined;
          setAuth(cookie)
          props.history.push('/');
        })
        .catch(() => {
          toast.error('Incorrect username or password!');
        });
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