import { Game, Comment } from '../components/types/interfaces';

type Action = {
  type: 'SET_GAME' | 'SET_GAME_COMMENTS' | 'ADD_GAME_COMMENT';
  payload: {
    game?: Game;
    gameComment?: Comment[];
    commentAdded?: Comment;
  };
};

export interface State {
  game: Game | null;
  gameComment: Comment[];
//   commentAdded: Comment | null;
}

export const initialState: State = {
  game: null,
  gameComment: [],
//   commentAdded: null
};

export const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case 'SET_GAME': {
      const { game } = action.payload;
      if (game) return { ...state, game };
      break
    }
    case 'SET_GAME_COMMENTS': {
      const { gameComment } = action.payload;
      console.log(gameComment);
      if (gameComment) return { ...state, gameComment };
      break;
    }
    case 'ADD_GAME_COMMENT': {
        const { commentAdded } = action.payload;
        if (commentAdded) return { ...state, gameComment:[...state.gameComment, commentAdded ] };
        break
      }
  }
  return { ...state };
};
