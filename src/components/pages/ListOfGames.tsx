import React, { useState, useEffect, useCallback } from 'react';

import GameCard from '../GameCard';
import { getListOfGames } from '../../config/actions';
import { Game } from '../types/interfaces';
import '../../styles/listOfGames.scss';

const ListOfGames = () => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchGames = useCallback(() => {
    getListOfGames(currentPage).then((result) => {
      // console.log(result);
      setGameList(result);
    });
  }, [currentPage]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchGames();
    return () => {
      abortController.abort();
    };
  }, [fetchGames]);

  return (
    <div>
      <h1>
        LIST OF GAMES (page
        {currentPage})
      </h1>
      <div className="movie">
        {gameList.map((game:Game) => {
            // return console.log(game.id)
          return (
            <GameCard
              key={game.id}
              game={game}
            />
          );
        })}
      </div>
      <div className="button-container">
        <button
          type="button"
          className="button-container__previous"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="button-container__next"
          onClick={() => {
            if (currentPage >= 1 && currentPage < 3) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListOfGames;
