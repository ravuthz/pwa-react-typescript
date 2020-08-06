import React, { useState } from 'react';
import TodoListSearch from './TodoListSearch';
import TodoListTable from './TodoListTable';
import { Divider, Modal, Progress } from 'antd';
import TodoListForm from './TodoListForm';
import { useAxiosGet } from '../../hooks/axios.hook';
import { useTodoCtx } from '../../context/todo';
import AxiosService, { authHeader } from '../../services/axios.service';
import { progressPromise } from '../../services/progress-promise.service';
import { log } from '../../services/log.js';

const logger = log.getLogger("TodoListPage");

const TodoListPage: React.FC = () => {
  const [formFilter, setFormFilter] = useState({});
  const [showModal, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const { setSelectedTodo } = useTodoCtx();

  const { result } = useAxiosGet('todo_list/getTodoList');

  const onSubmit = (data: any) => {
    setFormFilter(data);
  };

  const onCancel = (form: any) => {
    form.resetFields();
    setFormFilter({});
  }

  const onFreeze = () => {
    const options = { headers: authHeader() };

    setLoading(true);
    setLoaded(0);

    AxiosService.get('/todo_list/getTodoList', options)
      .then(res => res.data.data.content || [])
      .then((data: any) => {
        if (data && data.length > 0) {
          let requests: any = [];

          data.map((item: any) => {
            const { loanID, ddAccount } = item;
            requests.push(AxiosService.get(`/todo_list/getCustomerInfo/${loanID}`, options));
            requests.push(AxiosService.get(`/todo_list/getCbc/${loanID}`, options));
            requests.push(AxiosService.get(`/todo_list/getCommentByLc/${loanID}`, options));
            requests.push(AxiosService.get(`/todo_list/getPaymentInfo/${loanID}`, options));
            requests.push(AxiosService.get(`/todo_list/getListPaymentSchedule/${loanID}`, options));
            requests.push(AxiosService.get(`/todo_list/getListPaymentHistory/${ddAccount}`, options));
          });

          progressPromise(requests, (progress: any) => {
            setLoaded(progress);
            if (progress === 100) {
              setLoading(false);
            }
          })
            .then(values => {
              logger.debug("all promises success: " + values.length);
            })
            .catch(error => {
              logger.error(error);
            })
            .finally(() => {
              setLoading(false);
            });

        }
      });
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
  //
  // }, [result]);

  return (
    <div>
      <TodoListSearch onSubmit={onSubmit} onCancel={onCancel} onFreeze={onFreeze}/>
      <Divider/>
      <TodoListTable
        loaded={loaded}
        loading={loading}
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