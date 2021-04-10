import React, { useState, useEffect, useCallback } from 'react';

import GameCard from '../GameCard';
import { getListOfGames, searchGames } from '../../config/actions';
import { Game } from '../types/interfaces';
import { useHistory } from 'react-router-dom';
import { ROUTE } from '../types/routing';
import '../../styles/listOfGames.scss';

const ListOfGames = () => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [gameName, setGameName] = useState('');
  const [genre, setGenre] = useState('');
  let history = useHistory();

  const fetchGames = useCallback(() => {
    getListOfGames(currentPage).then((result) => {
      setGameList(result);
      history.push(`${ROUTE.LIST_OF_GAMES}?page=${currentPage}`);
    });
  }, [currentPage, history]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchGames();
    return () => {
      abortController.abort();
    };
  }, [fetchGames]);

  const urlEncodedGameName = encodeURI(gameName)
  const urlEncodedGenre = encodeURI(genre)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    history.push(`${ROUTE.LIST_OF_GAMES}?find_game=${urlEncodedGameName}&find_genre=${urlEncodedGenre}`)
    searchGames(gameName,genre).then((result) => {
      console.log(result)
      setGameList(result)
    });
    // searchGames(gameName,genre)
    // console.log(gameName, genre);
  };

  return (
    <div>
      <h1>
        LIST OF GAMES (page
        {currentPage + 1} )
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className="movie">
        {gameList.map((game: Game) => {
          return <GameCard key={game.id} game={game} />;
        })}
      </div>
      <div className="button-container">
        <button
          type="button"
          className="button-container__previous"
          onClick={() => {
            if (currentPage > 0) {
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
            if (currentPage >= 0 && currentPage < 2) {
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
