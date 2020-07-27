import React, { useState } from 'react';
import { Divider, Modal } from 'antd';
import CommentSearch from './CommentSearch';
import CommentTable from './CommentTable';
import CommentForm from './CommentForm';

const CommentPage: React.FC<any> = () => {
  const [showModal, setShowModel] = useState(false);

  const onSubmit = (data: any) => {
    console.log('onFinish: ', data);
  };

  const onCancel = (form: any) => {
    console.log('onCancel: ');
    form.resetFields();
  }

  const onModalOk = () => {
    //
    setShowModel(false);
  }

  const onModalCancel = () => {
    setShowModel(false);
  }

  const onRowDoubleClick = (row: any, index: any) => {
    console.log('row: ', row);
    setShowModel(true);
  }

  return (
    <div>
      <CommentSearch onSubmit={onSubmit} onCancel={onCancel}/>
      <Divider/>
      <CommentTable onRowDoubleClick={onRowDoubleClick}/>
      <Modal
        title="Comment Form"
        visible={showModal}
        width="80%"
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <CommentForm />
      </Modal>
    </div>
  );
};

export default CommentPage;