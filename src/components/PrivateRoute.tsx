import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROUTE } from './types/routing';

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const { jwt } = useAuth();
  return (
    <Route
      {...rest}
      render={ () =>
        !!jwt ? (
          <RouteComponent />
        ) : (
          <Redirect to={ROUTE.LOGIN} />
        )
      }
    />
  );
};

export default PrivateRoute;
