import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style';
import { notifyMessage } from '../../../actions/notify';
import FooterButtonWrapper from '../../atoms/FooterButtonWrapper';
import WithNavigationTemplate from '~/components/templates/WithNavigationTemplate';
import TextField from '~/components/molecules/TextField';
import Typography from '~/components/atoms/Typography';
import Button from '~/components/atoms/Button';
import NotFound from '~/components/pages/NotFound';

const TARGET_MEGANE = 'megane-is-good';
const TARGET_YUBIWA = 'yubiwa-is-beautiful';

const isValidTarget = target => target === TARGET_MEGANE || target === TARGET_YUBIWA;

const passwordMap = {
  [TARGET_MEGANE]: '143036',
  [TARGET_YUBIWA]: '131268',
};

const validatePassword = (value, target) => {
  if (value && passwordMap[target] === value) {
    return null;
  }
  return 'パスワードが違うよ';
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps.match.params,
});

const mapDispatchToProps = dispatch => ({
  notifyError(message) {
    return dispatch(notifyMessage(message));
  },
});

export class CheckPasswordPageInner extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    target: PropTypes.string.isRequired,
    notifyError: PropTypes.func.isRequired,
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
    const error = value ? null : ' ';
    this.setState({
      value,
      error,
      valid: !error,
    });
  }

  onSubmit() {
    const { target } = this.props;
    const { value } = this.state;
    const error = validatePassword(value, target);
    if (error) {
      const { notifyError } = this.props;
      notifyError(error);
      return;
    }
    const { history } = this.props;
    history.push(`/find/${target}`);
  }

  render() {
    const {
      valid,
      value,
      error,
    } = this.state;
    const {
      target,
    } = this.props;
    if (!isValidTarget(target)) {
      return <NotFound />;
    }
    let label;
    if (target === TARGET_MEGANE) {
      label = 'めがね';
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
              パスコードを送信する
            </Button>
          </FooterButtonWrapper>
        )}
      >
        <div className="contents">
          <Typography className="title-message" variant="h2" color="deep-gray" align="center">
            ここに
            {label}
            がありそうだ！
          </Typography>
          <br />
          <div className="image-wrapper">
            <img src="/img/takara.jpg" width="300" alt={label} />
          </div>
          <br />
          <Typography variant="h3" color="deep-gray" align="center">
            パスコードを使って開けよう
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
            placeholder="パスコード"
            fullWidth
            autoFocus
          />
        </div>
      </WithNavigationTemplate>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckPasswordPageInner);
