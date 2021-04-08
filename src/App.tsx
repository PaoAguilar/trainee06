import React, { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTE } from './components/types/routing';
import AuthProvider from './components/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./components/pages/Login'));
const Home = lazy(() => import('./components/pages/Home'));
const ListOfGames = lazy(() => import('./components/pages/ListOfGames'));
const GameDetail = lazy(() => import('./components/pages/GameDetail'));

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback>
          <Layout>
            <Route exact path={ROUTE.LOGIN} component={Login} />
            <PrivateRoute exact path={ROUTE.HOME} component={Home} />
            <PrivateRoute exact path={ROUTE.LIST_OF_GAMES} component={ListOfGames} />
            <PrivateRoute exact path={ROUTE.GAME_DETAIL} component={GameDetail} />
          </Layout>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
