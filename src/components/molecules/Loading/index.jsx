import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

import Spinner from '~/components/atoms/Spinner';

function Loading({ variant }) {
  return (
    <div className={classNames('m_loading', variant)}>
      <div className="back" />
      <Spinner />
    </div>
  );
}

Loading.propTypes = {
  variant: PropTypes.oneOf(['default', 'inList']),
};

Loading.defaultProps = {
  variant: 'default',
};

export default Loading;
