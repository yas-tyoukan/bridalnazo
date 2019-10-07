import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './style';

import * as accountsActionCreators from '~/actions/accounts';
import WithNavigationTemplate from '~/components/templates/WithNavigationTemplate';
import TextField from '~/components/molecules/TextField';
import Loading from '~/components/molecules/Loading';
import Typography from '~/components/atoms/Typography';
import Button from '~/components/atoms/Button';
import { notifyMessage } from '../../../actions/notify';
import FooterButtonWrapper from '../../atoms/FooterButtonWrapper';
import NotFound from '~/components/pages/NotFound';

const TARGET_MEGANE = 'megane-is-good';
const TARGET_YUBIWA = 'yubiwa-is-beautiful';

const isValidTarget = target => target === TARGET_MEGANE || target === TARGET_YUBIWA;

const passwordMap = {
  [TARGET_MEGANE]: '143036',
  [TARGET_YUBIWA]: '131268',
};

const validateName = (value) => {
  if (!value) {
    return ' ';
  }
  return value.length < 128 ? '' : '名前を128文字以下で入力してください';
};

const validatePassword = (value, target) => {
  if (value && passwordMap[target] === value) {
    return null;
  }
  return 'パスワードが違うみたい';
};

const mapStateToProps = ({ youFindPage }, ownProps) => ({
  ...youFindPage,
  ...ownProps.match.params,
});

const mapDispatchToProps = dispatch => ({
  registerName(name, type) {
    return dispatch(accountsActionCreators.postAccount(name, type));
  },
  notifyServerError() {
    return dispatch(notifyMessage('サーバーエラーが発生しました。何度も発生して登録できなかった場合は抽選時に新郎におしらせください'));
  },
});

export class YouFindPageInner extends React.PureComponent {
  static propTypes = {
    registerName: PropTypes.func.isRequired,
    notifyServerError: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loading: PropTypes.bool,
    target: PropTypes.string.isRequired,
  };

  static defaultProps = {
    loading: false,
  };

  constructor() {
    super();

    this.state = {
      value: '',
      error: null,
    };

    this.onChange = ::this.onChange;
    this.onSubmit = ::this.onSubmit;
  }

  onChange(e) {
    const { value } = e.target;
    const error = value ? validateName(value) || null : ' ';
    this.setState({
      value,
      error,
      valid: !error,
    });
  }

  onSubmit() {
    const { registerName, target } = this.props;
    const { value } = this.state;
    validatePassword();
    registerName(value, target.replace(/-/g, '_'))
      .then(() => {
        if (this.unmount) {
          return;
        }
        const { history } = this.props;
        history.push(`/find/${target}/complete`);
      })
      .catch(() => {
        if (this.unmount) {
          return;
        }
        const { notifyServerError } = this.props;
        notifyServerError();
      });
  }

  render() {
    const {
      valid,
      value,
      error,
    } = this.state;
    const {
      loading,
      target,
    } = this.props;
    if (!isValidTarget(target)) {
      return <NotFound />;
    }
    if (loading) {
      return <Loading />;
    }
    let label;
    let imageEl;
    if (target === TARGET_MEGANE) {
      label = 'めがね';
      imageEl = <img src="/img/megane.jpg" width="300" alt={label} />;
    } else if (target === TARGET_YUBIWA) {
      label = 'ゆびわ';
    }


    return (
      <WithNavigationTemplate
        classes={{
          root: 'p_you-find-page',
          contents: 'page-contents',
        }}
        footer={(
          <FooterButtonWrapper>
            <Button color="green" disabled={!valid} onClick={this.onSubmit} fullWidth>
              送信する
            </Button>
          </FooterButtonWrapper>
        )}
      >
        <div className="contents">
          <Typography className="title-message" variant="h2" color="deep-gray" align="center">
            おめでとう！!
            <br />
            {label}
            を見つけた！
          </Typography>
          <br />
          <div className="image-wrapper">
            {imageEl}
          </div>
          <br />
          <Typography variant="h3" color="deep-gray" align="center">
            名前を入力して送信するボタンを押してね
          </Typography>
          <br />
          <TextField
            className="field"
            input={{
              value,
              onChange: this.onChange,
            }}
            meta={{
              error,
              touched: true,
            }}
            placeholder="名前"
            fullWidth
            autoFocus
          />
        </div>
      </WithNavigationTemplate>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(YouFindPageInner));
