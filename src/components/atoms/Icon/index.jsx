import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

import * as icons from './icons';

export const sizes = ['s', 'm', 'l', 'll', 'xl'];

export const colors = [
  'inherit',
  'default',
  'white',
  'green',
  'blue',
  'gray',
  'deep-gray',
  'error',
];

export const names = [
  'add_circle',
  'add_photo_alternate',
  'build',
  'close',
  'create',
  'done',
  'help',
  'home',
  'home_outline',
  'hp',
  'hp_outline',
  'info_outline',
  'keyboard_arrow_down',
  'keyboard_arrow_left',
  'keyboard_arrow_right',
  'keyboard_arrow_up',
  'lens',
  'link',
  'mail',
  'money',
  'money_outline',
  'phone',
  'three_point_reader',
  'user',
  'user_outline',
  'warning',
  'send',
  'check_fill',
];

function Icon({
  name,
  className,
  size,
  color,
}) {
  const rootProps = {
    className: classNames('a_icon', className, `size-${size}`, `color-${color}`),
  };
  const SVG = icons[name];
  return (
    <i {...rootProps}>
      <SVG />
    </i>
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(names).isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(sizes),
  color: PropTypes.oneOf(colors),
};

Icon.defaultProps = {
  className: '',
  size: 'm',
  color: 'default',
};

export default Icon;
