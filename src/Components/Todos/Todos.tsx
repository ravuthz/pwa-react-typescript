import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Typography } from "antd";

const { Title } = Typography;

const Todos: React.FC = () => (
  <>
    <Title level={3} className="page-header-title">
      Todo List
    </Title>
    <TodoForm></TodoForm>
    <TodoList></TodoList>
  </>
);

export default Todos;
