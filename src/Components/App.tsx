import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.less";

import AuthRoute from './Auth/AuthRoute';

const HomePage = lazy(() => import('./Home/HomePage'));
// const AboutPage = lazy(() => import('./About/AboutPage'));
// const TodoPage = lazy(() => import('./Todoes/TodoPage'));
// const PhotoPage = lazy(() => import('./Photos/PhotoPage'));
// const ImagePage = lazy(() => import('./Images/ImagePage'));
const TodoListPage = lazy(() => import('./TodoList/TodoListPage'));
const LoginPage = lazy(() => import('./Auth/LoginPage/LoginPage'));
const LogoutPage = lazy(() => import('./Auth/LogoutPage/LogoutPage'));
const DefaultLayout = lazy(() => import('./Layout/DefaultLayout/DefaultLayout'));

const App: React.FC<any> = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          {/*<AuthRoute path="/images" component={ImagePage} layout={DefaultLayout}/>*/}
          {/*<AuthRoute path="/photos" component={PhotoPage} layout={DefaultLayout}/>*/}
          {/*<AuthRoute path="/todos" component={TodoPage} layout={DefaultLayout}/>*/}
          {/*<AuthRoute path="/about" component={AboutPage} layout={DefaultLayout}/>*/}
          <Route key="login" exact={true} path="/login">
            <LoginPage/>
          </Route>
          <Route key="logout" exact={true} path="/logout">
            <LogoutPage/>
          </Route>
          <AuthRoute key="todo-list" exact={true} path="/todo-list" component={TodoListPage} layout={DefaultLayout}/>
          <AuthRoute key="home" exact={true} path="/" component={HomePage} layout={DefaultLayout}/>
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;
