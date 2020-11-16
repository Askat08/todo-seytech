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

function getDataFromLstorage() {
  const data = JSON.parse(localStorage.getItem('newTodo'));
  return data ? data : [];
}

function modifyLocalStorage(id) {
  const dataFromLstorage = getDataFromLstorage();
  dataFromLstorage.forEach((item) => {
    if (item.id === id) {
      item.completed = !item.completed;
    }
  });
  localStorage.setItem('newTodo', JSON.stringify(dataFromLstorage));
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
        const dataFromLstorage = getDataFromLstorage();
        if (dataFromLstorage.length > 0) {
          console.log('log');
          setTodos([...dataFromLstorage]);
        } else {
          setTodos([...data.splice(0, 20)]);
        }
      });
  }, []);

  let history = useHistory();

  const redirect = (id) => {
    history.push(`edit/${id}`);
  };

  // event handlers
  const addTodo = () => {
    const newId = todos.length + 1;

    if (!isExist(todos, input)) {
      const newTodo = [
        {
          id: newId,
          title: input,
          completed: false,
        },
      ];

      const dataFromLstorage = getDataFromLstorage();
      localStorage.setItem(
        'newTodo',
        JSON.stringify([...newTodo, ...dataFromLstorage])
      );
      // setUniqId(newId + 1);
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
    modifyLocalStorage(id);
    setTodos([...todos]);
  };

  const onDelete = (id) => {
    console.log('deleted');
    const newTodos = todos.filter((item) => item.id !== Number(id));

    const dataFromLstorage = getDataFromLstorage();
    const newTodosForLocalS = dataFromLstorage.filter(
      (item) => item.id !== Number(id)
    );
    localStorage.setItem('newTodo', JSON.stringify(newTodosForLocalS));
    setTodos([...newTodos]);
  };

  const onSave = (value, id) => {
    todos.forEach((item) => {
      if (item.id === Number(id)) {
        item.title = value;
      }
    });
    const dataFromLstorage = getDataFromLstorage();
    dataFromLstorage.forEach((item) => {
      if (item.id === Number(id)) {
        item.title = value;
      }
    });
    localStorage.setItem('newTodo', JSON.stringify(dataFromLstorage));
    setTodos([...todos]);
  };

  return (
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
  );
};

export default App;
