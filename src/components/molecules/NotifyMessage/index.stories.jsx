import React from 'react';
import NotifyMessage from '.';

export default stories => stories
  .add('default', () => <NotifyMessage message="サーバーエラーが発生しました" />);
