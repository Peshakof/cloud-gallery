import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import userService from '../../services/user-service';

function Logout() {

  useEffect(()=>{
    userService.logout();
  })
  return(
    <Redirect to='/signin' />
  )
}

export default Logout;