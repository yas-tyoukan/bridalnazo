import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUIIconButton from '@material-ui/core/IconButton';

import './style';

import Icon from '~/components/atoms/Icon';

const IconButton = ({
  classes,
  icon,
  size,
  color,
  children,
  ...props
}) => (
  <MUIIconButton
    className={classNames(
      'a_icon-button',
      classes.root,
    )}
    {...props}
  >
    <Icon
      className={classes.icon}
      name={icon}
      size={size}
      color={color}
    />
    {children}
  </MUIIconButton>
);

IconButton.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    icon: PropTypes.string,
  }),
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['s', 'm']),
  color: PropTypes.string,
  children: PropTypes.node,
  ...MUIIconButton.propTypes,
};

IconButton.defaultProps = {
  classes: {},
  size: 'm',
  color: 'default',
  children: null,
  ...MUIIconButton.defaultProps,
};

export default IconButton;
