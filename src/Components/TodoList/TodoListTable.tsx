import React from 'react';
import AppTable from '../Shared/AppTable';

const TodoListTable: React.FC<any> = (props: any) => {
  const columns = [
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'DD Account',
      dataIndex: 'ddAccount',
      key: 'ddAccount',
    },
    {
      title: 'Last Paid Amount',
      dataIndex: 'lastPaidAmount',
      key: 'lastPaidAmount',
    },
    {
      title: 'Load ID',
      dataIndex: 'loanID',
      key: 'loanID',
    },
    {
      title: 'Name In English',
      dataIndex: 'nameInEnglish',
      key: 'nameInEnglish',
    },
    {
      title: 'Name In Khmer',
      dataIndex: 'nameInKhmer',
      key: 'nameInKhmer',
    },
    {
      title: 'Repayment Date',
      dataIndex: 'repaymentDate',
      key: 'repaymentDate',
    },
  ];
  return (<AppTable columns={columns} {...props}/>);
};

export default TodoListTable;