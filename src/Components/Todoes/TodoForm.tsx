import { FontSizeOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React, { useState } from "react";

import { TodoService } from "../../services/todo.service";

const TodoForm: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<any>({});

  const onSuccess = (values: any) => {
    TodoService.create(values)
      .then(res => form.resetFields())
      .catch(error => setError(error));
  };

  const onFailure = (error: any) => setError(error);

  if (error) {
    console.log("Error: ", error);
  }

  return (
    <div className="todo-form-container">
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{ title: "", completed: false }}
        onFinish={onSuccess}
        onFinishFailed={onFailure}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input allowClear size="large" prefix={<FontSizeOutlined />} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoForm;
