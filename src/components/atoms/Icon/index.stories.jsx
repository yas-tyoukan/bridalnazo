import React from 'react';
import Icon, { names, sizes, colors } from '.';

export default (stories) => {
  stories
    .add('種類', () => (
      <>
        {names.map(name => (
          <Icon key={name} name={name} />
        ))}
      </>
    ))
    .add('size colors', () => (
      <>
        {sizes.map(size => (
          <div key={size}>
            {colors.map(color => (
              <Icon key={color} name="home" size={size} color={color} />
            ))}
          </div>
        ))}
        <dt>
          <dl>colors</dl>
          <dd>{colors.join(',')}</dd>
          <dl>sizes</dl>
          <dd>{sizes.join(',')}</dd>
        </dt>
      </>
    ));
};
