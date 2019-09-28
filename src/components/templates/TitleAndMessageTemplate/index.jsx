import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

import Typography from '~/components/atoms/Typography';

const TitleAndMessageTemplate = ({
  className,
  title,
  children,
}) => (
  <section className={classNames('t_title-and-message-template', className)}>
    {title && (
      <Typography
        className="title"
        variant="h2"
        color="deep-gray"
      >
        {title}
      </Typography>
    )}
    {children && (
      <div className="message-wrapper">
        {children}
      </div>
    )}
  </section>
);

TitleAndMessageTemplate.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

TitleAndMessageTemplate.defaultProps = {
  className: '',
  title: '',
  children: null,
};

export default TitleAndMessageTemplate;
