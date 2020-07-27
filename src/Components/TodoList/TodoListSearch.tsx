import React, { useState } from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import AppFormField from '../Shared/AppFormField';


const officerList = [
  {
    label: 'Officer 1',
    value: 'Officer 1'
  }
];

const TodoListSearch: React.FC<any> = ({ defaultValue, onSubmit, onCancel }: any) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const onChange = (event: any) => {
    console.log('event: ', event.target.checked);
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
          <React.Fragment>
            <AppFormField type="select" name="officer" label="Officer" options={officerList}/>
            <AppFormField type="text" name="LoanID" label="Loan ID"/>
            <AppFormField type="text" name="NameInEnglish" label="Name EN"/>
            <AppFormField type="text" name="NameInKhmer" label="Name KH"/>
          </React.Fragment>
          {expand && (
            <React.Fragment>
              <AppFormField type="date" name="startRepaymentDate" label="Start Repayment"/>
              <AppFormField type="date" name="endRepaymentDate" label="Ent Repayment"/>
              <AppFormField type="date" name="startPromiseDate" label="Start Promise"/>
              <AppFormField type="date" name="endPromiseDate" label="End Promise"/>
              <AppFormField type="select" name="STATUS" label="Status"/>
              <AppFormField type="date" name="shiftLC" label="Shift LC"/>
              <AppFormField type="check" name="sortCalled" label="Sort Called" defaultChecked={true} onChange={onChange}/>
              <AppFormField type="select" name="statusCalled" label="Status Called"/>
              <AppFormField type="select" name="todo" label="Todo"/>
            </React.Fragment>
          )}
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
              <Button onClick={() => setExpand(!expand)}>
                {expand ? <UpOutlined/> : <DownOutlined/>} Filter
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TodoListSearch;