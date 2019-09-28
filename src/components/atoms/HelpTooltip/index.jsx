import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './style';

import IconButton from '~/components/atoms/IconButton';

const HelpTooltip = ({ children, open, id }) => (
  <Tooltip
    title={<div className="contents">{children}</div>}
    className="m_help-tooltip button-wrapper"
    classes={{ popper: 'm_help-tooltip tooltip' }}
    placement="top"
    enterTouchDelay={0}
    leaveTouchDelay={5000}
    PopperProps={{
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: true,
          },
        },
      },
    }}
    open={open}
    id={id}
  >
    <span>
      <IconButton tabIndex="-1" icon="help" />
    </span>
  </Tooltip>
);

HelpTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  id: PropTypes.string,

};

HelpTooltip.defaultProps = {
  open: false,
  id: '',
};

export default HelpTooltip;
