import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import Page from '~/components/routings/Page';
import NotFound from '~/components/pages/NotFound';
import GlobalNotifier from '~/components/organisms/GlobalNotifier';
import MeganePage from '~/components/pages/MeganePage';
import MeganeCompletePage from '~/components/pages/MeganeCompletePage';
import YubiwaPage from '~/components/pages/YubiwaPage';
import AdminPage from '~/components/pages/AdminPage';

export default () => (
  <BrowserRouter>
    <GlobalNotifier />
    <Switch>
      <Page path="/you-find-megane" exact component={MeganePage} />
      <Page path="/you-find-megane/complete" component={MeganeCompletePage} />
      <Page path="/you-find-yubiwa" component={YubiwaPage} />
      <Page path="/admin-yh" component={AdminPage} />
      <Page path="/*" component={NotFound} title="ご指定のページが見つかりません" />
    </Switch>
  </BrowserRouter>
);
