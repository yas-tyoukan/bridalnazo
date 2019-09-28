import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';

const FieldContainer = ({ className, ...props }) => (
  <div className={classNames(className, 'a_field-container')} {...props} />
);

FieldContainer.propTypes = {
  className: PropTypes.string,
};
FieldContainer.defaultProps = {
  className: null,
};

export default FieldContainer;
