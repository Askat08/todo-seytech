import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoEdit from './components/TodoEdit';

import './App.css';
const todoData = [
  {
    id: 1,
    title: 'test',
    completed: false,
  },
  {
    id: 2,
    title: 'test2',
    completed: false,
  },
  {
    id: 3,
    title: 'test3',
    completed: true,
  },
];
// helper function
function isExist(arr, input) {
  if (input === '') {
    return true;
  }
  if (arr.length === 0) {
    return false;
  }
  for (let item of arr) {
    if (item.title.toLowerCase() === input.toLowerCase()) {
      return true;
    }
  }

  return false;
}
const App = (props) => {
  const [todos, setTodos] = useState([]);
  const [uniqId, setUniqId] = useState(21);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        console.log('mount');
        setTodos([...data.splice(0, 20)]);
      });
  }, []);

  let history = useHistory();

  const redirect = (id) => {
    history.push(`edit/${id}`);
  };

  // event handlers
  const addTodo = () => {
    if (!isExist(todos, input)) {
      const newTodo = [
        {
          id: uniqId,
          title: input,
          completed: false,
        },
      ];
      setUniqId(uniqId + 1);
      setTodos([...newTodo, ...todos]);
      setInput('');
    }
    return null;
  };

  const onEdit = (id) => {
    redirect(id);
  };

  const onDone = (id) => {
    todos.forEach((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
    setTodos([...todos]);
  };

  const onDelete = (id) => {
    console.log('deleted');
    const newTodos = todos.filter((item) => item.id !== Number(id));
    setTodos([...newTodos]);
  };

  const onSave = (value, id) => {
    todos.forEach((item) => {
      if (item.id === Number(id)) {
        item.title = value;
      }
    });
    setTodos([...todos]);
  };

  return (
    // <Router history={history}>
    <div className='container'>
      <Switch>
        <Route
          path='/'
          exact
          render={(props) => (
            <TodoList
              {...props}
              todos={todos}
              onEdit={onEdit}
              onDone={onDone}
              onDelete={onDelete}
              addTodo={addTodo}
              input={input}
              setInput={setInput}
            />
          )}
        />
        <Route
          path='/edit/:id'
          render={(props) => (
            <TodoEdit
              {...props}
              todos={todos}
              setTodos={setTodos}
              onSave={onSave}
              onDelete={onDelete}
            />
          )}
        />
      </Switch>
    </div>
    // </Router>
  );
};

export default App;
