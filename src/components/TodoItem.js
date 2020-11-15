import React from 'react';

const TodoItem = (props) => {
  const { todo } = props;
  return <div>{todo.title}</div>;
};

export default TodoItem;
