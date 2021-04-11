import React, { createContext, useState, useContext, useMemo } from 'react';

import PropTypes from 'prop-types';
import { ACCESS_TOKEN } from '../../config/constants';
import { ChildrenProps, ContextTypes } from '../types/interfaces';

export const AuthContext = createContext<ContextTypes>({
  jwt: '',
  setJwt: () => {},
});

export const useAuth = () => {
  const authState = useContext(AuthContext);
  return authState;
};

const AuthProvider = ({ children }: ChildrenProps) => {
  const [jwt, setJwt] = useState<string>(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      return JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '');
    }
    return '';
  });
  const providerValue = useMemo(() => ({ jwt, setJwt }), [jwt, setJwt]);
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default AuthProvider;
