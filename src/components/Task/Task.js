import React, { useState, useEffect } from 'react';
import './Task.css';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';

export default function Task(props) {
  const { id, onCompleted, completed, onDeleted, task, timerProp, time, changeTimerValue } = props;

  const [created, setCreated] = useState(null);
  const [timer, setTimer] = useState(timerProp);
  const [pause, setPause] = useState(true);

  const setTimeTextCreated = () => {
    setCreated(formatDistanceToNow(time, { includeSeconds: true }));
  };

  const timerRun = () => {
    if (!pause)
      setTimer((timer) => {
        return timer - 1;
      });
  };

  useEffect(() => {
    setTimeTextCreated();
    const interval = setInterval(() => {
      setTimeTextCreated();
      timerRun();
    }, 1000);
    return () => {
      clearInterval(interval);
      changeTimerValue(id, timer);
    };
  }, [pause, timer]);

  const timerSet = () => {
    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  const startTimer = () => {
    setPause(false);
  };

  const pauseTimer = () => {
    setPause(true);
  };

  return (
    <li className={classNames(null, { completed: completed })}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={onCompleted} checked={completed} />
        <label htmlFor={id}>
          <span className="title">{task}</span>
          <div className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            <span className="timer">{timerSet()}</span>
          </div>
          <span className="created">created {created} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    </li>
  );
}

Task.defaultProps = {
  onCompleted: () => {},
  onDeleted: () => {},
  changeTimerValue: () => {},
  timerProp: 0,
  time: new Date(),
};
Task.propTypes = {
  onCompleted: propTypes.func,
  onDeleted: propTypes.func,
  changeTimerValue: propTypes.func,
  timerProp: propTypes.number,
  time: propTypes.object,
};
