import React, { useState, useRef } from 'react';

import './App.css';
import Header from '../Header/Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setOnFilter] = useState('All');
  const tasksId = useRef(1);

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  const onCompleted = (id) => {
    changeItemInData(id, 'completed');
  };

  const addTask = (text, time) => {
    if (text) {
      const newItem = {
        task: text,
        completed: false,
        time: new Date(),
        timer: time,
        id: tasksId.current++,
      };

      setTodoData((todoData) => {
        const newArray = [...todoData, newItem];
        return newArray;
      });
    }
  };

  const clearCompleted = () => {
    setTodoData((todoData) => {
      const newArray = [];
      todoData.forEach((el) => {
        if (!el.completed) {
          newArray.push(el);
        }
      });
      return newArray;
    });
  };

  const setFilter = (filter) => {
    setOnFilter(filter);
  };

  const filterTasks = () => {
    switch (filter) {
      case 'All':
        return todoData;
      case 'Active':
        return todoData.filter((el) => !el.completed);
      case 'Completed':
        return todoData.filter((el) => el.completed);
      default:
        break;
    }
  };

  const changeTimerValue = (id, value) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => {
        return el.id === id;
      });

      const oldItem = todoData[index];
      if (typeof oldItem === 'undefined') return todoData;
      const newItem = { ...oldItem, timer: value };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return newArray;
    });
  };

  const changeItemInData = (id, value) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, [value]: !oldItem[value] };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  return (
    <section className="todoapp">
      <Header onAdded={addTask} />
      <section className="main">
        <TaskList
          todoData={filterTasks()}
          onDeleted={deleteItem}
          onCompleted={onCompleted}
          changeTimerValue={changeTimerValue}
        />
        <Footer todoData={todoData} filterBtn={setFilter} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
}

export default App;
