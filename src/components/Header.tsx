import React, { memo } from 'react';
import { useAuth } from './context/AuthContext';
import '../styles/header.scss';
import { useHistory } from 'react-router-dom';

const Header = () => {
  let history = useHistory();
  const { jwt } = useAuth();
  return (
    <header className="header">
      <div
        onClick={() => {
          history.push("/home")
        }}
        className="header__logo"
      />
      <nav>
        <h1>GAME ZONE</h1>
        <h2>{jwt}</h2>
      </nav>
      <div className="header__link">
        <button
          type="button"
            onClick={() => {
              console.log('hi');
              history.push("/ListOfGames")
              // console.log(jwt)
              // if (jwt) changePage('ListOfGames');
            }}
        >
          LIST
        </button>
        <button type="button">ABOUT US</button>
        <button type="button">CONTACT US</button>
        {/* {jwt && ( */}
          <button
            type="button"
            className="logout"
            onClick={() => {
              localStorage.removeItem('jwt');
              history.push("/login")
              window.location.reload();
            }}
          >
            Logout
          </button>
        {/* )} */}
      </div>
    </header>
  );
};

export default memo(Header);
