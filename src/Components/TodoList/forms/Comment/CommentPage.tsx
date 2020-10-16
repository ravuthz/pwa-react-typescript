import React, { useEffect, useState } from 'react';
import { Divider, Modal } from 'antd';
import CommentTable from './CommentTable';
import CommentForm from './CommentForm';
import { useAxiosGet, useAxiosPost } from '../../../../hooks/axios.hook';
import { useTodoCtx } from '../../../../context/todo';
import CommentView from './CommentView';
import { useCommentCtx } from '../../../../context/comment';
import { useAuthCtx } from "../../../../context/auth";

const CommentPage: React.FC<any> = () => {
	const [ showModal, setShowModel ] = useState(false);
	const [ comments, setComments ] = useState<any>([]);

	const { selectedTodo } = useTodoCtx();
	const { username } = useAuthCtx();
	const { selectedComment, setSelectedComment } = useCommentCtx();
	const { result: commentItems } = useAxiosGet('todo_list/getCommentByLc/' + selectedTodo.loanID);
	const { loading, executePost } = useAxiosPost('todo_list/createComment');

	useEffect(() => {
		if (commentItems && commentItems.length > 0) {
			setComments([ ...commentItems ]);
		}
	}, [ commentItems ]);

	const onSubmit = (formData: any) => {
		const commentData = {
			...formData,
			lcId: selectedTodo.loanID,
			createDate: new Date(),
			createUser: username,
		};

		executePost({ data: commentData })
			.finally(() => {
				if (commentData) {
					setComments([ ...comments, commentData ]);
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