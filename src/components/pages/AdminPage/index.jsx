import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './style';

import * as accountsActionCreators from '~/actions/accounts';
import Loading from '~/components/molecules/Loading';
import Typography from '~/components/atoms/Typography';
import { notifyMessage } from '../../../actions/notify';
import Button from '~/components/atoms/Button';

const mapStateToProps = ({ adminPage }) => adminPage;

const types = [{
  label: 'めがね正解者',
  type: 'megane_is_good',
}, {
  label: 'ゆびわ正解者',
  type: 'yubiwa_is_beautiful',
}];

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
    deleteAllAccounts: PropTypes.func.isRequired,
    notifyServerError: PropTypes.func.isRequired,
    loading: PropTypes.bool,
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

  constructor() {
    super();

    this.deleteAllAccounts = ::this.deleteAllAccounts;
  }

  componentDidMount() {
    const { getAccounts } = this.props;
    getAccounts();
  }

  deleteAllAccounts() {
    // eslint-disable-next-line no-alert
    if (!window.confirm('全て削除しますか？これは復元できない操作です')) {
      return;
    }
    const { deleteAllAccounts } = this.props;
    deleteAllAccounts()
      .catch(() => {
        if (this.unmount) {
          return;
        }
        const { notifyServerError } = this.props;
        notifyServerError();
      });
  }

  render() {
    const { loading, accounts } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="p_admin">
        <Typography className="title-message" variant="h2">
          管理画面
        </Typography>
        <Button color="red" onClick={this.deleteAllAccounts}>
          全削除
        </Button>
        <div>
          <Link to="/result/megane-is-good">めがねを見つけてくれた人たち</Link>
        </div>
        <div>
          <Link to="/result/yubiwa-is-beautiful">ゆびわを見つけてくれた人たち</Link>
        </div>
        <div>
          <Link to="/check-pass/megane-is-good">めがねパスコード入力ページ</Link>
        </div>
        <div>
          <Link to="/check-pass/yubiwa-is-beautiful">ゆびわパスコード入力ページ</Link>
        </div>
        <br />
        <br />
        <br />
        {types.map(({ label, type: currentType }) => (
          <div key={currentType}>
            <Typography variant="h3">
              {label}
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
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPageInner));
