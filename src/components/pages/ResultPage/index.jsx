import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import './style';

import * as accountsActionCreators from '~/actions/accounts';
import Loading from '~/components/molecules/Loading';
import Typography from '~/components/atoms/Typography';
import { notifyMessage } from '../../../actions/notify';
import Button from '~/components/atoms/Button';

const mapStateToProps = ({ adminPage }, ownProps) => ({
  ...adminPage,
  ...ownProps.match.params,
});

const mapDispatchToProps = dispatch => ({
  getAccounts() {
    return dispatch(accountsActionCreators.getAccounts());
  },
  deleteAllAccounts() {
    return dispatch(accountsActionCreators.deleteAccounts());
  },
  notifyServerError() {
    return dispatch(notifyMessage('サーバーエラーが発生しました'));
  },
});

export class AdminPageInner extends React.PureComponent {
  static propTypes = {
    getAccounts: PropTypes.func.isRequired,
    notifyServerError: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    type: PropTypes.string.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      created_at: PropTypes.string,
    })),
  };

  static defaultProps = {
    loading: false,
    accounts: [],
  };

  componentDidMount() {
    const { getAccounts } = this.props;
    getAccounts().catch(() => {
      if (this.unmount) {
        return;
      }
      const { notifyServerError } = this.props;
      notifyServerError();
    });
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  render() {
    const { loading, accounts, type: currentType } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="p_result">
        <Typography className="title-message" variant="h2">
          管理画面
        </Typography>
        <br />
        <br />
        <br />
        <Typography variant="h3">
          クリアした人
        </Typography>
        {accounts
          .filter(({ type }) => type === currentType)
          .map(({
            name,
            created_at: time,
          }) => (
            <p key={`${name}-${time}`}>
              <span style={{ fontFamily: 'monospace' }}>
                {moment(time).format('HH:mm:ss')}
                ｜
              </span>
              <span>{name}</span>
            </p>
          ))}
        <br />
        <br />
        <br />
        <Button color="red" onClick={this.deleteAllAccounts}>
          全削除
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPageInner));
