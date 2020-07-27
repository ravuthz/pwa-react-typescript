import React from 'react';
import PaymentInfoForm from './PaymentInfoForm';
import { Tabs } from 'antd';
import PaymentScheduleTable from './PaymentScheduleTable';
import PaymentHistoryTable from './PaymentHistoryTable';

const { TabPane } = Tabs;

const PaymentInfoPage: React.FC = () => {

  return (
    <div>
      <PaymentInfoForm/>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="Payment Schedule">
          <PaymentScheduleTable/>
        </TabPane>
        <TabPane key="2" tab="Payment History">
          <PaymentHistoryTable/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PaymentInfoPage;