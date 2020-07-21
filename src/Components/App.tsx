import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Alert, Layout, Menu } from "antd";

import "./App.css";
import { useNetwork } from "../hooks/hook";
import PhotoPage from './Photos/PhotoPage';
import { useSelector } from 'react-redux';
import ImagePage from './Images/ImagePage';

const { Header, Content, Footer } = Layout;

const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const Todos = lazy(() => import("./Todos/Todos"));

const App: React.FC = () => {
  const { isOnline } = useNetwork();

  const isServiceWorkerInitialized = useSelector<any>(
    state => state.serviceWorkerInitialized
  );

  const isServiceWorkerUpdated = useSelector<any>(
    state => state.serviceWorkerUpdated
  );

  const serviceWorkerRegistration: any = useSelector<any>(
    state => state.serviceWorkerRegistration,
  );

  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;
    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });
      registrationWaiting.addEventListener('statechange', (event: any) => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout className="layout">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="todos">
                <Link to="/todos">Todos</Link>
              </Menu.Item>
              <Menu.Item key="photos">
                <Link to="/photos">Photos</Link>
              </Menu.Item>
              <Menu.Item key="images">
                <Link to="/images">Images</Link>
              </Menu.Item>
            </Menu>
          </Header>
          {isServiceWorkerInitialized && (
            <Alert message="Page has been saved for offline use" type="success" showIcon/>
          )}
          {isServiceWorkerUpdated && (
            <Alert
              message="There is a new version available."
              type="success" showIcon
              closeText="Update Now"
              onClose={updateServiceWorker}
            />
          )}
          {isOnline ? (
            <Alert message="You're online now" type="success" showIcon/>
          ) : (
            <Alert message="You're offline now" type="error" showIcon/>
          )}
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/images">
                  <ImagePage/>
                </Route>
                <Route path="/photos">
                  <PhotoPage/>
                </Route>
                <Route path="/todos">
                  <Todos/>
                </Route>
                <Route path="/about">
                  <About/>
                </Route>
                <Route exact path="/">
                  <Home/>
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            React Todo PWA @2020 Ravuthz
          </Footer>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
