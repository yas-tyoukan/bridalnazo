import React from 'react';
import MUITypography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

const defaultVariant = 'body1';

export const colors = [
  'inherit',
  'default',
  'green',
  'blue',
  'light-gray',
  'gray',
  'deep-gray',
  'black',
  'white',
  'error',
  'red',
];
const defaultClasses = {
  colorError: 'color-error',
};

const variantsOfMUITypography = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'button',
  'overline',
  'display4', // deprecated
  'display3',
  'display2',
  'display1',
  'headline',
  'title',
  'subheading',
];

// TODO x:eeeで使うバリエーション(variant)が決まったら、それをMaterial-UIのTypographyで表せるようににマッピングする
// 例えば、'caption3'のようなバリエーションが必要なら、それはMaterial-UIにないので
// <Typography variant="caption" className="caption3" />
// のようにして、
// style.lessに .caption3{font-size:XXpx!important}と書くなど。
const Typography = ({
  className,
  variant,
  bold,
  color,
  role,
  ...remainProps
}) => {
  const classes = { ...defaultClasses };
  let v;
  if (variantsOfMUITypography.indexOf(variant) !== -1) {
    v = variant;
  } else {
    // Material-UI の Typographyにないvariantの場合は、variantをbody1にしてクラスを設定する
    v = defaultVariant;
    classes[v] = variant;
  }
  return (
    <MUITypography
      className={classNames(
        className,
        'a_typography',
        `color-${color}`,
        {
          bold,
          'cursor-pointer': role === 'button',
        },
      )}
      variant={v}
      classes={classes}
      {...remainProps}
    />
  );
};

export const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'caption1',
  'caption2',
  'caption3',
  'body1',
  'body1-2',
  'body2',
  'small1',
  'small2',
];

Typography.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(variants),
  bold: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  role: PropTypes.string,
};

Typography.defaultProps = {
  className: '',
  variant: defaultVariant,
  bold: false,
  color: 'inherit',
  role: null,
};

export default Typography;
