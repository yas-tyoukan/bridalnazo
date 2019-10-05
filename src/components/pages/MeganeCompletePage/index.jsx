import React from 'react';
import Typography from '~/components/atoms/Typography';
import TitleAndMessageTemplate from '~/components/templates/TitleAndMessageTemplate';

export default () => (
  <TitleAndMessageTemplate
    className="p_not-found"
    title="おめでとう！"
  >
    <Typography
      variant="body2"
      color="black"
    >
      おめでとう！
    </Typography>
  </TitleAndMessageTemplate>
);
