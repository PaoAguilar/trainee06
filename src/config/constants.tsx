const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const ENDPOINTS = {
  GET_LISTOFGAMES: BASE_URL + '/games',
  GET_GAMES: BASE_URL + '/games/:gameId',
  GET_AUTHENTICATION: BASE_URL + '/auth/local',
};
export const ITEMS_PER_PAGE = 7;
export const ACCESS_TOKEN = 'ACCESS_TOKEN';