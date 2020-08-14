import React, { useState } from 'react';
import TodoListSearch from './TodoListSearch';
import TodoListTable from './TodoListTable';
import { Divider, Modal } from 'antd';
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

    AxiosService.get('todo_list/getTodoList', options)
      .then(res => res.data.data.content || [])
      .then((data: any) => {
        if (data && data.length > 0) {
          let requests: any = [];

          data.map(async (item: any) => {
            const { loanID, ddAccount, cuNumber } = item;
            requests.push(AxiosService.get(`todo_list/getCustomerInfo/${loanID}`, options));
            requests.push(AxiosService.get(`todo_list/getCbc/${loanID}`, options));
            requests.push(AxiosService.get(`todo_list/getCommentByLc/${loanID}`, options));
            requests.push(AxiosService.get(`todo_list/getPaymentInfo/${loanID}`, options));
            requests.push(AxiosService.get(`todo_list/getListPaymentSchedule/${loanID}`, options));
            requests.push(AxiosService.get(`todo_list/getListPaymentHistory/${ddAccount}`, options));

            const document1 = await AxiosService.get(`todo_list/getIloanDoc/${loanID}`, options);
            const { ApplicantDoc, CoApplicantDoc, GuaApplicantDoc, DocumentsFieldCheck, ILoanDoc, morakotDoc } = document1.data.data.content || {};
            requests = [
              ...requests,
              ...fetchDocuments(ApplicantDoc, options),
              ...fetchDocuments(CoApplicantDoc, options),
              ...fetchDocuments(GuaApplicantDoc, options),
              ...fetchDocuments(DocumentsFieldCheck, options),
              ...fetchDocuments(ILoanDoc, options),
              ...fetchDocuments(morakotDoc, options),
            ];

            console.log('document1.requests.length: ', requests.length);

            // const document1 = AxiosService.get(`/todo_list/getIloanDoc/${loanID}`, options).then(res => {
            //   const { ApplicantDoc, CoApplicantDoc, GuaApplicantDoc, DocumentsFieldCheck, ILoanDoc, morakotDoc } = res.data.data.content || {};
            //   requests = [
            //     ...requests,
            //     ...fetchDocuments(ApplicantDoc, options),
            //     ...fetchDocuments(CoApplicantDoc, options),
            //     ...fetchDocuments(GuaApplicantDoc, options),
            //     ...fetchDocuments(DocumentsFieldCheck, options),
            //     ...fetchDocuments(ILoanDoc, options),
            //     ...fetchDocuments(morakotDoc, options),
            //   ];
            //   return res;
            // });

            const document2 = await AxiosService.get(`todo_list/getDocument/${cuNumber}`, options);
            const document = document2.data.data.content || {};
            requests = [
              ...requests,
              ...fetchDocuments(document, options),
            ];

            console.log('document2.requests.length: ', requests.length);

            // const document2 = AxiosService.get(`/todo_list/getDocument/${cuNumber}`, options).then(res => {
            //   const document = res.data.data.content || {};
            //   requests = [
            //     ...requests,
            //     ...fetchDocuments(document, options),
            //   ];
            //   return res;
            // });

            // requests.push(document1);
            // requests.push(document2);
            return item;
          });

          console.log('requests.length: ', requests.length);

          progressPromise(requests, (progress: any, completed: any, total: any) => {
            setLoaded(progress);
            if (progress === 100) {
              console.log('progress, completed, total: ', progress, completed, total);
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

  const fetchDocuments = (group: any, options: any) => {
    if (group && group.length > 0) {
      return group.map((item: any) => {
        if (item.link !== 'No Image') {
          return AxiosService.get(item.link, options);
        }
        return null;
      });
    }
    return [];
  };

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
        style={{ top: '25px' }}
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <TodoListForm/>
      </Modal>
    </div>
  );
};

export default TodoListPage;