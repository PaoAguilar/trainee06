import React, { useRef, useContext } from 'react';
import { authLogin } from '../config/actions';
import { AuthContext } from './context/AuthContext';
import { useHistory } from 'react-router-dom';
import '../styles/login.scss';

function Login() {
  let history = useHistory();
  // initialise with null, but telling TypeScript we are looking for an HTMLInputElement
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setJwt } = useContext(AuthContext);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ((usernameRef && passwordRef)  && (usernameRef.current && passwordRef.current)){
        const identifier = usernameRef.current.value;
        const password = passwordRef.current.value;
        authLogin(identifier, password).then((data) => {
            // console.log(data);
            localStorage.setItem('jwt', data.jwt);
            setJwt(data.jwt);
            history.push("/home")
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
