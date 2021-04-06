import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';

import PropTypes from 'prop-types';

interface AuthProviderProps {
  children: ReactNode;
  // any other props that come into the component
}

interface ContextTypes {
  jwt: string,
  setJwt: (jwt:string) => void
}

export const AuthContext = createContext<ContextTypes>({jwt:'', setJwt:()=>{}});

export const useAuth = () => {
  const authState = useContext(AuthContext);
  return authState;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [jwt, setJwt] = useState<string>('');
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
