import React from 'react';
import Typography, { variants, colors } from '.';

export default (stories) => {
  const aligns = ['inherit', 'center', 'left', 'right', 'justify'];
  aligns.forEach(align => stories
    .add(`align="${align}"`, () => <Typography align={align}>Hello</Typography>));
  variants.forEach(variant => stories
    .add(`variant="${variant}"`, () => (
      <Typography variant={variant}>
        {variant}
        .テキスト
      </Typography>
    )));
  stories.add('color', () => colors.map(color => (
    <Typography key={color} style={{ padding: '1em' }} color={color}>{color}</Typography>
  )));

  return stories;
};
