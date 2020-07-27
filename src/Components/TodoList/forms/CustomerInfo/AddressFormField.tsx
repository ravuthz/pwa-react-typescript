import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';

import { Form, Input, Space } from 'antd';

const AddressFormField: React.FC<any> = ({ onRemove, ...props }) => {
  return (
    <div>
      <Space key={props.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
        <Form.Item {...props} name="phoneNumber">
          <Input placeholder="Type phone number" />
        </Form.Item>
        <Form.Item {...props} name="remark">
          <Input placeholder="Remark"/>
        </Form.Item>
        <MinusCircleOutlined onClick={onRemove}/>
      </Space>
    </div>
  );
};

export default AddressFormField;