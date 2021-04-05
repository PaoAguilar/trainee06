import React, { useState, useEffect } from 'react';
import { getComments, createComment, getGame } from '../config/actions';
import { Game, Comment } from './types/interfaces';
import '../styles/gameDetail.scss';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  // interface Gamedetail {
  //   id:string
  // }

  const [gameComment, setGameComment] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [game, setGame] = useState<Game>();

  // console.log(useParams());

  const { gameId } = useParams<{ gameId: string }>();
  // console.log(gameId)

  useEffect(() => {
    getGame(gameId).then((result) => {
      console.log(result.id);
      console.log(result);

      setGame(result);
    });
  }, [gameId]);

  useEffect(() => {
    if (game) {
      getComments(game.id).then((result) => {
        setGameComment(result);
      });
    }
  }, [gameComment, game]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (game) {
      createComment(game.id, newComment).then((result) => {
        setGameComment([...gameComment, result]);
      });
    }
  };
  const hadleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  return (
    <>
      {game ? (
        <div>
          <h1>DETAILS OF {game.name}</h1>
          <div className="game">
            <div className="game__container">
              <h1 className="game__title">{game.name}</h1>
              <h2 className="game__subtitle">{game.genre.name}</h2>
              <img className="game__image" alt="" src={game.cover_art.url} />
              <div className="game__date">
                <h4>Year of release: {game.release_year}</h4>
              </div>
              <div className="game__date">
                <h4>Genre: {game.genre.name}</h4>
              </div>
              <div className="game__date">
                <h4>Price: {game.price}</h4>
              </div>
              <div className="comments">
                <br />
                <div className="game__scroll">
                  <h3>Comments:</h3>
                  {gameComment.map((comment: Comment) => {
                    return (
                      <div className="comments__all" key={comment.id}>
                        <h4>
                          <span>Name:</span> {comment.user.firstName}
                          {comment.user.lastName}
                        </h4>
                        <h4>Comment: {comment.body}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
              <br />
              <form className="comment-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-group">
                    <h3>New Comment</h3>
                    <br />
                    <input
                      id="comment-text"
                      placeholder="Write the new comment here"
                      type="text"
                      className="input"
                      value={newComment}
                      onChange={hadleChange}
                    />
                  </div>
                  <span className="user-advertising" />
                </div>
                <button type="submit" className="create-button">
                  Add comment
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GameDetail;
