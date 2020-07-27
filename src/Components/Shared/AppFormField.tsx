import React from 'react';
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Select } from 'antd';

const AppFormField: React.FC<any> = ({ span, name, label, rules, type, ...props }: any) => {
  const renderControls = () => {
    switch (type) {
      case 'select':
        return <Select className="input-select"  {...props}/>;
      case 'date':
        return <DatePicker className="input-date"  {...props}/>;
      case 'check':
        return <Checkbox className="input-check"  {...props}/>;
      case 'number':
        return <InputNumber className="input-number" {...props}/>;
      default:
        return <Input name={name} type={type} {...props}/>;
    }
  }
  return (
    <Col span={span || 6} key={name}>
      <Form.Item
        name={name}
        label={label}
        rules={rules}
      >
        {renderControls()}
      </Form.Item>
    </Col>
  );
};

export default AppFormField;