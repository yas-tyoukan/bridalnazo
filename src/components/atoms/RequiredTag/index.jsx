import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

import Typography from '~/components/atoms/Typography';


const RequiredTag = ({ className }) => (
  <Typography
    className={classNames('a_required-tag', className)}
    variant="small1"
    inline
  >
    必須
  </Typography>
);

RequiredTag.propTypes = {
  className: PropTypes.string,
};

RequiredTag.defaultProps = {
  className: '',
};

export default RequiredTag;
