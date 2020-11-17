import React, { useState } from 'react';
import { Table, Button, Badge } from 'reactstrap';
import { DebounceInput } from 'react-debounce-input';

const TodoList = (props) => {
  const { todos, onEdit, addTodo, input, setInput, onDone, onDelete } = props;
  const [active, setActive] = useState(false);

  let countTodo = 0;
  const activeTasks = todos.filter((task) => {
    return !task.completed;
  });

  const doneTasks = todos.filter((task) => {
    return task.completed;
  });

  // loading spinner
  const loading = (
    <tr>
      <td>
        <div className='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </td>
    </tr>
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
            Add Todo
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
      <Table responsive hover dark className='table'>
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
                            edit
                          </Button>
                          <Button
                            color='warning'
                            onClick={() => onDone(todo.id)}>
                            {active ? 'undo' : 'done'}
                          </Button>
                          <Button
                            color='danger'
                            onClick={() => onDelete(todo.id)}>
                            delete
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
