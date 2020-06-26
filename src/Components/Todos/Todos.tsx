import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todos: React.FC = () => (
  <div>
    <h1>This is a Todos</h1>
    <TodoForm></TodoForm>
    <br/>
    <TodoList></TodoList>
  </div>
);

export default Todos;