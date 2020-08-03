import React from 'react';
import AppTable from '../../../Shared/AppTable';

const PaymentScheduleTable: React.FC<any> = (props: any) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
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
  return (<AppTable columns={columns} {...props}/>);
};

export default PaymentScheduleTable;