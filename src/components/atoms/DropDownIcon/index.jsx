import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

const DropDownIcon = ({ className }) => (
  <span className={classNames('a_drop-down-icon', className)} />
);

DropDownIcon.propTypes = {
  className: PropTypes.string,
};

DropDownIcon.defaultProps = {
  className: null,
};

export default DropDownIcon;
