import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import Page from '~/components/routings/Page';
import NotFound from '~/components/pages/NotFound';
import GlobalNotifier from '~/components/organisms/GlobalNotifier';
import CheckPasswordPage from '~/components/pages/CheckPasswordPage';
import YouFindPage from '~/components/pages/YouFindPage';
import CompletePage from '~/components/pages/CompletePage';
import ResultPage from '~/components/pages/ResultPage';
import AdminPage from '~/components/pages/AdminPage';

export default () => (
  <BrowserRouter>
    <GlobalNotifier />
    <Switch>
      <Page path="/check-pass/:target" exact component={CheckPasswordPage} />
      <Page path="/find/:target" exact component={YouFindPage} />
      <Page path="/find/:target/complete" component={CompletePage} />
      <Page path="/admin-yh" component={AdminPage} />
      <Page path="/result/:type" component={ResultPage} />
      <Page path="/*" component={NotFound} title="ご指定のページが見つかりません" />
    </Switch>
  </BrowserRouter>
);
