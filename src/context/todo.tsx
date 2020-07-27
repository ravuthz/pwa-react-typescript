import React, { useState } from 'react';

const TodoContext = React.createContext({});

export const TodoProvider = (props: any) => {
  const [selectedTodo, setSelectedTodo] = useState({});
  const value = {
    selectedTodo,
    setSelectedTodo
  };
  return <TodoContext.Provider value={value} {...props} />;
}

export const useTodoCtx: any = () => React.useContext(TodoContext);