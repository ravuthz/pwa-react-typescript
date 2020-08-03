import React from 'react';
import { Tabs } from 'antd';
import CustomerInfo from './forms/CustomerInfo/CustomerInfo';
import Documents from './forms/Documents';
import CbcInfo from './forms/CbcInfo';
import CommentPage from './forms/Comment/CommentPage';
import *  as _ from 'lodash';
import PaymentInfoPage from './forms/PaymentInfo/PaymentInfoPage';

const { TabPane } = Tabs;

const TodoListForm: React.FC<any> = () => {

  const tabs = {
    customerInfo: {
      key: 'customerInfo',
      tab: 'Customer Info',
      content: <CustomerInfo/>
    },
    documents: {
      key: 'documents',
      tab: 'Documents',
      content: <Documents/>
    },
    cbcInfo: {
      key: 'cbcInfo',
      tab: 'CBC Info',
      content: <CbcInfo/>
    },
    paymentInfo: {
      key: 'paymentInfo',
      tab: 'Payment Info',
      content: <PaymentInfoPage/>
    },
    comment: {
      key: 'comment',
      tab: 'Comment',
      content: <CommentPage/>
    }
  };

  return (
    <Tabs defaultActiveKey="1">
      {tabs && _.map(tabs, ({ content, ...tab }) => (
        <TabPane {...tab}>
          {content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default TodoListForm;