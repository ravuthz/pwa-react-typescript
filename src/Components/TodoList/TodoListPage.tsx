import React, { useState } from 'react';
import TodoListSearch from './TodoListSearch';
import TodoListTable from './TodoListTable';
import { Button, Divider, Modal } from 'antd';
import TodoListForm from './TodoListForm';

const TodoListPage: React.FC = () => {

  const [showModal, setShowModel] = useState(false);

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
      <TodoListSearch onSubmit={onSubmit} onCancel={onCancel}/>
      <Divider/>
      <TodoListTable onRowDoubleClick={onRowDoubleClick}/>
      <Modal
        title="Todo List Form"
        visible={showModal}
        width="90%"
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <TodoListForm/>
      </Modal>
    </div>
  );
};

export default TodoListPage;