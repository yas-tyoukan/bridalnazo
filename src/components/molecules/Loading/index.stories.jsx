import React from 'react';
import Loading from '.';

export default stories => stories
  .add('default', () => <Loading />)
  .add('リストの続きをロード中', () => <Loading variant="inList" />, { notes: '高さを設定している。z-index:autoにしている' });
