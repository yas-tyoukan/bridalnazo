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

const validateName = (value) => {
  if (!value) {
    return ' ';
  }
  return value.length < 128 ? '' : '名前を128文字以下で入力してください';
};

const mapStateToProps = ({ meganePage }) => meganePage;

const mapDispatchToProps = dispatch => ({
  registerName(name) {
    return dispatch(accountsActionCreators.postAccount(name, 'megane_is_good'));
  },
  notifyServerError() {
    return dispatch(notifyMessage('サーバーエラーが発生しました。何度も発生して登録できなかった場合は抽選時に新郎におしらせください'));
  },
});

export class MeganePageInner extends React.PureComponent {
  static propTypes = {
    registerName: PropTypes.func.isRequired,
    notifyServerError: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loading: PropTypes.bool,
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
    const { registerName } = this.props;
    const { value } = this.state;
    registerName(value)
      .then(() => {
        if (this.unmount) {
          return;
        }
        const { history } = this.props;
        history.push('/you-find-megane/complete');
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
    const { loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <WithNavigationTemplate
        classes={{
          root: 'p_megane-page',
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
          <Typography className="title-message" variant="h3">
            おめでとう！
            <br />
            めがねを見つけた！
          </Typography>
          <Typography variant="body2">
            名前を入力して送信するボタンを押してね
          </Typography>
          <TextField
            className="field"
            required
            label="名前"
            input={{
              value,
              onChange: this.onChange,
            }}
            meta={{
              error,
              touched: true,
            }}
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
)(MeganePageInner));
