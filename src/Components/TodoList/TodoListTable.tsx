import React from 'react';
import AppTable from '../Shared/AppTable';
import moment from 'moment';
import { Progress, Spin } from 'antd';

const addColumn = (key: string, title: string, sort: string, filter: any = {}, sortDirections = ['descend', 'ascend']) => {
  let sorter = null;
  switch (sort) {
    case 'date':
      sorter = (a: any, b: any) => new Date(a[key]).getTime() - new Date(b[key]).getTime();
      break;
    case 'code':
      sorter = (a: any, b: any) => a[key].substring(2) - b[key].substring(2);
      break;
    case 'string':
      sorter = (a: any, b: any) => a[key].length - b[key].length;
      break;
    case 'number':
      sorter = (a: any, b: any) => a[key] - b[key];
      break;
  }
  return {
    key,
    title,
    ellipsis: true,
    dataIndex: key,
    filteredValue: filter[key] ? [filter[key]] : null,
    onFilter: (value: any, record: any) => record[key].includes(value),
    sortDirections,
    sorter,
  };
};

const addDateFilter = (key: string, keyStart: any, keyEnd: any, filter: any = {}) => {
  return {
    filteredValue: filter[keyStart] ? [[filter[keyStart], filter[keyEnd]]] : null,
    onFilter: (values: any, record: any) => {
      let date1, date2;
      const date = record[key];
      if (values[0]) {
        date1 = values[0].format('YYYY-MM-DD');
      }
      if (values[1]) {
        date2 = values[1].format('YYYY-MM-DD');
      } else {
        date2 = date1;
      }
      if (!date) {
        return date === date1;
      }
      return moment(record.repaymentDate).isBetween(date1, date2, undefined, '[]');
    },
  };
};

const ProgressPercent: React.FC<any> = ({ loaded }) => {
  return (
    <div className="ProgressPercent">
      <Progress strokeColor={{
        '0%': '#e9353c',
        '100%': '#ca3564',
      }} type="circle" percent={loaded}/>
    </div>
  );
}

const TodoListTable: React.FC<any> = ({ filter, loaded, loading, ...props }: any) => {
  const columns: any = [
    addColumn('branch', 'Branch', 'string', filter),
    addColumn('ddAccount', 'DD Account', 'code', filter),
    addColumn('lastPaidAmount', 'Last Paid Amount', 'number', filter),
    addColumn('lastPaidAmount', 'Last Paid Amount', 'number', filter),
    addColumn('loanID', 'Load ID', 'code', filter),
    addColumn('nameInEnglish', 'Name In English', 'string', filter),
    addColumn('nameInKhmer', 'Name In Khmer', 'string', filter),
    {
      ...addColumn('repaymentDate', 'Repayment Date', 'date', filter),
      ...addDateFilter('repaymentDate', 'startRepaymentDate', 'endRepaymentDate', filter),
    },
    {
      ...addColumn('promiseDate', 'PromiseDate', 'date', filter),
      ...addDateFilter('promiseDate', 'startPromiseDate', 'endPromiseDate', filter),
    },
    addColumn('commentOfficer', 'Comment Officer', 'string'),
    {
      ...addColumn('commentDate', 'Comment Date', 'date', filter),
      ...addDateFilter('commentDate', 'startCommentDate', 'endCommentDate', filter),
    },
    addColumn('commentTime', 'Comment Time', 'string'),
    addColumn('lastPaidDate', 'LastPaidDate', 'date'),
    addColumn('lastPaidAmount', 'LastPaidAmount', 'number'),
    addColumn('dueDay', 'Due Day', 'string'),
    addColumn('penalty', 'Penalty', 'string'),
  ];
  return (
    <Spin spinning={loading} indicator={<ProgressPercent loaded={loaded}/>}>
      <AppTable columns={columns} {...props}/>
    </Spin>
  );
};

export default TodoListTable;