import { List, Tag, Button, Space, Modal } from "antd";
import React, { useState, useEffect } from "react";
import {
  QuestionCircleOutlined,
  //   ExclamationCircleOutlined,
} from "@ant-design/icons";
import { todos } from "../../services/firebase";
import { TodoService } from "../../services/todo.service";

const TodoList: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = todos.orderBy("created_at", "desc")
    .onSnapshot((querySnapshot) => {
      const items: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(items);
    });
    return () => unsubscribe();
  }, []);

  const onDeleteClick = (todo: any) => {
    Modal.confirm({
      visible: visible,
      title: "Are you sure delete this todo?",
      icon: <QuestionCircleOutlined />,
      content: todo.title,
      okText: "Yes, delete it now",
      okType: "danger",
      cancelText: "No, keep it",
      onOk() {
        console.log("OK");
        TodoService.delete(todo)
          .then((res) => setVisible(true))
          .catch((error: any) => setError(error));
      },
      onCancel() {
        console.log("Cancel");
        setVisible(false);
      },
    });
  };

  const onToggleClick = (todo: any) => {
    TodoService.update({
      ...todo,
      completed: !todo.completed,
    }).catch((error: any) => setError(error));
  };

  if (error) {
    console.log("Error: ", error);
  }

  return (
    <div className="todo-list-container">
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
            />
            <Space>
              <Button size="small" danger onClick={() => onDeleteClick(item)}>
                DELETE
              </Button>
              <Button
                size="small"
                type="primary"
                onClick={() => onToggleClick(item)}
              >
                TOGGLE
              </Button>
              {item.completed ? (
                <Tag color="success">&nbsp;COMPLETED&nbsp;</Tag>
              ) : (
                <Tag color="default">IN COMPLETE</Tag>
              )}
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
