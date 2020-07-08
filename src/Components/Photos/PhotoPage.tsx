import React from "react";
import { Typography } from "antd";
import PhotoList from './PhotoList';

const { Title } = Typography;

const PhotoPage: React.FC = () => (
  <>
    <Title level={3} className="page-header-title">
      Photo List
    </Title>
    <PhotoList/>
  </>
);

export default PhotoPage;
