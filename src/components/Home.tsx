import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import '../styles/home.scss';

const Home = () => {
  const { jwt } = useAuth();
  let history = useHistory()
  return (
    <>
      <div className="home-logo" />
      <div className="wrap-text">
        <h1>A new game experience waiting to be discovered </h1>
        <h5>{jwt}</h5>
      </div>
      <div className="movies-button">
        <button type="button" onClick={() => {
              history.push("/listOfGames")
            }}>Go to games</button>
      </div>
    </>
  );
};

export default Home;
