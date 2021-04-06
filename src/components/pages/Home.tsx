import React from 'react';

import { useHistory } from 'react-router-dom';
import '../../styles/home.scss';

const Home = () => {
  let history = useHistory()
  return (
    <>
      <div className="home-logo" />
      <div className="wrap-text">
        <h1>A new game experience waiting to be discovered </h1>
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
