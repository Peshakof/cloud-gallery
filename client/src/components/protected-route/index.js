import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {UserContext} from '../contexts/user-context';
 
const ProtectedRoute = ({ component: Component, ...rest}) => {
  const [auth] = useContext(UserContext);
  return(
    <Route 
      {...rest}
      render={() => auth ? (
        <Component /> 
      ) : (
        <Redirect to="signin" />
      )
    }
    />
  )
}

export default ProtectedRoute;