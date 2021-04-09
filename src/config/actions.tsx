import { ENDPOINTS, ACCESS_TOKEN } from './constants';

export const getListOfGames = async (page: number) => {
  const start = page === 1 ? 1 : (page - 1) * 7 + 1;
  try {
    const res = await fetch(
      `${ENDPOINTS.GET_LISTOFGAMES}?_start=${start}&_limit=7`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getGame = async (gameId: string) => {
  try {
    const res = await fetch(ENDPOINTS.GET_GAMES.replace(':gameId', gameId));
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getComments = async (gameId: number) => {
  try {
    const res = await fetch(`${ENDPOINTS.GET_LISTOFGAMES}/${gameId}/comments`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchGames = async (gameName: string, genre: string) => {
  try {
    const res = await fetch(
      `${ENDPOINTS.GET_LISTOFGAMES}?name_contains=${gameName}&genre.name_contains=${genre}`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const authLogin = async (username: string, pass: string) => {
  try {
    const res = await fetch(ENDPOINTS.GET_AUTHENTICATION, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        identifier: username,
        password: pass,
      }),
    });
    if (res.status === 200) {
      const data = res.json();
      return data;
    }
    if (res.status === 403) {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.reload();
    }
    return Promise.reject();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createComment = async (gameId: number, bodyComment: string) => {
  const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN) || '');
  try {
    const res = await fetch(`${ENDPOINTS.GET_LISTOFGAMES}/${gameId}/comment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        body: bodyComment,
      }),
    });
    if (res.status === 200) {
      const data = res.json();
      return data;
    }
    return Promise.reject();
  } catch (error) {
    throw new Error(error.message);
  }
};
