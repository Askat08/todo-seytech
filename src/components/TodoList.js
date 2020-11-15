import React, { useState } from 'react';
import { Table, Button, Badge } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';
// import { useHistory } from 'react-router-dom';

const TodoList = (props) => {
  const { todos, onEdit, addTodo, input, setInput, onDone, onDelete } = props;
  const [active, setActive] = useState(false);

  let countTodo = 0;
  // let history = useHistory();

  const activeTasks = todos.filter((task) => {
    return !task.completed;
  });

  const doneTasks = todos.filter((task) => {
    return task.completed;
  });

  // loading spinner
  const loading = (
    <div class='lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return (
    <div className='todolist'>
      <div className='nav-bar'>
        <div className='input-div'>
          <DebounceInput
            minLength={2}
            value={input}
            debounceTimeout={300}
            placeholder='buy grocery ...'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button color='info' onClick={addTodo}>
            Add todo
          </Button>
        </div>
        <div className='btn-div'>
          <Button color='info' onClick={() => setActive(false)}>
            Active Todos <Badge color='secondary'>{activeTasks.length}</Badge>
          </Button>
          <Button color='warning' onClick={() => setActive(true)}>
            Done Todos <Badge color='secondary'>{doneTasks.length}</Badge>
          </Button>
        </div>
      </div>
      <Table responsive hover dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Todo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0
            ? todos.map((todo, index) => {
                if (todo.completed === active) {
                  countTodo++;
                  console.log(todo.id);
                  return (
                    <tr
                      key={todo.id}
                      className={todo.completed ? 'done' : 'not-done'}>
                      <th scope='row'>{countTodo}</th>
                      <td>{todo.title}</td>
                      <td>
                        <div className='action-btn'>
                          <Button color='info' onClick={() => onEdit(todo.id)}>
                            Edit
                          </Button>
                          <Button
                            color='warning'
                            onClick={() => onDone(todo.id)}>
                            Done
                          </Button>
                          <Button
                            color='danger'
                            onClick={() => onDelete(todo.id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })
            : loading}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
