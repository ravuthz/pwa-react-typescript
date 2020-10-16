import React, { useState } from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import AppFormField from '../Shared/AppFormField';
import { useAxiosGet } from '../../hooks/axios.hook';

const TodoListSearch: React.FC<any> = ({ defaultValue, onSubmit, onCancel, onFreeze }: any) => {
	const [ expand, setExpand ] = useState(false);
	const [ form ] = Form.useForm();

	const { result: officerOptions } = useAxiosGet('todo_list/getUser');
	const { result: resultOptions } = useAxiosGet('todo_list/getResult');
	const { result: statusOptions } = useAxiosGet('todo_list/getStatusMorakot');
	const { result: todoOptions } = useAxiosGet('todo_list/getTodo');

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
					{expand && (
						<React.Fragment>
							<AppFormField type="select" name="officer" label="Officer" options={officerOptions}/>
							<AppFormField type="text" name="loanID" label="Loan ID"/>
							<AppFormField type="text" name="nameInEnglish" label="Name EN"/>
							<AppFormField type="text" name="nameInKhmer" label="Name KH"/>
							<AppFormField type="date" name="startRepaymentDate" label="Start Repayment"/>
							<AppFormField type="date" name="endRepaymentDate" label="End Repayment"/>
							<AppFormField type="date" name="startPromiseDate" label="Start Promise"/>
							<AppFormField type="date" name="endPromiseDate" label="End Promise"/>
							<AppFormField type="select" name="STATUS" label="Status" options={statusOptions}/>
							<AppFormField type="date" name="shiftLC" label="Shift LC"/>
							<AppFormField type="check" name="sortCalled" label="Sort Called"/>
							<AppFormField type="select" name="statusCalled" label="Status Called"
							              options={resultOptions}/>
							<AppFormField type="select" name="todo" label="Todo" options={todoOptions}/>
						</React.Fragment>
					)}
				</Row>
				<Row gutter={24}>
					<Col span={12}>
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
					<Col className="text-right" span={12}>
						<Space size="middle">
							<Button onClick={() => onFreeze()}>
								Sync Data
							</Button>
						</Space>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default TodoListSearch;