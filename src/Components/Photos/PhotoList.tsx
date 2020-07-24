import React from "react";
import { Table } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import { useJsonFetch } from '../../hooks/custom.hook';

const columns: any[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
    responsive: ['xs'],
  },
  {
    key: 'albumId',
    title: 'Album ID',
    dataIndex: 'albumId',
    responsive: ['md'],
  },
  {
    key: 'url',
    title: 'URL',
    dataIndex: 'url',
    responsive: ['md'],
    render: (value: string) => <a href={value}>{value}</a>
  },
  {
    key: 'title',
    title: 'Title',
    dataIndex: 'title',
    ellipsis: {
      showTitle: false,
    },
    responsive: ['xs'],
    render: (title: any) => (
      <Tooltip placement="topLeft" title={title}>
        {title}
      </Tooltip>
    ),
  },
  {
    key: 'thumbnailUrl',
    title: 'Thumbnail',
    dataIndex: 'thumbnailUrl',
    render: (value: string) =>
      <a href={value}>
        <img height="50%" src={value} alt={value}/>
      </a>
  },
];

const PHOTO_URI = 'https://jsonplaceholder.typicode.com/photos';

const PhotoList: React.FC = () => {
  const { response, loading } = useJsonFetch(PHOTO_URI);
  const pagination: any = {
    pageSizeOptions: [
      10, 20, 50, 100, 1000, 10000
    ]
  };
  return (
    <div className="todo-list-container">
      <Table loading={loading} dataSource={response || []} columns={columns} pagination={pagination}/>;
    </div>
  );
};

export default PhotoList;
