import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Form, Input, notification, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import './LoginPage.css';
import AuthService from '../../../services/auth.service';
import { useAuthCtx } from '../../../context/auth';

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

const initialForm = {
	username: '',
	password: '',
};

const LoginPage: React.FC = () => {
	const history = useHistory();
	const { setUser, setUsername, setAuthenticated } = useAuthCtx();
	const [ formValue, setFormValue ] = useState<any>(initialForm);
	const [, setFormError ] = useState<any>();

	const onFinish = (data: any) => {
		setFormValue(data);
		setUsername(data.username);
		AuthService.login(data)
			.then(res => {
				setUser(res);
				setAuthenticated(true);
				history.push('/');
			})
			.catch(err => {
				console.log('LoginPage.err: ', err);
				const description = err.message;
				switch (description) {
					case 'Request failed with status code 400':
						setFormError("Incorrect username or password");
						break;
					default:
						setFormError(description);
						break;
				}
				notification.error({
					message: 'Error while login',
					description,
				});
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
								rules={[ { required: true, message: 'Please input your Username!' } ]}
							>
								<Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[ { required: true, message: 'Please input your Password!' } ]}
							>
								<Input
									prefix={<LockOutlined className="site-form-item-icon"/>}
									type="password"
									placeholder="Password"
								/>
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