import { Game } from '../components/types/interfaces';

type Action = {
  type: 'SET_GAME';
  payload: {
    game: Game;
  };
};

export interface State {
  game: Game|null;
}

export const initialState:State =  { game:null }

export const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case 'SET_GAME': {
      const { game } = action.payload;
      if (game) return { ...state, game };
    }
  }
  return { ...state };
};