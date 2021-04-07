import React, { memo } from 'react';

import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../config/constants';
import '../../styles/header.scss';
import { ROUTE } from '../types/routing';

const Header = () => {
  let history = useHistory();
  const { jwt } = useAuth();
  return (
    <header className="header">
      <div
        onClick={() => {
          if (jwt) history.push(ROUTE.HOME)
        }}
        className="header__logo"
      />
      <nav>
        <h1>GAME ZONE</h1>
      </nav>
      <div className="header__link">
        <button
          type="button"
            onClick={() => {
              if (jwt) history.push(ROUTE.LIST_OF_GAMES)
            }}
        >
          LIST
        </button>
        <button type="button">ABOUT US</button>
        <button type="button">CONTACT US</button>
        {jwt && (
          <button
            type="button"
            className="logout"
            onClick={() => {
              localStorage.removeItem(ACCESS_TOKEN);
              history.push(ROUTE.LOGIN)
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
