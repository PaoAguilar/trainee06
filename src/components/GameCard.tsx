import React from 'react';

import PropTypes from 'prop-types';
import { Game } from './types/interfaces';
import { useHistory } from 'react-router-dom';
import { ROUTE } from './types/routing';

const GameCard = ({ game }: { game: Game }) => {
  let history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(ROUTE.GAME_DETAIL.replace(':gameId', `${game.id}`));
      }}
      key={game.id}
      className="movie__container"
    >
      <div className="movie__image">
        {!game.cover_art ? (
          <img
            alt="movie"
            src="https://airocean.com.pe/wp-content/uploads/2019/10/image-not-found.png"
          />
        ) : (
          <img alt="movie" src={game.cover_art.url} />
        )}
      </div>

      <div className="movie__card-body">
        <p>{game.name}</p>
        <p>{game.release_year}</p>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameCard;
