import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

import Typography from '~/components/atoms/Typography';

function NotifyMessage({ message }) {
  return (
    <div className={classNames('m_notify-message')}>
      <div className="back">
        <Typography variant="caption1" className="message" align="center">{message}</Typography>
      </div>
    </div>
  );
}

NotifyMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotifyMessage;
