import React from 'react';
import PropTypes from 'prop-types';
import { Game } from './types/interfaces';
import { useHistory } from 'react-router-dom';

const GameCard = ({ game }: { game: Game }) => {
  let history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(`/gameDetail/${game.id}`)
        // console.log(game.id)
      }}
      key={game.id}
      className="movie__container"
    >
      <img alt="movie" src={game.cover_art.url} />
      <div className="movie__card-body">
        <p>{game.name}</p>
        <p>{game.release_year}</p>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameCard;
