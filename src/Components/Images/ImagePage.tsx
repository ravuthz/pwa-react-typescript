import React from "react";
import { Typography } from "antd";
import ImageList from './ImageList';

const { Title } = Typography;

const ImagePage: React.FC = () => (
  <>
    <Title level={3} className="page-header-title">
      Image List
    </Title>
    <ImageList/>
  </>
);

export default ImagePage;
