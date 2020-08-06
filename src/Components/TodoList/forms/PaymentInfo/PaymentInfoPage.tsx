import React from 'react';
import PaymentInfoForm from './PaymentInfoForm';
import { Tabs } from 'antd';
import PaymentScheduleTable from './PaymentScheduleTable';
import PaymentHistoryTable from './PaymentHistoryTable';
import { useTodoCtx } from '../../../../context/todo';
import { useAxiosGet } from '../../../../hooks/axios.hook';

const { TabPane } = Tabs;

const PaymentInfoPage: React.FC = () => {
  const { selectedTodo } = useTodoCtx();
  const { result: paymentSchedule } = useAxiosGet('todo_list/getListPaymentSchedule/' + selectedTodo.loanID);
  const { result: paymentHistory } = useAxiosGet('todo_list/getListPaymentHistory/' + selectedTodo.ddAccount);
  const { result: paymentInfo } = useAxiosGet('todo_list/getPaymentInfo/' + selectedTodo.loanID);

  // console.log('paymentSchedule: ', paymentSchedule);
  // console.log('paymentHistory: ', paymentHistory);
  // console.log('paymentInfo: ', paymentInfo);

  return (
    <div>
      <PaymentInfoForm data={paymentInfo}/>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="Payment Schedule">
          <PaymentScheduleTable rowSelection={undefined} dataSource={paymentSchedule}/>
        </TabPane>
        <TabPane key="2" tab="Payment History">
          <PaymentHistoryTable rowSelection={undefined} dataSource={paymentHistory}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PaymentInfoPage;