import React from 'react';
import Layout from './components/Layout';
import AuthProvider from './components/context/AuthContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ListOfGames from './components/ListOfGames';
import GameDetail from './components/GameDetail';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/listOfGames">
            <ListOfGames />
          </Route>
          <Route exact path="/gameDetail/:gameId">
            <GameDetail />
          </Route>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
