import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style';

import FadeOutWrapper from '~/components/atoms/FadeOutWrapper';
import NotifyMessage from '~/components/molecules/NotifyMessage';

const mapStateToProps = ({ globalNotifier }) => globalNotifier;

export class GlobalNotifierInner extends React.PureComponent {
  static propTypes = {
    notifyMessage: PropTypes.string,
    notifiedAt: PropTypes.number,
  };

  static defaultProps = {
    notifyMessage: '',
    notifiedAt: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { notifiedAt } = nextProps;
    const {
      notifiedAt: prevNotifiedAt,
      notifyMessageTimer,
      notificationWrapperEl,
    } = prevState;
    if (prevNotifiedAt === notifiedAt) {
      return prevState;
    }
    clearTimeout(notifyMessageTimer);
    // FadeOutWrapperでtime=2を指定している時に、通知が完全に消えるのは2.5秒かかる
    const timer = setTimeout(() => {
      if (notificationWrapperEl) {
        notificationWrapperEl.style.display = 'none';
      }
    }, 2500);
    return {
      notifiedAt,
      notifyMessageTimer: timer,
    };
  }

  constructor() {
    super();
    this.state = {
      notifyMessageTimer: null,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { notifiedAt } = this.props;
  //   const { notifyMessageTimer } = this.state;
  //   if (notifiedAt !== nextProps.notifiedAt) {
  //     clearTimeout(notifyMessageTimer);
  //     // FadeOutWrapperでtime=2を指定している時に、通知が完全に消えるのは2.5秒かかる
  //     const timer = setTimeout(() => {
  //       const { notificationWrapperEl } = this;
  //       if (notificationWrapperEl) {
  //         notificationWrapperEl.style.display = 'none';
  //       }
  //     }, 2500);
  //     this.setState({
  //       notifyMessageTimer: timer,
  //     });
  //   }
  // }

  render() {
    const {
      notifyMessage,
      notifiedAt,
    } = this.props;
    return (
      <>
        {notifyMessage && ReactDOM.createPortal(
          <div
            className="o_global-notifier"
            key={notifiedAt}
            ref={(el) => {
              this.setState({ notificationWrapperEl: el });
            }}
          >
            <FadeOutWrapper time={2}>
              <NotifyMessage message={notifyMessage} />
            </FadeOutWrapper>
          </div>,
          window.document.body,
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  null,
)(GlobalNotifierInner);
