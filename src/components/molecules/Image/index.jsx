import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style';

import Spinner from '~/components/atoms/Spinner';
import fallbackImageDefault from './fallback.svg';

export default class Image extends React.PureComponent {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['auto', 'cover']),
    fallbackImage: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    size: 'auto',
    fallbackImage: fallbackImageDefault,
  };

  constructor() {
    super();
    this.state = {};
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    const { src } = this.props;
    this.reload(src);
  }

  componentWillReceiveProps(nextProps) {
    const { src } = this.props;
    if (src !== nextProps.src) {
      this.reload(src);
    }
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  reload(src) {
    this.setState({
      loading: true,
      src: null,
      failed: false,
      fallbackStyle: null,
    });

    const image = new window.Image();
    image.src = src;

    image.onload = () => {
      if (this.unmount) {
        return;
      }
      this.setState({
        src: image.src,
        loading: false,
        failed: false,
      });
    };

    image.onerror = () => {
      const { fallbackImage } = this.props;
      if (this.unmount) {
        return;
      }
      this.setState({
        src: fallbackImage,
        loading: false,
        failed: true,
      });
    };
  }

  render() {
    const {
      fallbackImage,
      alt,
      size,
      className,
    } = this.props;
    const {
      src,
      loading,
      failed,
      fallbackStyle,
    } = this.state;
    const rootRef = (e) => {
      this.rootEl = e;
    };
    const clsName = classNames('m_image', className, { [`size-${size}`]: size });
    if (loading) {
      return (
        <div className={classNames(clsName, 'loading')} ref={rootRef}>
          <Spinner variant="monochrome" />
        </div>
      );
    }
    if (failed) {
      return (
        <div className={classNames(clsName, 'failed')} ref={rootRef}>
          <img alt={alt} src={fallbackImage} />
        </div>
      );
    }

    return (
      <div className={classNames(clsName, 'loaded')} ref={rootRef}>
        <img style={fallbackStyle} alt={alt} src={src} />
      </div>
    );
  }
}
