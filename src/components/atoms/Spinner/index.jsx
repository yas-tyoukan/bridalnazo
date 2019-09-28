import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';

const Spinner = ({ variant }) => (
  <span className={classNames('a_spinner', { [`variant-${variant}`]: variant })} />
);

Spinner.propTypes = {
  variant: PropTypes.oneOf(['default', 'monochrome']),
};

Spinner.defaultProps = {
  variant: 'default',
};

export default Spinner;
