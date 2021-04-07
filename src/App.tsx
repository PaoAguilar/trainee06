import React from 'react';
import Layout from './components/Layout';
import AuthProvider from './components/context/AuthContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import ListOfGames from './components/pages/ListOfGames';
import GameDetail from './components/pages/GameDetail';
import { ROUTE } from './components/types/routing';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Route exact path={ROUTE.LOGIN}>
            <Login />
          </Route>
          <Route exact path={ROUTE.HOME}>
            <Home />
          </Route>
          <Route exact path={ROUTE.LIST_OF_GAMES}>
            <ListOfGames />
          </Route>
          <Route exact path={ROUTE.GAME_DETAIL}>
            <GameDetail />
          </Route>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
