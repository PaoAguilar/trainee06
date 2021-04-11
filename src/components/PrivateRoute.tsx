import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROUTE } from './types/routing';
import { RouteProps } from 'react-router';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const { jwt } = useAuth();
  return (
    <Route
      {...rest}
      render={() => (jwt ? children : <Redirect to={ROUTE.LOGIN} />)}
    />
  );
};

export default PrivateRoute;
