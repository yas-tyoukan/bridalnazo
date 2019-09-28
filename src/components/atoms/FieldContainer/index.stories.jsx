import React from 'react';

import TextField from '~/components/molecules/TextField';
import FieldContainer from '.';

export default stories => stories
  .add('default', () => (
    <div style={{ width: '768px', maxWidth: '100%', margin: 'auto' }}>
      <FieldContainer>
        <TextField
          required
          label="メールアドレス（ログインIDとして使用します)"
          fullWidth
        />
      </FieldContainer>
      <FieldContainer>
        <TextField
          required
          label="パスワード"
          fullWidth
        />
        <TextField
          placeholder="確認のためパスワードを再度入力"
          fullWidth
        />
      </FieldContainer>
    </div>
  ), {
    notes: 'フォームで使うTextFieldをラップしてmargin,paddingを設定するためのコンポーネント',
  });
