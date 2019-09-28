import React from 'react';
import HelpTooltip from '.';

const wrapStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

};

export default stories => stories
  .addDecorator(storyFn => <div style={wrapStyle}>{storyFn()}</div>)
  .add('default', () => (
    <HelpTooltip>
      このコードはログイン時に使用します。
      <br />
      忘れないようメモをしておいてください
    </HelpTooltip>
  ), { notes: 'わかりやすくするために中央配置している' });
