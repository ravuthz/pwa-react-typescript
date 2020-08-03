import React, { useState } from 'react';
import { Divider, Modal } from 'antd';
import CommentTable from './CommentTable';
import CommentForm from './CommentForm';
import { useAxiosGet } from '../../../../hooks/axios.hook';
import { useTodoCtx } from '../../../../context/todo';

const CommentPage: React.FC<any> = () => {
  const [showModal, setShowModel] = useState(false);
  const { selectedTodo } = useTodoCtx();

  const { result: commentItems } = useAxiosGet('todo_list/getCommentByLc/' + selectedTodo.loanID);

  const onSubmit = (data: any) => {
    console.log('onFinish: ', data);
  };

  const onCancel = (form: any) => {
    console.log('onCancel: ');
    form.resetFields();
  }

  const onModalOk = () => {
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
      <CommentForm onSubmit={onSubmit} onCancel={onCancel}/>
      <Divider/>
      <CommentTable dataSource={commentItems} onRowDoubleClick={onRowDoubleClick}/>
      <Modal
        title="Comment Form"
        visible={showModal}
        width="80%"
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <CommentForm/>
      </Modal>
    </div>
  );
};

export default CommentPage;