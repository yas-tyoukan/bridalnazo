import React from 'react';
import { action } from '@storybook/addon-actions';

import WithNavigationTemplate from '.';

const navStyle = {
  background: 'black',
  color: 'white',
  width: '100%',
};
const header = (
  <div style={navStyle}>ヘッダ</div>
);

const footer = (
  <div style={navStyle}>フッタ</div>
);

export default stories => stories
  .add('headerとfooterを設定', () => (
    <WithNavigationTemplate
      header={header}
      footer={footer}
      onContentsScroll={action('onContentsScroll')}
    >
      <div style={{ height: '2000px' }}>
        <p>
          スクロール時の表示を確認できるよう、高さを2000pxにしている
        </p>
        <p>
          ヘッダ要素とコンテンツに表示する要素を指定する
        </p>
      </div>
    </WithNavigationTemplate>
  ))
  .add('headerのみ', () => (
    <WithNavigationTemplate
      header={header}
    >
      <div style={{ height: '2000px' }}>
        <p>header指定、footer指定なし</p>
      </div>
    </WithNavigationTemplate>
  ))
  .add('footerのみ', () => (
    <WithNavigationTemplate
      footer={footer}
    >
      <div style={{ height: '2000px' }}>
        <p>header指定なし、footer指定</p>
      </div>
    </WithNavigationTemplate>
  ))
  .add('最大幅指定なし', () => (
    <WithNavigationTemplate
      header={header}
      footer={footer}
      maxWidth="none"
    >
      <p>デフォルトはコンテンツ領域の最大幅が設定されている。</p>
      <p>maxWidth=&quot;none&quot; 指定すると最大幅なし</p>
    </WithNavigationTemplate>
  ));
