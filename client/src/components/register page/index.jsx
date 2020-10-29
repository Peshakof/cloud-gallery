import React, { useState, useContext } from 'react';
import axios from 'axios';
import registerValidator from '../../validations/register-validator';
import userService from '../../services/user-service';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/user-context';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

const RegisterPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRePassword] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(UserContext);

  const onChangeHandler = e => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append('upload_preset', 'profile-pic');
    formData.append('file', files);
    setLoading(true);

    axios.post('https://api.cloudinary.com/v1_1/donaw6igw/image/upload', formData)
      .then((res) => setImage(res.data.secure_url))
      .then(() => {
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }

  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const updateRePassword = (e) => {
    setRePassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerValidator(username, password, repeatPass)) {
      userService.register(username, password, image)
      .then((res)=>{
        console.log(res.data)
        const {token, user} = res.data;
          Cookies.set('token', token);
          Cookies.set('user', user);
          toast.success('You are logged in');
          const cookie = Cookies.get('token') !== undefined;
          setAuth(cookie)
          props.history.push('/');
      })
    }
  }

  return (
    <div className="register-form-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <header>
          <h3>Fill the form to signup</h3>
        </header>
        <p>
          <input className="form-input" type="text" name="username" placeholder="username" value={username} onChange={updateUsername} />
        </p>
        <p>
          <input className="form-input" type="password" name="password" placeholder="password" value={password} onChange={updatePassword} />
        </p>
        <p>
          <input className="form-input" type="password" name="repeatPass" placeholder="confirm password" value={repeatPass} onChange={updateRePassword} />
        </p>
        <h4>choose your avatar</h4>
        <p>
          <input className="upload-file" type="file" name="image" onChange={onChangeHandler} />
        </p>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
            <img src={image} alt="" />
          )}
        <p>
          <input className="signup-btn" type="submit" value="Register" />
        </p>
      </form>
    </div>
  )
}

export default RegisterPage;
