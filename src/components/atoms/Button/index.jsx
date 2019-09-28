import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUIButton from '@material-ui/core/Button';

import './style';

const classes = {
  label: 'label',
  fullWidth: 'fullWidth',
};

const sizeMap = {
  s: 'small',
  m: 'medium',
  l: 'large',
};

export const colors = [
  'green',
  'red',
  'blue',
  'gray',
  'gray2',
  'cancel',
  'link',
  'disabled',
];

export const sizes = ['xs', 's', 'm', 'l'];
export const widths = ['', 'm'];

const Button = ({
  className,
  type,
  color,
  size,
  width,
  ghost1,
  ghost2,
  children,
  disabled,
  ...remainProps
}) => (
  <MUIButton
    type={type}
    className={classNames(
      'a_button',
      `size-${size}`,
      `color-${disabled ? 'disabled' : color}`,
      className,
      {
        ghost1: !disabled && ghost1,
        ghost2: !disabled && ghost2,
        [`width-${width}`]: widths,
      },
    )}
    size={sizeMap[size]}
    classes={classes}
    disabled={disabled}
    {...remainProps}
  >
    {children || ''}
  </MUIButton>
);

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.oneOf(colors.concat([''])),
  ghost1: PropTypes.bool,
  ghost2: PropTypes.bool,
  size: PropTypes.oneOf(sizes),
  width: PropTypes.oneOf(widths),
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  size: 'm',
  width: '',
  color: '',
  ghost1: false,
  ghost2: false,
  fullWidth: false,
  children: null,
  disabled: false,
};

export default Button;
