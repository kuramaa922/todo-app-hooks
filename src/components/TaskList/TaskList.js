import React from 'react';
import propTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';
const TaskList = (props) => {
  const { todoData, onDeleted, onCompleted, changeTimerValue } = props;
  return (
    <ul className="todo-list">
      {todoData.map((data) => {
        const { id, task, completed, time, timer } = data;
        return (
          <Task
            id={id}
            key={id}
            task={task}
            completed={completed}
            time={time}
            onDeleted={() => onDeleted(id)}
            onCompleted={() => onCompleted(id)}
            changeTimerValue={(id, timer) => changeTimerValue(id, timer)}
            timerProp={timer}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  todoData: [],
  onCompleted: () => {},
  onDeleted: () => {},
  changeTimerValue: () => {},
};

TaskList.propTypes = {
  todoData: propTypes.arrayOf(propTypes.object),
  onCompleted: propTypes.func,
  onDeleted: propTypes.func,
  changeTimerValue: propTypes.func,
};

export default TaskList;
