import React from 'react';
import AppTable from '../../../Shared/AppTable';

const PaymentHistoryTable: React.FC<any> = (props: any) => {
  const columns = [
    {
      title: 'Paid Date',
      dataIndex: 'paidDate',
      key: 'paidDate',
      ellipsis: true,
    },
    {
      title: 'DD Account',
      dataIndex: 'ddAccount',
      key: 'ddAccount',
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ellipsis: true,
    },
  ];
  return (<AppTable columns={columns} {...props}/>);
};

export default PaymentHistoryTable;