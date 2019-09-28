import React from 'react';
import { action } from '@storybook/addon-actions';
import IconButton from '.';

export default stories => stories
  .add('close', () => <IconButton onClick={action('onClick')} icon="close" />)
  .add('close size=s', () => <IconButton onClick={action('onClick')} icon="close" size="s" />)
  .add('close size=m', () => <IconButton onClick={action('onClick')} icon="close" size="m" />);
