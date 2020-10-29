import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

// const host = 'http://localhost:8000/api';
const host = 'https://mern-cloud-gallery.herokuapp.com/api';

const userRequester = {
  register: (username,password,avatar) => {
    return axios
      .post(`${host}/user/register`, {
        username,
        password,
        avatar
        // repeatPass
      })
  },

  login: (username, password) => {
   return axios
    .post(`${host}/user/login`, {
      username,
      password
    })
  },

  logout: () => {
    return axios.post(`${host}/user/logout`);
  },

  getUserInfo: (id) => {
    return axios.get(`${host}/user/userInfo/${id}`);
  },

  getUserImages: (id) => {
    return axios.get(`${host}/images/getUserImages/${id}`);
  }
}

export default userRequester;