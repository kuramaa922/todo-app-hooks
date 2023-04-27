import React from 'react';
import propTypes from 'prop-types';
import './Footer.css';

import TaskFilter from '../TasksFilter';

const Footer = ({ todoData, filterBtn, clearCompleted }) => {
  const tasksLeft = todoData.length - todoData.filter((el) => el.done).length;

  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter setFilter={filterBtn} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  filterBtn: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  filterBtn: propTypes.func,
  clearCompleted: propTypes.func,
};

export default Footer;
