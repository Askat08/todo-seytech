import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const TodoEdit = (props) => {
  const { todos, onDelete, onSave } = props;
  const [inputValue, setInputValue] = useState('');
  let history = useHistory();

  // helper functions
  const getItem = (arr, id) => {
    if (arr.length === 0) {
      return 'empty';
    }
    for (let item of arr) {
      if (item.id === Number(id)) {
        return item;
      }
    }
    return false;
  };

  const { id } = props.match.params;
  const todo = getItem(todos, id);

  useEffect(() => {
    setInputValue(todo.title);
  }, [todo]);

  // helper function end

  return (
    <div className='edit-todo'>
      <Button onClick={() => history.goBack()}>go back</Button>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className='action-btn'>
        <Button
          color='info'
          onClick={() => {
            onSave(inputValue, id);
            history.goBack();
          }}>
          Save
        </Button>
        <Button color='warning' onClick={() => history.goBack()}>
          Cancel
        </Button>
        <Button
          color='danger'
          onClick={() => {
            onDelete(id);
            history.goBack();
          }}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoEdit;
