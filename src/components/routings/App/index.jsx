import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import Page from '~/components/routings/Page';
import NotFound from '~/components/pages/NotFound';
import GlobalNotifier from '~/components/organisms/GlobalNotifier';
import MeganePage from '~/components/pages/MeganePage';
import YubiwaPage from '~/components/pages/YubiwaPage';

export default () => (
  <BrowserRouter>
    <GlobalNotifier />
    <Switch>
      <Page path="/you-find-megane" component={MeganePage} />
      <Page path="/you-find-yubiwa" component={YubiwaPage} />
      <Page path="/*" component={NotFound} title="ご指定のページが見つかりません" />
    </Switch>
  </BrowserRouter>
);
