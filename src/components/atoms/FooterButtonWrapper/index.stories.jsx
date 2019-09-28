import React from 'react';
import FooterButtonWrapper from '.';
import Button from '~/components/atoms/Button';

export default stories => stories
  .add('1つ', () => (
    <FooterButtonWrapper>
      <Button fullWidth color="green">保存する</Button>
    </FooterButtonWrapper>
  ))
  .add('2つ', () => (
    <FooterButtonWrapper>
      <Button fullWidth color="green">保存する</Button>
      <Button fullWidth color="green">キャンセル</Button>
    </FooterButtonWrapper>
  ));
