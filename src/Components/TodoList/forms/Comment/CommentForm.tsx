import React from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import useAxios from '../../../../hooks/axios.hook';
import { authHeader } from '../../../../services/axios.service';
import AppFormField from '../../../Shared/AppFormField';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

const CommentForm: React.FC<any> = ({ defaultValue }) => {
  const [form] = Form.useForm();

  const [{ data: to }] = useAxios({
    url: 'todo_list/getAllValueInCombo/CALL_PLACE',
    headers: authHeader()
  });

  const [{ data: who }] = useAxios({
    url: 'todo_list/getAllValueInCombo/WHO',
    headers: authHeader()
  });

  const [{ data: action }] = useAxios({
    url: 'todo_list/getAllValueInCombo/ACTION',
    headers: authHeader()
  });

  const [{ data: result }] = useAxios({
    url: 'todo_list/getAllValueInCombo/COMMENT_CAN_NOT_CONTACT',
    headers: authHeader()
  });

  const [{ data: situation }] = useAxios({
    url: 'todo_list/getAllValueInCombo/SITUATION_ACT',
    headers: authHeader()
  });

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
        <Row>
          <Col span={24}>
            <Space size="middle">
              <Button icon={<PlusOutlined/>} type="primary" htmlType="submit">Add</Button>
              <Button icon={<CloseOutlined/>} onClick={() => onCancel(form)}>Cancel</Button>
            </Space>
          </Col>
        </Row>
        <br/>
        <Row gutter={24}>
          <AppFormField type="select" name="action" label="Action" options={action ? action.data.content : []}/>
          <AppFormField type="select" name="to" label="To" options={to ? to.data.content : []}/>
          <AppFormField type="select" name="who" label="Who" options={who ? who.data.content : []}/>
          <AppFormField type="select" name="result" label="Result" options={result ? result.data.content : []}/>
          <AppFormField type="select" name="situationFromAction" label="Situation"
                        options={situation ? situation.data.content : []}/>
          <AppFormField type="text" name="remark" label="Remark"/>
        </Row>
      </Form>
    </div>
  );
};

export default CommentForm;