import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import userService from '../../services/user-service';
import { UserContext } from '../contexts/user-context';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Logout() {
  const [auth, setAuth] = React.useContext(UserContext);
  
  useEffect(()=>{
    userService.logout()
      .then((res) => {
        Cookies.remove('token');
        Cookies.remove('user');
        const isLogged = Cookies.get('token') !== undefined;
        setAuth(isLogged);
        console.log(isLogged);
        toast.success(`${res.data}`);
      })
      .catch(err => {
        toast.error(err);
      });
  })
  return(
    <Redirect to='/signin' />
  )
}

export default Logout;