import React, {createContext, useState} from 'react';
import Cookies from 'js-cookie'

export const UserContext = createContext();

export const Auth = props => {
  const [auth, setAuth] = useState(Cookies.get('token') !== undefined);
  return(
    <UserContext.Provider value={[auth, setAuth]}>
      {props.children}
    </UserContext.Provider>  
  )
}