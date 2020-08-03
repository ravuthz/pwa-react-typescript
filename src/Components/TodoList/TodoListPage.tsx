import React, { useState } from 'react';
import TodoListSearch from './TodoListSearch';
import TodoListTable from './TodoListTable';
import { Divider, Modal } from 'antd';
import TodoListForm from './TodoListForm';
import { useAxiosGet } from '../../hooks/axios.hook';
import { useTodoCtx } from '../../context/todo';
// import AxiosService, { authHeader } from '../../services/axios.service';

const TodoListPage: React.FC = () => {
  const [formFilter, setFormFilter] = useState({});
  const [showModal, setShowModel] = useState(false);
  const { setSelectedTodo } = useTodoCtx();
  // const { result } = useAxiosGet('todo_list/getTodoList/364');
  const { result } = useAxiosGet('todo_list/getTodoList/327'); // hak_kim

  const onSubmit = (data: any) => {
    setFormFilter(data);
  };

  const onCancel = (form: any) => {
    form.resetFields();
    setFormFilter({});
  }

  const onModalOk = () => {
    setShowModel(false);
  }

  const onModalCancel = () => {
    setShowModel(false);
  }

  const onRowDoubleClick = (row: any, index: any) => {
    setSelectedTodo(row);
    setShowModel(true);
  }

  // useEffect(() => {
  //   if (!result && result.length > 0) {
  //     console.log('result: ', result);
  //
  //     const cacheTest = caches.open('my-cache1').then(myCache1 => {
  //       myCache1.add('test-my-cache1');
  //
  //       const { loanID, ddAccount } = result[0];
  //
  //       // const fetchPaymentHistory = `http://localhost:8283/api/todo_list/getListPaymentHistory/${ddAccount}`;
  //       // const fetchPaymentSchedule = `http://localhost:8283/api/todo_list/getListPaymentSchedule/${loanID}`;
  //
  //       const options = {
  //         headers: authHeader()
  //       };
  //
  //       // AxiosService.get(fetchPaymentHistory, options).then(res => {
  //       //   console.info(`fetched: ${fetchPaymentHistory}`, res);
  //       // });
  //       //
  //       // AxiosService.get(fetchPaymentSchedule, options).then(res => {
  //       //   console.info(`fetched: ${fetchPaymentSchedule}`, res);
  //       // });
  //
  //       // http://localhost:8283/api/todo_list/getCustomerInfo/LC19082600020
  //       // http://localhost:8283/api/todo_list/getCbc/LC19082600020
  //       // http://localhost:8283/api/todo_list/getListPaymentSchedule/LC19082600020
  //       // http://localhost:8283/api/todo_list/getListPaymentHistory/DD057393
  //       // http://localhost:8283/api/todo_list/getCommentByLc/LC19082600020
  //
  //     });
  //   }
  // }, [result]);

  return (
    <div>
      <TodoListSearch onSubmit={onSubmit} onCancel={onCancel}/>
      <Divider/>
      <TodoListTable
        filter={formFilter}
        dataSource={result}
        onRowDoubleClick={onRowDoubleClick}
      />
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