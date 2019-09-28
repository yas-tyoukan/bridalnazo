# はじめに
node環境が必要

```
$ npm install
```

```
$ npm run start
```

# 環境変数
必要な環境変数は以下を参考
```
# db settings
# メモリを使う場合は設定不要(NODE_ENV=developmentの時のみ)
export MYSQL_HOST=localhost
export MYSQL_USER=6379
export MYSQL_PASS=0
export MYSQL_NAME=bridalnazo

# port
export NODE_PORT=3000

# env
export NODE_ENV=development

# is https
export COOKIE_SECURE=false

# session
export SESSION_SECRET_KEY=xxxxxxxxxxxx
export SESSION_MAX_LIFE_TIME=3600000

# backend
export GW_PROTOCOL=http
export GW_HOST=localhost:50001

# cf. https://babeljs.io/docs/en/babel-register#babel-disable-cache
BABEL_DISABLE_CACHE=1

# aws s3
# cf. https://seeds.rickcloud.jp/wiki/pages/viewpage.action?pageId=6258731
export AWS_S3_ADMIN_BUCKET=
export AWS_S3_ADMIN_REGION=
export AWS_S3_ADMIN_ACCESS_KEY_ID=
export AWS_S3_ADMIN_SECRET_ACCESS_KEY=
```

# 開発時
## jsのビルド(watch)
```
$ npm run watch
```

## expressサーバの立ち上げ(デバッグモード)
```
$ npm run debug
```
`--inspect` 指定で起動している

参考： https://nodejs.org/en/docs/guides/debugging-getting-started/

NIM(Node Inspector Manager)を入れておくと楽

参考： https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj


## ブラウザでの動作確認

```
localhost:3000
```

 portは環境変数`NODE_PORT`で指定した値

## backendの構築

```
$ eval $(aws ecr get-login --region ap-northeast-1 --no-include-email
$ make local
$ make data
```

# クラスタ起動(本番向け)
```
$ npm run start-prod
```
buildしてpm2を使ってプロセスをクラスタ起動する。

クラスタ起動設定は `process.json`

# React Storybook
```
$ npm run storybook
```

=> Opens storybook in browser


```
$ npm run storybook -- -p 6007
```

=> Serves on specified port

```
$ npm run build-storybook
```

=> Builds and outputs local html files at `./storybook-static`

# バックエンドの立ち上げ
https://seeds.rickcloud.jp/wiki/pages/viewpage.action?pageId=7931157

# バックエンドをmockにする
バックエンド実装より先にフロントエンド実装を行うときに便利

モックサーバーについては`./mock/README.md`参照のこと

UIサーバーのバックエンドへの接続先がモックサーバー経由になるように、環境変数を設定する
```
export GW_HOST=localhost
export GW_PORT=3001
```
