import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Checkbox, Col, Form, Input, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import './LoginPage.css';
import AuthService from '../../../services/auth.service';

const rowGutter = {
  xs: 16, sm: 16, md: 24, lg: 24, xl: 32, xxl: 32
};

const colGrid = {
  xs: { offset: 2, span: 20 },
  ms: { offset: 2, span: 20 },
  md: { offset: 6, span: 12 },
  lg: { offset: 8, span: 8 },
  xl: { offset: 8, span: 8 },
  xxl: { offset: 8, span: 8 },
}

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState<any>({
    username: 'adminz',
    password: '123123',
    remember: false,
  });

  const onFinish = (data: any) => {
    setFormValue(data);
    AuthService.login(data).then(res => {
      history.push('/');
    });
  };

  return (
    <div className="login-container">
      <Row {...rowGutter}>
        <Col {...colGrid}>
          <Card className="login-card" title="Login Page">
            <Form
              size="large"
              name="normal_login"
              className="login-form"
              initialValues={formValue}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default LoginPage;