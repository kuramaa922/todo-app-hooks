import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm/NewTaskForm';

const Header = (props) => {
  const { onAdded } = props;
  return (
    <header>
      <h1>todos</h1>
      <NewTaskForm onAdded={onAdded} />
    </header>
  );
};
Header.defaultProps = {
  onAdded: () => {},
};
Header.propTypes = {
  onAdded: PropTypes.func,
};
export default Header;
