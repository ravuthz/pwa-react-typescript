import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import NetworkBar from "../../NetworkBar/NetworkBar";
import AuthService from "../../../services/auth.service";

import "./DefaultLayout.css";

const { Header, Content, Footer } = Layout;

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Layout className="layout-wrapper">
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
            {AuthService.isAuthenticate() ? (
              <Menu.Item key="logout">
                <Link to="/logout"><LogoutOutlined/>&nbsp;Logout</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="login">
                <Link to="/login"><LoginOutlined/>&nbsp;Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <NetworkBar/>
        <Content className="content-wrapper">
          <div className="content">{children}</div>
        </Content>
        <Footer>
          React Todo PWA @2020 Ravuthz
        </Footer>
      </Layout>
    </React.Fragment>
  );
};

export default DefaultLayout;
