import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import * as locationActionCreators from '~/actions/routing';

const mapDispatchToProps = dispatch => bindActionCreators(locationActionCreators, dispatch);

class Page extends Route {
  static propTypes = {
    changeLocation: PropTypes.func,
    titleSuffix: PropTypes.string,
  };

  static defaultProps = {
    changeLocation: null,
    titleSuffix: 'ブライダルなぞとき',
  };

  constructor() {
    super();
    this.updatePageTitle = ::this.updatePageTitle;
  }

  componentDidMount() {
    this.updatePageTitle();
  }

  componentDidUpdate() {
    this.updatePageTitle();
    window.scrollTo(0, 0);
  }

  updatePageTitle() {
    const {
      title = '',
      titleSuffix = '',
      changeLocation,
    } = this.props;
    document.title = `${title}${titleSuffix}`;
    if (changeLocation) {
      changeLocation(this.props);
    }
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Page);
