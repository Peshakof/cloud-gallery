import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import 'react-toastify/dist/ReactToastify.css';

const host = 'http://localhost:8000/api';

const userRequester = {
  register: (username,password,avatar) => {
    axios
      .post(`${host}/user/register`, {
        username,
        password,
        avatar
        // repeatPass
      })
      .then(() => {
        toast.success('Successfully registered');
      })
      .catch(err => {
        toast.error(err);
      });
  },

  login: (username, password) => {
    axios
      .post(`${host}/user/login`, {
        username,
        password
      })
      .then((res) => {
        const {token, user} = res.data;
        toast.success('You are logged in');
        Cookies.set('token', token);
        Cookies.set('user', user);
      })
      .catch(() => {
        toast.error('Incorrect username or password!');
      });
  },

  logout: () => {
    axios.post(`${host}/user/logout`)
      .then((res) => {
        Cookies.remove('token');
        Cookies.remove('user');
        toast.success(`${res.data}`);
      })
      .catch(err => {
        toast.error(err);
      });
  }
}

export default userRequester;