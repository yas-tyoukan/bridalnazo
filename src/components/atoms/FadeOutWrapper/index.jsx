import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

export default class FadeOutWrapper extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    time: PropTypes.oneOf([1, 2]),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
    time: 1,
  };

  constructor() {
    super();
    this.state = {
      isAnimationEnd: false,
    };
    this.onAnimationEnd = ::this.onAnimationEnd;
  }

  onAnimationEnd() {
    this.setState({
      isAnimationEnd: true,
    });
  }

  render() {
    const {
      className,
      time,
      children,
    } = this.props;

    const {
      isAnimationEnd,
    } = this.state;

    return (
      <div
        className={classNames('a_fade-out-wrapper', className, isAnimationEnd ? '' : `time-${time}`)}
        onAnimationEnd={this.onAnimationEnd}
      >
        {children}
      </div>
    );
  }
}
