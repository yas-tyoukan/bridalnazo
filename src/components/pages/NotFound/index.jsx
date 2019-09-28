import React from 'react';
import Typography from '~/components/atoms/Typography';
import TitleAndMessageTemplate from '~/components/templates/TitleAndMessageTemplate';

const NotFound = () => (
  <TitleAndMessageTemplate
    className="p_not-found"
    title="ご指定のページが見つかりません"
  >
    <Typography
      variant="body2"
      color="black"
    >
      リンクに問題があるか、ページが削除された可能性があります
    </Typography>
  </TitleAndMessageTemplate>
);

export default NotFound;
