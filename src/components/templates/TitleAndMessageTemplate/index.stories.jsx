import React from 'react';
import Typography from '~/components/atoms/Typography';
import TitleAndMessageTemplate from '.';

export default stories => stories
  .add('default', () => (
    <TitleAndMessageTemplate
      title="この店舗はすでに登録済です"
    >
      <Typography
        variant="body2"
        color="black"
      >
        ご不明な点がございましたら、大変お手数ですが、an担当営業までご連絡ください
      </Typography>
    </TitleAndMessageTemplate>
  ))
  .add('タイトルに改行が含まれている', () => (
    <TitleAndMessageTemplate
      title={'この店舗は\nすでに登録済です'}
    >
      <Typography
        variant="body2"
        color="black"
      >
        ご不明な点がございましたら、大変お手数ですが、an担当営業までご連絡ください
      </Typography>
    </TitleAndMessageTemplate>
  ));
