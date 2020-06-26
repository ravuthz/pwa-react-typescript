import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Home: React.FC = () => (
  <Title level={3} className="page-header-title">Welcome to your PWA!</Title>
);

export default Home;
