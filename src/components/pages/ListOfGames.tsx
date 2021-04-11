import React, { useState, useEffect, useCallback } from 'react';

import GameCard from '../GameCard';
import { getListOfGames, searchGames } from '../../config/actions';
import { Game } from '../types/interfaces';
import { useHistory, useLocation } from 'react-router-dom';
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

  const search = useLocation().search
  
  useEffect(() => {
    const query = new URLSearchParams(search);
    const abortController = new AbortController();
    if (query.get('find_game') || query.get('find_genre')){
      searchGames(query.get('find_game')!, query.get('find_genre')!).then((result) => {
        console.log(result)
        setGameList(result)
      });
    }else{
      fetchGames();
    }
    return () => {
      abortController.abort();
    };
  }, [fetchGames, search]);

  const urlEncodedGameName = encodeURI(gameName)
  const urlEncodedGenre = encodeURI(genre)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    history.push(`${ROUTE.LIST_OF_GAMES}?find_game=${urlEncodedGameName}&find_genre=${urlEncodedGenre}`)
    searchGames(gameName, genre).then((result) => {
      console.log(result)
      setGameList(result)
    });
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
          className="input-text"
          placeholder="Game"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          className="input-text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button className="button-search">Search</button>
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
