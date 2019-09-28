import React from 'react';
import Spinner from '.';

export default stories => stories
  .add('default', () => <Spinner />)
  .add('monochrome', () => <Spinner variant="monochrome" />);
