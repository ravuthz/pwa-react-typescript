import React, { useState } from 'react';
import { Button, Card, Space } from 'antd';
import { RotateLeftOutlined, RotateRightOutlined } from '@ant-design/icons';

const DocumentListItem: React.FC<any> = ({ type, data, onClick, display, rotate, ...props }) => {
  const [rotated, setRotated] = useState(0);

  const renderRotateButtons = () => {
    return (
      <>
        {rotate && (
          <Space>
            <Button icon={<RotateLeftOutlined/>} onClick={() => setRotated(rotated - 90)}/>
            <Button icon={<RotateRightOutlined/>} onClick={() => setRotated(rotated + 90)}/>
          </Space>
        )}
      </>
    );
  };

  const renderDocument = () => {
    if (type === 'iframe') {
      if (display === 'list') {
        return (
          <Card
            hoverable
            bodyStyle={{ display: 'none' }}
            cover={<img alt={data.documentType} src="file-pdf.png" style={cssRotate(rotated)} onClick={onClick}/>}
          >
          </Card>
        );
      }
      // display !== 'list' or display === 'show'
      return (
        <Card bodyStyle={{ padding: '0px', height: '1000px' }}>
          <iframe title={data.link} src={data.link} width="100%" height="1000px"/>
        </Card>
      );
    }
    // type !== 'iframe' or type === 'image'
    return (
      <Card title={data.documentType} bodyStyle={{ padding: '0px' }} {...props} extra={renderRotateButtons()}>
        <Card
          hoverable
          bodyStyle={{ display: 'none' }}
          cover={<img alt={data.documentType} src={data.link} style={cssRotate(rotated)} onClick={onClick}/>}
        >
        </Card>
      </Card>
    );
  }

  const cssRotate = (value: any) => {
    const styled: any = {
      WebkitTransform: `rotate(${value}deg)`,
      MozTransform: `rotate(${value}deg)`,
      MsTransform: `rotate(${value}deg)`,
      OTransform: `rotate(${value}deg)`,
      transform: `rotate(${value}deg)`,
      objectFit: 'cover'
    }
    return styled;
  };

  // console.log('DocumentListItem.data: ', data);

  if (!data.link) {
    // return <pre>{JSON.stringify(data, null, 2)}</pre>;
    return <></>;
  }

  return renderDocument();
};

export default DocumentListItem;