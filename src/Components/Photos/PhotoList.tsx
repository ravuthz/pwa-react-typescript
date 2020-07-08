import React from "react";
import { Table } from 'antd';
import Tooltip from 'antd/lib/tooltip';
import { useJsonFetch, useSwrFetch } from '../../hooks/hook';

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
  const { response, loading, error } = useJsonFetch(PHOTO_URI);
  // const { } = useSwrFetch();

  if (error) {
    console.log("Error: ", error);
  }

  return (
    <div className="todo-list-container">
      <Table loading={loading} dataSource={response || []} columns={columns}/>;
    </div>
  );
};

export default PhotoList;
