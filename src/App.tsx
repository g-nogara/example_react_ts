import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import Login from './components/Login';
import Menu from './pages/Menu';
import Paises from './pages/Paises';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Menu">
          <Menu />
        </Route>
        <Route path='/paises'>
          <Paises />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
