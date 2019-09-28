import React from 'react';
import { action } from '@storybook/addon-actions';

import Typography from '~/components/atoms/Typography';
import Button, { colors, sizes } from '.';

export default (stories) => {
  const props = {
    onClick: action('onClick'),
  };

  sizes.forEach((size) => {
    stories.add(`${size}`, () => (
      <>
        {colors.map(color => (
          <div key={color}>
            <Button color={color} {...props} size={size}>
              通常ボタン
            </Button>
            <Button color={color} {...props} size={size} ghost1>
              ゴースト1
            </Button>
            <Button color={color} {...props} size={size} ghost2>
              ゴースト2
            </Button>
          </div>
        ))}
      </>
    ));
  });

  stories
    .add('任意のコンテンツ', () => (
      <Button
        color="green"
        fullWidth
        {...props}
      >
        <Typography variant="body1" color="inherit">
          利用規約に同意して開始
        </Typography>
        <Typography variant="caption1" color="inherit">
          ※同意すると次回以降は表示されません
        </Typography>
      </Button>
    ))
    .add('disabled', () => (
      <>
        {sizes.map(size => (
          <div key={size} style={{ margin: '10px' }}>
            <Button {...props} size={size} disabled>
              通常ボタン
            </Button>
          </div>
        ))}
      </>
    ))
    .add('fullWidth', () => (<Button color="green" fullWidth>ボタン</Button>))
    .add('width="m"', () => <Button color="green" width="m">ボタン</Button>);

  return stories;
};
