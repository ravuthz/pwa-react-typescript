import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Alert } from "antd";

import "./App.css";
import { useNetwork } from "../hook";

const { Header, Content, Footer } = Layout;

const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About/About"));
const Todos = lazy(() => import("./Todos/Todos"));

const App: React.FC = () => {
  const { isOnline } = useNetwork();

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
            </Menu>
          </Header>
          {isOnline ? (
            <Alert message="You're online now" type="success" showIcon />
          ) : (
            <Alert message="You're offline now" type="error" showIcon />
          )}
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
            React Todo PWA @2020 Ravuthz
          </Footer>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
