import React, { useState } from 'react';
import { Button, Col, Form, Row, Space, Spin } from 'antd';
import { useAxiosGet } from '../../../../hooks/axios.hook';
import AppFormField from '../../../Shared/AppFormField';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

function requiredField(name: string) {
	const message = `Field ${name} is required`;
	return {
		[name]: [
			{ required: true, message }
		]
	};
}

let rules: any = {
	...requiredField('result'),
	...requiredField('to'),
	...requiredField('who'),
	...requiredField('action'),
	...requiredField('situation'),

	financialSituation: [],
	condition: [],
	requestAmount: [],
	requestMonth: [],
	paidDate: [],
	paidTime: [],
	paidAmount: [],
	sourcePayment: [],
	promiseDate: [],
	promiseTime: [],
	promiseAmount: [],
	callbackDate: [],
	callbackTime: [],
	partialExtend: [],
};

const times: any = [
	{ label: '6 AM', value: '6:am' },
	{ label: '7 AM', value: '7:am' },
	{ label: '8 AM', value: '8:am' },
	{ label: '9 AM', value: '9:am' },
	{ label: '10 AM', value: '10:am' },
	{ label: '11 AM', value: '11:am' },
	{ label: '12 PM', value: '12:pm' },
	{ label: '1 PM', value: '1:pm' },
	{ label: '2 PM', value: '2:pm' },
	{ label: '3 PM', value: '3:pm' },
	{ label: '4 PM', value: '4:pm' },
	{ label: '5 PM', value: '5:pm' },
	{ label: '6 PM', value: '6:pm' },
	{ label: '7 PM', value: '7:pm' },
	{ label: '8 PM', value: '8:pm' },
];

const CommentForm: React.FC<any> = ({ defaultValue, loading, onSubmit }) => {
	const [ form ] = Form.useForm();

	const [ isCall, setIsCall ] = useState(false);
	const [ selectedResult, setSelectedResult ] = useState();
	const [ selectedCondition, setSelectedCondition ] = useState();
	const [ allRules, setAllRules ] = useState(rules);

	const { result: action } = useAxiosGet('todo_list/getAllValueInCombo/ACTION/1');
	const { result, executeFetch: fetchResult } = useAxiosGet(`todo_list/getResult`);
	const { result: to, executeFetch: fetchTo } = useAxiosGet(`todo_list/getAllValueInCombo/CALL_PLACE/${isCall}`);
	const { result: who, executeFetch: fetchWho } = useAxiosGet(`todo_list/getAllValueInCombo/WHO/${isCall}`);
	const { result: situation, executeFetch: fetchSituation } = useAxiosGet(`todo_list/getAllValueInCombo/SITUATION_ACT/${isCall}`);
	const { result: financialSituation, executeFetch: fetchFinancialSituation } = useAxiosGet(`todo_list/getAllValueInCombo/IMPACR_COVID/${isCall}`);
	const { result: sourcePayment, executeFetch: fetchSourcePayment } = useAxiosGet(`todo_list/getAllValueInCombo/SOURCEPAYMENT/true`);
	const { result: condition, executeFetch: fetchCondition } = useAxiosGet(`todo_list/getAllValueInCombo/REQUEST/true`);

	// const { data, executePost } = useAxiosPost('todo_list/createComment');
	// const [{ data, loading, error }, executePost] = useAxios({
	//   url: 'todo_list/createComment',
	//   headers: authHeader(),
	//   method: 'POST'
	// }, { manual: true });

	const onCancel = (form: any) => {
		form.resetFields();
	}

	const onActionChange = (value: any) => {
		setIsCall(value === 'Call');
		fetchResult();
		fetchTo();
		fetchWho();
		fetchSituation();
		fetchSourcePayment();
		fetchFinancialSituation();
		fetchCondition();
	};

	const onResultChange = (value: any) => {
		setSelectedResult(value);
		switch (value) {
			case 'Request Restructure':
				setAllRules({
					...allRules,
					...requiredField('financialSituation'),
					...requiredField('condition'),
					...requiredField('requestAmount'),
					...requiredField('requestMonth'),
				});
				break;

			case 'Paid Ready':
				setAllRules({
					...allRules,
					...requiredField('paidDate'),
					...requiredField('paidTime'),
					...requiredField('paidAmount'),
					...requiredField('sourcePayment'),
				})
				break;

			case 'Promise to pay':
				setAllRules({
					...allRules,
					...requiredField('promiseDate'),
					...requiredField('promiseTime'),
					...requiredField('promiseAmount'),
				});
				break;

			case 'Will call back':
				setAllRules({
					...allRules,
					...requiredField('callbackDate'),
					...requiredField('callbackTime'),
				});
				break;
		}
	};

	const onConditionChange = (value: any) => {
		setSelectedCondition(value);
		switch (value) {
			case 'Partial Payment':
			case 'Extend Term':
				setAllRules({
					...allRules,
					...requiredField('partialExtend')
				});
				break;
		}
	};

	return (
		<div>
			<Spin spinning={loading}>
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
						<AppFormField type="select" name="action" label="Action" options={action} rules={allRules.action}
						              onChange={onActionChange}/>
						<AppFormField type="select" name="to" label="To" options={to} rules={allRules.to}/>
						<AppFormField type="select" name="who" label="Who" options={who} rules={allRules.who}/>
						<AppFormField type="select" name="result" label="Result" options={result} rules={allRules.result}
						              onChange={onResultChange}/>
						<AppFormField type="select" name="situationFromAction" label="Situation" options={situation}
						              rules={allRules.situation}/>
						<AppFormField type="text" name="remark" label="Remark"/>

						{selectedResult === 'Request Restructure' && (
							<>
								<AppFormField type="select" name="financialSituation" label="Financial Situation"
								              options={financialSituation} rules={allRules.financialSituation}/>
								<AppFormField type="select" name="conditional" label="Conditional" options={condition}
								              rules={allRules.condition} onChange={onConditionChange}/>

								{[ 'Partial Payment', 'Extend Term' ].indexOf(selectedCondition) !== -1 && (
									<AppFormField type="text" name="partialExtend" label={selectedCondition}
									              rules={allRules.partialExtend}/>
								)}

								<AppFormField type="text" name="requestAmount" label="Request Amount" rules={allRules.requestAmount}/>
								<AppFormField type="text" name="requestMonth" label="New Term" rules={allRules.requestMonth}/>
							</>
						)}

						{selectedResult === 'Paid Ready' && (
							<>
								<AppFormField type="date" name="paidDate" label="Paid Date" rules={allRules.paidDate}/>
								<AppFormField type="select" name="paidTime" label="Paid Time" options={times}
								              rules={allRules.paidTime}/>
								<AppFormField type="text" name="paidAmount" label="Paid Amount" rules={allRules.paidAmount}/>
								<AppFormField type="select" name="sourcePayment" label="Source Payment" options={sourcePayment}
								              rules={allRules.sourcePayment}/>
							</>
						)}

						{selectedResult === 'Promise to pay' && (
							<>
								<AppFormField type="date" name="promiseDate" label="Promise Date" rules={allRules.promiseDate}/>
								<AppFormField type="select" name="promiseTime" label="Promise Time" options={times}
								              rules={allRules.promiseTime}/>
								<AppFormField type="text" name="promiseAmount" label="Promise Amount" rules={allRules.promiseAmount}/>
							</>
						)}

						{selectedResult === 'Will call back' && (
							<>
								<AppFormField type="date" name="callbackDate" label="Call Back Date" rules={allRules.callbackDate}/>
								<AppFormField type="select" name="callbackTime" label="Call Back Time" options={times}
								              rules={allRules.callbackTime}/>
							</>
						)}

					</Row>
				</Form>
			</Spin>
		</div>
	);
};

export default CommentForm;