import React, { useEffect, useState } from 'react';
import { Divider, Modal } from 'antd';
import CommentTable from './CommentTable';
import CommentForm from './CommentForm';
import { useAxiosGet, useAxiosPost } from '../../../../hooks/axios.hook';
import { useTodoCtx } from '../../../../context/todo';
import CommentView from './CommentView';
import { useCommentCtx } from '../../../../context/comment';


const CommentPage: React.FC<any> = () => {
  const [showModal, setShowModel] = useState(false);
  const [comments, setComments] = useState<any>([]);

  const { selectedTodo } = useTodoCtx();
  const { selectedComment, setSelectedComment } = useCommentCtx();
  const { result: commentItems } = useAxiosGet('todo_list/getCommentByLc/' + selectedTodo.loanID);
  const { loading, executePost } = useAxiosPost('todo_list/createComment');

  useEffect(() => {
    if (commentItems && commentItems.length > 0) {
      setComments([...commentItems]);
    }
  }, [commentItems]);

  const onSubmit = (formData: any) => {
    console.log('onSubmit: ');
    const commentData = {
      ...formData,
      lcId: selectedTodo.loanID,
      createDate: new Date(),
      createUser: 'admin' // get from api just static now

      // action: "Visit",
      // lcId: "LC20031600013",
      // remark: "Test Post by WorkBoxSync",
      // result: "No Service",
      // situationFromAction: "Can contact",
      // to: "Mobile Phone",
      // who: "Lessee",
    }
    executePost({ data: commentData })
      .then((res: any) => {
        console.log('result: ', res);
      })
      .catch((err: any) => {
        console.log('error: ', err);
      })
      .finally(() => {
        console.log('finally');
        if (commentData) {
          setComments([...comments, commentData]);
        }
      });
  }

  const onModalOk = () => {
    setShowModel(false);
    setSelectedComment();
  }

  const onModalCancel = () => {
    setShowModel(false);
    setSelectedComment();
  }

  const onRowDoubleClick = (row: any, index: any) => {
    setSelectedComment(row);
    setShowModel(true);
  }

  // if (postError) {
  // console.log('postError: ', postError);
  // navigator.serviceWorker.ready
  //   .then((reg: any) => {
  //     reg.sync.register('post-comment');
  //   })
  //   .catch((err: any) => {
  //     console.log('post-comment-error: ', err);
  //   });
  // }

  return (
    <div>
      <CommentForm loading={loading} onSubmit={onSubmit}/>
      <Divider/>
      <CommentTable dataSource={comments} onRowDoubleClick={onRowDoubleClick}/>
      <Modal
        title="Comment Form"
        visible={showModal}
        width="80%"
        onOk={onModalOk}
        onCancel={onModalCancel}
      >
        <CommentView data={selectedComment}/>
      </Modal>
    </div>
  );
};

export default CommentPage;