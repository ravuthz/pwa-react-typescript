import { List, Tag, Button, Space, Modal } from "antd";
import React, { useState, useEffect } from "react";
import {
  QuestionCircleOutlined,
  DeleteOutlined,
  BorderOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { todos } from "../../services/firebase";
import { TodoService } from "../../services/todo.service";

const TodoList: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = todos
      .orderBy("created_at", "desc")
      .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        // if (change.type === "added") {
        //     console.log("New city: ", change.doc.data());
        // }
        // var source = snapshot.metadata.fromCache ? "CACHE" : "SERVER";
        // console.log(`Data came from ${source}`);
        const items: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
      });
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
              <Button
                type="link"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDeleteClick(item)}
              />
              <Button
                type="link"
                size="small"
                icon={
                  item.completed ? <BorderOutlined /> : <CheckSquareOutlined />
                }
                onClick={() => onToggleClick(item)}
              />
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
