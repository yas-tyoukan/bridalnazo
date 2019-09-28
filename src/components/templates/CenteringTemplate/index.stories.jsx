import React from 'react';
import CenteringTemplate from '.';

const childrenSample = (
  <div>
    <h1 style={{ fontSize: '40px' }}>問題</h1>
    <p style={{ fontSize: '26px' }}>『エビフライ』にあって、『カキフライ』にないもの、なぁ〜んだ？</p>
    <p>
      答え：
      <span style={{ color: '#fff' }}>エビ</span>
    </p>
  </div>
);

export default stories => stories
  .add('horizontal', () => <CenteringTemplate horizontal>{childrenSample}</CenteringTemplate>)
  .add('vertical', () => <CenteringTemplate vertical>{childrenSample}</CenteringTemplate>)
  .add('horizontal and vertical', () => <CenteringTemplate horizontal vertical>{childrenSample}</CenteringTemplate>)
  .add('最大幅設定なし', () => (
    <CenteringTemplate
      horizontal
      vertical
      maxWidth="none"
    >
      {childrenSample}
    </CenteringTemplate>
  ));
