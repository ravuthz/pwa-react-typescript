import React from 'react';
import AppTable from '../../../Shared/AppTable';

const PaymentHistoryTable: React.FC = (props: any) => {

  const dataSource = [
    {
      key: '1',
      paidDate: new Date().toDateString(),
      ddAccount: 'DD066905',
      name: 'Neth Chamrouen',
      channel: 'Wing payment at 2020',
      amount: '71.00',
      phoneNumber: '015565335'
    },
  ];

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

  return (<AppTable dataSource={dataSource} columns={columns} {...props}/>);
};

export default PaymentHistoryTable;