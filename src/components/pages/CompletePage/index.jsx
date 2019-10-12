import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '~/components/atoms/Typography';
import NotFound from '~/components/pages/NotFound';

const TARGET_MEGANE = 'megane-is-good';
const TARGET_YUBIWA = 'yubiwa-is-beautiful';

const isValidTarget = target => target === TARGET_MEGANE || target === TARGET_YUBIWA;

const mapStateToProps = (state, ownProps) => ({
  ...ownProps.match.params,
});

const CompletePageInner = ({ target }) => {
  if (!isValidTarget(target)) {
    return <NotFound />;
  }
  let contentsEl;
  if (target === TARGET_MEGANE) {
    contentsEl = (
      <div>
        <div className="image-wrapper">
          <img src="/img/next-nazo.gif" width="300" alt="gif" />
        </div>
        <Typography className="title-message" variant="h3" color="deep-gray" align="center">
          あれ？
          <br />
          ピカチュウはまた
          <br />
          何かを持っていったみたい
        </Typography>
      </div>
    );
  } else if (target === TARGET_YUBIWA) {
    contentsEl = (
      <div>
        <Typography className="title-message" variant="h2" color="deep-gray" align="center">
          探し物は全て見つけた！
          <br />
          完全クリアおめでとう！
        </Typography>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <img width="300" src="/img/omedeto.jpg" alt="complete" />
        </div>
      </div>
    );
  }
  return (
    <div className="p_complete-page">
      <Typography className="title-message" variant="h2" color="deep-gray" align="center">
        名前を送信しました！
        <br />
        プレゼントの抽選をお楽しみに！
      </Typography>
      <br />
      {contentsEl}
    </div>
  );
};

CompletePageInner.propTypes = {
  target: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
)(CompletePageInner);
