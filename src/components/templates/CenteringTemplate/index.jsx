import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';

const CenteringTemplate = ({
  classes,
  children,
  horizontal,
  vertical,
  maxWidth,
}) => (
  <div className={classNames(
    't_centering-template',
    classes.root,
    {
      horizontal,
      vertical,
      [`max-width-${maxWidth}`]: maxWidth,
    },
  )}
  >
    {children}
  </div>
);

CenteringTemplate.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  children: PropTypes.node,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['none', 'sp']),
};

CenteringTemplate.defaultProps = {
  classes: {},
  children: '',
  maxWidth: 'sp',
  horizontal: false,
  vertical: false,
};

export default CenteringTemplate;
