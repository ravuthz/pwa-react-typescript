import React from 'react';
import AppTable from '../../../Shared/AppTable';

const PaymentScheduleTable: React.FC = (props: any) => {

  const dataSource = [
    {
      key: '1',
      collectionDate: new Date().toDateString(),
      principle: '58.73',
      interest: '24.07',
      installment: '82.80',
      balance: '641.27',
      repStatus: 'Full Paid On Time'
    },
  ];

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'CollectionDate',
      dataIndex: 'collectionDate',
      key: 'collectionDate',
    },
    {
      title: 'Principle',
      dataIndex: 'principle',
      key: 'principle',
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
    },
    {
      title: 'Installment',
      dataIndex: 'installment',
      key: 'installment',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'RepStatus',
      dataIndex: 'repStatus',
      key: 'repStatus',
    },
  ];

  return (<AppTable dataSource={dataSource} columns={columns} {...props}/>);
};

export default PaymentScheduleTable;