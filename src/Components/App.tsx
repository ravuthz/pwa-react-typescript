import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import AuthRoute from './Auth/AuthRoute';

const HomePage = lazy(() => import('./Home/HomePage'));
const AboutPage = lazy(() => import('./About/AboutPage'));
const TodoPage = lazy(() => import('./Todoes/TodoPage'));
const PhotoPage = lazy(() => import('./Photos/PhotoPage'));
const ImagePage = lazy(() => import('./Images/ImagePage'));
const LoginPage = lazy(() => import('./Auth/LoginPage/LoginPage'));
const LogoutPage = lazy(() => import('./Auth/LogoutPage/LogoutPage'));
const DefaultLayout = lazy(() => import('./Layout/DefaultLayout/DefaultLayout'));

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute path="/images" component={ImagePage} layout={DefaultLayout}/>
          <AuthRoute path="/photos" component={PhotoPage} layout={DefaultLayout}/>
          <AuthRoute path="/todos" component={TodoPage} layout={DefaultLayout}/>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/logout">
            <LogoutPage/>
          </Route>
          <AuthRoute path="/about" component={AboutPage} layout={DefaultLayout}/>
          <AuthRoute exact path="/" component={HomePage} layout={DefaultLayout}/>
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;
