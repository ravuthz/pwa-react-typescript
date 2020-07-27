import React from 'react';
import { Descriptions } from 'antd';
import * as _ from 'lodash';

const AppDescription: React.FC<any> = ({ title, content, children, ...props }) => {
  return (
    <React.Fragment>
      <Descriptions title={title} {...props}>
        {content && _.map(content, ({ label, value }, index) => (
          <Descriptions.Item key={index} label={<strong>{label}</strong>}>{value}</Descriptions.Item>
        ))}
      </Descriptions>
      {children}
    </React.Fragment>
  );
};

export default AppDescription;