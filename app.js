const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// -------- X-Powered-Byヘッダの無効化 -------- //
app.disable('x-powered-by');

// -------- サーバーの起動 -------- //
if (!module.parent) {
  // テストのためなどでrequireして読み込んでいる場合は起動しないようにしている
  const server = http.Server(app);
  const port = process.env.NODE_PORT || 3000;
  server.listen(port);
}

// ------ テンプレートエンジンの設定 ------ //
app.set('views', 'views/pages');
app.set('view engine', 'ejs');

// ------ bodyParserの設定 ------- //
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  // queryStringのパースをするか
  // trueにするとオブジェクトのネストや配列を保持したまま受け取れる。"foo[bar]=baz"->{foo:{bar:'baz'}}
  extended: true,
  limit: '10mb',
}));

// ------ 全ページ共通容量制限 ------- //
app.use(bodyParser.json({
  limit: '10mb',
}));

// ------ ルーティング ------ //
app.use('/', require('./router'));

// ------ エラーハンドリング ------ //
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.json({
    status: 500,
    message: 'some error',
    method: req.method,
    url: req.originalUrl,
    detail: err,
  });
});

module.exports = app;
