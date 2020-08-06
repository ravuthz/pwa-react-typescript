import React from 'react';
import AppTable from '../../../Shared/AppTable';
import moment from 'moment';

const CommentTable: React.FC<any> = (props) => {
  const columns = [
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      ellipsis: true,
    },
    {
      title: 'Creator',
      dataIndex: 'createUser',
      key: 'createUser',
      ellipsis: true,
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      width: '250px',
      ellipsis: true,
      render: (value: any) => value ? moment(value).format("YYYY-MM-DD") : ''
    },
    {
      title: 'Create Time',
      dataIndex: 'createDate',
      key: 'createDate',
      ellipsis: true,
      render: (value: any) => value ? moment(value).format("h:mm:ss") : ''
    },
    {
      title: 'Contact To',
      dataIndex: 'contactTo',
      key: 'contactTo',
      ellipsis: true,
    },
    {
      title: 'Result',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
    },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: true,
    },
    {
      title: 'To Place',
      dataIndex: 'toPlace',
      key: 'toPlace',
      ellipsis: true,
    },
    {
      title: 'Situation Action',
      dataIndex: 'situationAction',
      key: 'situationAction',
      ellipsis: true,
    },
    {
      title: 'Promise Date',
      dataIndex: 'promiseDate',
      key: 'promiseDate',
      ellipsis: true,
    },
    {
      title: 'Promise Time',
      dataIndex: 'promiseTime',
      key: 'promiseTime',
      ellipsis: true,
    },
    {
      title: 'Promise Amount',
      dataIndex: 'promiseAmount',
      key: 'promiseAmount',
      ellipsis: true,
    },
    {
      title: 'Asset Situation',
      dataIndex: 'assetSituation',
      key: 'assetSituation',
      ellipsis: true,
    },
    {
      title: 'Source Payment',
      dataIndex: 'sourcePayment',
      key: 'sourcePayment',
      ellipsis: true,
    },
    {
      title: 'Request',
      dataIndex: 'request',
      key: 'request',
      ellipsis: true,
    },
    {
      title: 'Request Amount',
      dataIndex: 'requestAmount',
      key: 'requestAmount',
      ellipsis: true,
    },
    {
      title: 'Request Month',
      dataIndex: 'requestMonth',
      key: 'requestMonth',
      ellipsis: true,
    },
    {
      title: 'Remark Restructure',
      dataIndex: 'remarkRestructure',
      key: 'remarkRestructure',
      ellipsis: true,
    },
    {
      title: 'Impact Covid',
      dataIndex: 'impactCovid',
      key: 'impactCovid',
      ellipsis: true,
    },
    {
      title: 'Partial Extend',
      dataIndex: 'partialExtend',
      key: 'partialExtend',
      ellipsis: true,
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'sector',
      ellipsis: true,
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
      ellipsis: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true,
    },
  ];
  return (<AppTable rowKey="id" selectedKey="id" columns={columns} {...props}/>);
};

export default CommentTable;