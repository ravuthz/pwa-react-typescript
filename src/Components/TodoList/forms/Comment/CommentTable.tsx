import React from 'react';
import AppTable from '../../../Shared/AppTable';
import moment from 'moment';

const CommentTable: React.FC<any> = (props) => {
  const columns = [
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Creator',
      dataIndex: 'createUser',
      key: 'createUser',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (value: any) => value ? moment(value).format("YYYY-MM-DD") : ''
    },
    {
      title: 'Create Time',
      dataIndex: 'createDate',
      key: 'createDate',
      width: '250px',
      render: (value: any) => value ? moment(value).format("h:mm:ss") : ''
    },
    {
      title: 'Contact To',
      dataIndex: 'contactTo',
      key: 'contactTo',
    },
    {
      title: 'Result',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'To Place',
      dataIndex: 'toPlace',
      key: 'toPlace',
    },
    {
      title: 'Situation Action',
      dataIndex: 'situationAction',
      key: 'situationAction',
    },
    {
      title: 'Promise Date',
      dataIndex: 'promiseDate',
      key: 'promiseDate',
    },
    {
      title: 'Promise Time',
      dataIndex: 'promiseTime',
      key: 'promiseTime',
    },
    {
      title: 'Promise Amount',
      dataIndex: 'promiseAmount',
      key: 'promiseAmount',
    },
    {
      title: 'Asset Situation',
      dataIndex: 'assetSituation',
      key: 'assetSituation',
    },
    {
      title: 'Source Payment',
      dataIndex: 'sourcePayment',
      key: 'sourcePayment',
    },
    {
      title: 'Request',
      dataIndex: 'request',
      key: 'request',
    },
    {
      title: 'Request Amount',
      dataIndex: 'requestAmount',
      key: 'requestAmount',
    },
    {
      title: 'Request Month',
      dataIndex: 'requestMonth',
      key: 'requestMonth',
    },
    {
      title: 'Remark Restructure',
      dataIndex: 'remarkRestructure',
      key: 'remarkRestructure',
    },
    {
      title: 'Impact Covid',
      dataIndex: 'impactCovid',
      key: 'impactCovid',
    },
    {
      title: 'Partial Extend',
      dataIndex: 'partialExtend',
      key: 'partialExtend',
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
  ];
  return (<AppTable rowKey="id" selectedKey="id" columns={columns} {...props}/>);
};

export default CommentTable;