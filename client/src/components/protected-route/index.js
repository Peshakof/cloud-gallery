import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({loggedIn, component: Component, ...rest}) => {
  return(
    <Route 
      {...rest}
      render = {() => loggedIn ? (
        <Component /> 
      ) : (
        <Redirect to="signin" />
      )
    }
    />
  )
}

export default ProtectedRoute;