import React from 'react';
import { Card, Col, Row } from 'antd';
import { useJsonFetch } from '../../hooks/custom.hook';
import './style.css';

const { Meta } = Card;

const IMAGE_URI = 'https://api.unsplash.com/photos/?client_id=ymAXFkQQrTalfx_MuDH62nGYVZT1eO3d6xmGwRyn7K4&page=1&per_page=100';

// { xs: 16, sm: 16, md: 24, lg: 24, xl: 32, xxl: 32 }

const ImageList: React.FC = () => {
  const { response } = useJsonFetch(IMAGE_URI);
  return (
    <div className="image-list-container">
      <Row gutter={{ xs: 32, sm: 32, md: 32, lg: 32, xl: 32, xxl: 32 }}>
        {response && response.map(({ id, urls, description, alt_description }: any) =>
          <Col key={id} xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}>
            <Card
              hoverable
              cover={<img alt={alt_description} src={urls.full}/>}
            >
              {description && <Meta title={description} description={description}/>}
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ImageList;
