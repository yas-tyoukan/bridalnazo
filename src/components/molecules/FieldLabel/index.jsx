import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style';

import RequiredTag from '~/components/atoms/RequiredTag';
import HelpTooltip from '~/components/atoms/HelpTooltip';
import Typography from '~/components/atoms/Typography';

const FieldLabel = ({
  required,
  children,
  tooltipDescription,
  className,
  bold,
  ...remainProps
}) => (
  <div className={classNames(className, 'm_field-label')} {...remainProps}>
    {required && <RequiredTag className="tag" />}
    <Typography variant="body1-2" bold inline>{children}</Typography>
    {tooltipDescription && <HelpTooltip>{tooltipDescription}</HelpTooltip>}
  </div>
);

export const propTypes = {
  className: PropTypes.string,
  bold: PropTypes.bool,
  required: PropTypes.bool,
  children: PropTypes.string,
  tooltipDescription: PropTypes.node,
};

export const defaultProps = {
  className: '',
  bold: true,
  required: false,
  children: '',
  tooltipDescription: null,
};

FieldLabel.propTypes = propTypes;
FieldLabel.defaultProps = defaultProps;

export default FieldLabel;
