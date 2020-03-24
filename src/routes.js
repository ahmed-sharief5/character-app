import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./containers/Home";
import history from './utils/history';

const Routes = () => (
  <Router history={history}>
    <Header/>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);

export default Routes;
