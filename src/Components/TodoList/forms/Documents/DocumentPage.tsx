import React from 'react';
import { useAxiosGet } from '../../../../hooks/axios.hook';
import { useTodoCtx } from '../../../../context/todo';
import DocumentList from './DocumentList';

const DocumentPage: React.FC = () => {
  const { selectedTodo } = useTodoCtx();
  const { result: document1 } = useAxiosGet('todo_list/getIloanDoc/' + selectedTodo.loanID);
  const { result: document2 } = useAxiosGet('todo_list/getDocument/' + selectedTodo.cuNumber);
  // const { result: document1 } = useAxiosGet('todo_list/getIloanDoc/LC19100800016');
  // const { result: document2 } = useAxiosGet('todo_list/getDocument/CU094263');
  // console.log('document1: ', document1);
  // console.log('document2: ', document2);

  return (
    <div>
      {document1 && (
        <DocumentList data={document1} other={document2}/>
      )}
    </div>
  );
};

export default DocumentPage;