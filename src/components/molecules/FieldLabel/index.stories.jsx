import React from 'react';
import FieldLabel from '.';

export default stories => stories
  .add('default', () => <FieldLabel>メールアドレス</FieldLabel>)
  .add('必須', () => <FieldLabel required>メールアドレス</FieldLabel>)
  .add('ツールチップ', () => (
    <FieldLabel
      required
      tooltipDescription="ログインIDとして使用します"
    >
      メールアドレス
    </FieldLabel>
  ));
