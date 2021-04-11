import React, { useState, useEffect, useReducer } from 'react';

import { getComments, createComment, getGame } from '../../config/actions';
import { Comment } from '../types/interfaces';
import { useParams } from 'react-router-dom';
import { initialState, reducer } from '../../config/reducer';
import '../../styles/gameDetail.scss';

const GameDetail = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [newComment, setNewComment] = useState('');
  const { gameId } = useParams<{ gameId: string }>();

  useEffect(() => {
    getGame(gameId).then((result) => {
      dispatch({
        type: 'SET_GAME',
        payload: { game: result },
      });
    });
  }, [gameId]);

  useEffect(() => {
    if (state.game) {
      getComments(state.game.id).then((result) => {
        dispatch({
          type: 'SET_GAME_COMMENTS',
          payload: { gameComment: result },
        });
      });
    }
  }, [state.game]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (state.game) {
      createComment(state.game.id, newComment).then((result) => {
        dispatch({
          type: 'ADD_GAME_COMMENT',
          payload: { commentAdded: result },
        });
      });
      setNewComment('');
    }
  };
  const hadleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  return (
    <>
      {state.game ? (
        <div>
          <h1>DETAILS OF {state.game.name}</h1>
          <div className="game">
            <div className="game__container">
              <h1 className="game__title">{state.game.name}</h1>
              <h2 className="game__subtitle">{state.game.genre.name}</h2>
              {!state.game.cover_art ? (
                <img
                  alt="movie"
                  className="game__image"
                  src="https://airocean.com.pe/wp-content/uploads/2019/10/image-not-found.png"
                />
              ) : (
                <img
                  className="game__image"
                  alt="movie"
                  src={state.game.cover_art.url}
                />
              )}
              <div className="game__date">
                <h4>Year of release: {state.game.release_year}</h4>
              </div>
              <div className="game__date">
                <h4>Genre: {state.game.genre.name}</h4>
              </div>
              <div className="game__date">
                <h4>Price: ${state.game.price}</h4>
              </div>
              <div className="comments">
                <br />
                <div className="game__scroll">
                  <h3>Comments:</h3>
                  {state.gameComment.map((comment: Comment) => {
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
