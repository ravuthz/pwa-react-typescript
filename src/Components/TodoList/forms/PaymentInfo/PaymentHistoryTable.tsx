import React from 'react';
import AppTable from '../../../Shared/AppTable';

const PaymentHistoryTable: React.FC<any> = (props: any) => {
  const columns = [
    {
      title: 'Paid Date',
      dataIndex: 'paidDate',
      key: 'paidDate',
    },
    {
      title: 'DD Account',
      dataIndex: 'ddAccount',
      key: 'ddAccount',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];
  return (<AppTable columns={columns} {...props}/>);
};

export default PaymentHistoryTable;