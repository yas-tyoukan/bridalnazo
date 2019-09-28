import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

const FooterButtonWrapper = ({ className, children }) => (
  <div className={classNames('a_footer-button-wrapper', className)}>
    {children}
  </div>
);

FooterButtonWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
FooterButtonWrapper.defaultProps = {
  className: '',
};

export default FooterButtonWrapper;
