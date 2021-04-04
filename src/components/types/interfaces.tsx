export interface Game {
  id: number;
  name: string;
  release_year: number;
  price: number;
  genre: {
    name: string;
  };
  cover_art: {
    url: string;
  };
}

export interface Comment {
  user: {
    firstName: string;
    lastName: string;
  };
  body: string;
  id: number;
}
