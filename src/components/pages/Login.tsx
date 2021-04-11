import React, { useRef, useContext } from 'react';

import { authLogin } from '../../config/actions';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../config/constants';
import { ROUTE } from '../types/routing';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../../styles/login.scss';

function Login() {
  let history = useHistory();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setJwt } = useContext(AuthContext);
  const [, setToken] = useLocalStorage(ACCESS_TOKEN, '');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      usernameRef &&
      passwordRef &&
      usernameRef.current &&
      passwordRef.current
    ) {
      const identifier = usernameRef.current.value;
      const password = passwordRef.current.value;
      authLogin(identifier, password).then((data) => {
        setToken(data.jwt);
        setJwt(data.jwt);
        history.push(ROUTE.HOME);
      });
    }
  };

  return (
    <div className="login">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <input ref={usernameRef} type="text" placeholder="E-mail" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
