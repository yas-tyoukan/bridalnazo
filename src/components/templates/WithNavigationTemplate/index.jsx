import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style';

export default class WithNavigationTemplate extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string,
      header: PropTypes.string,
      contents: PropTypes.string,
      footer: PropTypes.string,
    }),
    header: PropTypes.node,
    footer: PropTypes.node,
    maxWidth: PropTypes.oneOf(['none', 'sp']),
    children: PropTypes.node.isRequired,
    updateHeaderAt: PropTypes.number,
    updateFooterAt: PropTypes.number,
    onContentsScroll: PropTypes.func,
  };

  static defaultProps = {
    classes: {},
    header: null,
    footer: null,
    maxWidth: 'sp',
    updateHeaderAt: null,
    updateFooterAt: null,
    onContentsScroll: null,
  };

  constructor() {
    super();
    this.headerWrapperRef = React.createRef();
    this.contentsWrapperRef = React.createRef();
    this.footerWrapperRef = React.createRef();
    this.state = {
      contentsScrollTop: 0,
      navigationHide: false,
    };
    this.onScrollHandler = ::this.onScrollHandler;
  }

  componentDidMount() {
    // ヘッダとフッタはtransitionで高さを変えたいため、style.heightを設定している
    // メイン表示部分にヘッダとフッタの分のpaddingを設定する
    this.adjustTop();
    this.adjustBottom();
    const contentsWrapper = this.contentsWrapperRef.current;

    // コンテンツ部分のスクロールイベントを設定
    if (contentsWrapper) {
      contentsWrapper.addEventListener('scroll', this.onScrollHandler);
    }
  }

  componentDidUpdate(prevProps) {
    const { updateHeaderAt, updateFooterAt } = this.props;
    if (prevProps.updateHeaderAt !== updateHeaderAt) {
      this.adjustTop();
    }
    if (prevProps.updateFooterAt !== updateFooterAt) {
      this.adjustBottom();
    }
  }

  componentWillUnmount() {
    const contentsWrapper = this.contentsWrapperRef.current;
    if (!contentsWrapper) {
      return;
    }
    contentsWrapper.removeEventListener('scroll', this.onScrollHandler);
  }

  onScrollHandler(e) {
    // 親コンポーネントが渡すスクロールハンドラを実行する
    const { onContentsScroll } = this.props;
    if (onContentsScroll) {
      onContentsScroll(e);
    }
    // ヘッダ・フッタの表示制御
    const { target } = e;
    const { scrollTop, scrollHeight, offsetHeight } = target;
    if (!scrollTop || scrollHeight - offsetHeight <= scrollTop) {
      // スクロールした位置が一番下または一番上ならヘッダやフッタを表示して終わり
      this.setState({
        contentsScrollTop: scrollTop,
        navigationHide: false,
      });
      return;
    }
    // スクロールした方向が下ならヘッダやフッタを隠す、上なら表示する
    const { contentsScrollTop: prevScrollTop } = this.state;
    const navigationHide = prevScrollTop < scrollTop;
    this.setState({
      contentsScrollTop: scrollTop,
      navigationHide,
    });
  }

  adjustTop() {
    const headerWrapper = this.headerWrapperRef.current;
    if (!headerWrapper) {
      return;
    }
    const headerHeightPx = `${headerWrapper.offsetHeight}px`;
    headerWrapper.style.height = headerHeightPx;

    const contentsWrapper = this.contentsWrapperRef.current;
    if (contentsWrapper) {
      contentsWrapper.style.paddingTop = headerHeightPx;
    }
  }

  adjustBottom() {
    const footerWrapper = this.footerWrapperRef.current;
    if (!footerWrapper) {
      return;
    }
    const footerHeightPx = `${footerWrapper.offsetHeight}px`;
    footerWrapper.style.height = footerHeightPx;

    const contentsWrapper = this.contentsWrapperRef.current;
    if (contentsWrapper) {
      contentsWrapper.style.paddingBottom = footerHeightPx;
    }
  }

  render() {
    const {
      header,
      footer,
      classes,
      maxWidth,
      children,
    } = this.props;
    const { navigationHide } = this.state;
    return (
      <div
        className={classNames(
          't_with-header-template',
          classes.root,
          footer && 'include-footer',
          header && 'include-header',
          `max-width-${maxWidth}`,
        )}
      >
        {header && (
          <div
            ref={this.headerWrapperRef}
            className={classNames(
              classes.header,
              'navigation-wrapper',
              'header-wrapper',
              { hide: navigationHide },
            )}
          >
            {header}
          </div>
        )}
        <div
          ref={this.contentsWrapperRef}
          className={classNames(classes.contents, 'contents-wrapper')}
        >
          {children}
        </div>
        {footer && (
          <div
            ref={this.footerWrapperRef}
            className={classNames(
              classes.footer,
              'navigation-wrapper',
              'footer-wrapper',
              { hide: navigationHide },
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
}
