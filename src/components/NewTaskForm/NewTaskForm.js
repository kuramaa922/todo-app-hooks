import React, { useState } from 'react';
import './NewTaskForm.css';
import propTypes from 'prop-types';

export default function NewTaskForm({ onAdded }) {
  const [task, setTask] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0);
    onAdded(task, timerSec);

    setTask('');
    setMin('');
    setSec('');
  };
  const setValue = (e) => {
    setTask(e.target.value);
  };

  const setMinutes = (e) => {
    let value = e.target.value;
    if (value !== '') e.target.value = clamp(+value, 0, 1440) || 0;
    setMin(e.target.value);
  };

  const setSeconds = (e) => {
    let value = e.target.value;
    if (value !== '') e.target.value = clamp(+value, 0, 60) || 0;
    setSec(e.target.value);
  };

  const clamp = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={setValue}
        value={task}
        autoFocus
        required
      />
      {/* eslint-disable-next-line */}
      <input className="new-todo-form__timer" type="number" placeholder="Min" onChange={setMinutes} value={min}></input>
      {/* eslint-disable-next-line */}
      <input className="new-todo-form__timer" type="number" placeholder="Sec" onChange={setSeconds} value={sec}></input>
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};
NewTaskForm.propTypes = {
  onAdded: propTypes.func,
};
