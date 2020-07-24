import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const AboutPage: React.FC = () => (
  <Title level={3} className="page-header-title">This is a PWA</Title>
);

export default AboutPage;
