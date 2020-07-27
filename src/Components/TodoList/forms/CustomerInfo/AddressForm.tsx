import React from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import AppFormField from '../../../Shared/AppFormField';

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 4 },
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 20 },
  // },
  // labelCol: {
  //   xs: { span: 0 },
  //   sm: { span: 0 },
  // },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const AddressForm: React.FC<any> = ({ defaultValue, onSubmit, onCancel }: any) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Form
        form={form}
        name="todo_list_search"
        className="todo-list-search"
        layout="vertical"
        defaultValue={defaultValue}
        onFinish={onSubmit}
        {...formItemLayoutWithOutLabel}
      >
        <Row gutter={24}>
          <React.Fragment>
            <AppFormField type="text" name="phoneNumber" label="Loan ID"/>
            <AppFormField type="text" name="remark" label="Name EN"/>
          </React.Fragment>
        </Row>

        <Form.List name="users">
          {(fields, { add, remove }) => {
            return (
              <div>
                <span>Phone Number</span>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'first']}
                      fieldKey={[field.fieldKey, 'first']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                    >
                      <Input placeholder="Type phone number"/>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'last']}
                      fieldKey={[field.fieldKey, 'last']}
                      rules={[{ required: true, message: 'Missing last name' }]}
                    >
                      <Input placeholder="Remark"/>
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined/> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Row>
          <Col className="text-right" span={24}>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => onCancel(form)}>
                Cancel
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddressForm;