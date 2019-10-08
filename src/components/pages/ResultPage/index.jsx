import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './style';

import * as accountsActionCreators from '~/actions/accounts';
import Loading from '~/components/molecules/Loading';
import Typography from '~/components/atoms/Typography';
import { notifyMessage } from '../../../actions/notify';
import NotFound from '~/components/pages/NotFound';

const mapStateToProps = ({ adminPage }, ownProps) => ({
  ...adminPage,
  ...ownProps.match.params,
});

const mapDispatchToProps = dispatch => ({
  getAccounts() {
    return dispatch(accountsActionCreators.getAccounts());
  },
  notifyServerError() {
    return dispatch(notifyMessage('サーバーエラーが発生しました'));
  },
});

const targetToLabel = {
  'megane-is-good': 'めがね',
  'yubiwa-is-beautiful': 'ゆびわ',
};

export class AdminPageInner extends React.PureComponent {
  static propTypes = {
    getAccounts: PropTypes.func.isRequired,
    notifyServerError: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    target: PropTypes.string.isRequired,
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
    const { loading, accounts, target } = this.props;
    if (loading) {
      return <Loading />;
    }
    const label = targetToLabel[target];
    if (!label) {
      return <NotFound />;
    }
    const targetType = target.replace(/-/g, '_');
    const targetAccounts = accounts.filter(({ type }) => type === targetType);
    return (
      <div className="p_result">
        <Typography variant="h3">
          {label}
          を見つけてくれた人たち(
          {targetAccounts.length}
          人)
        </Typography>
        <List>
          {targetAccounts
            .map(({
              name,
              created_at: time,
            }) => (
              <ListItem key={`${name}-${time}`}>
                <ListItemText primary={name} secondary={moment(time).format('HH:mm:ss')} />
              </ListItem>
            ))}
        </List>
        <br />
        <br />
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPageInner));
