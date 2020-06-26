import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const About: React.FC = () => (
  <Title level={3} className="page-header-title">This is a PWA</Title>
);

export default About;
