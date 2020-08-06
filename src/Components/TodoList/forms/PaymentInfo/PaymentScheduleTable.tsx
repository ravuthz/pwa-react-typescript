import React from 'react';
import AppTable from '../../../Shared/AppTable';

const PaymentScheduleTable: React.FC<any> = (props: any) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      ellipsis: true,
    },
    {
      title: 'CollectionDate',
      dataIndex: 'collectionDate',
      key: 'collectionDate',
      ellipsis: true,
    },
    {
      title: 'Principle',
      dataIndex: 'principle',
      key: 'principle',
      ellipsis: true,
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
      ellipsis: true,
    },
    {
      title: 'Installment',
      dataIndex: 'installment',
      key: 'installment',
      ellipsis: true,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      ellipsis: true,
    },
    {
      title: 'RepStatus',
      dataIndex: 'repStatus',
      key: 'repStatus',
      ellipsis: true,
    },
  ];
  return (<AppTable columns={columns} {...props}/>);
};

export default PaymentScheduleTable;