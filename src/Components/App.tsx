import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Alert } from "antd";

import "./App.css";
import { useWindowEvent } from "../hook";

const { Header, Content, Footer } = Layout;

const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const Todos = lazy(() => import("./Todos/Todos"));

const App: React.FC = () => {
  const [offline, setOffline] = useState(false);
  useWindowEvent("online", () => setOffline(false));
  useWindowEvent("offline", () => setOffline(true));

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout className="layout">
          <Header>
            <div className="logo" />
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
            </Menu>
          </Header>
          <Content style={{ padding: "45px" }}>
            {offline ? <Alert message="You're offline now" type="error" showIcon />:<Alert message="You're online now" type="success" showIcon />}
            <div className="site-layout-content">
              <Switch>
                <Route path="/todos">
                  <Todos />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
