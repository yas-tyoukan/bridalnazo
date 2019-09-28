import React from 'react';
import { GlobalNotifierInner as GlobalNotifier } from '.';

export default stories => stories
  .add('default', () => <GlobalNotifier notifyMessage="サーバーエラーが発生しました" notifiedAt={Date.now()} />);
