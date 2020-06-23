import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './App.css';

const Home = lazy(() => import('./Home/Home'));
const About = lazy(() => import('./About/About'));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}> 
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
