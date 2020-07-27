import React from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import AppFormField from '../../../Shared/AppFormField';

const CommentSearch: React.FC<any> = ({ defaultValue }) => {
  const [form] = Form.useForm();

  const onSubmit = (data: any) => {
    //
  }

  const onCancel = (form: any) => {
    //
  }

  return (
    <div>
      <Form
        form={form}
        name="todo_list_search"
        className="todo-list-search"
        layout="vertical"
        defaultValue={defaultValue}
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <AppFormField type="select" name="action" label="Action"/>
          <AppFormField type="select" name="to" label="To"/>
          <AppFormField type="select" name="who" label="Who"/>
          <AppFormField type="select" name="result" label="Result"/>
          <AppFormField type="select" name="situationFromAction" label="Situation"/>
          <AppFormField type="text" name="remark" label="Remark"/>
        </Row>

        <Row>
          <Col className="text-right" span={24}>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                Search
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

export default CommentSearch;