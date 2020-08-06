import React from 'react';
import { Descriptions } from 'antd';

const CommentView: React.FC<any> = ({ data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <div>
      {data.remark && (
        <Descriptions bordered={true}>
          <Descriptions.Item key="remark">{data.remark}</Descriptions.Item>
        </Descriptions>
      )}
      {data.location && (
        <Descriptions bordered={true}>
          <Descriptions.Item key="location">{data.location}</Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
};

export default CommentView;