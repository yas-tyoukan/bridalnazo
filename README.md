# はじめに
node環境が必要

```
$ npm install
```

```
$ npm run build
$ node app
```

# 環境変数
必要な環境変数は以下を参考
```
# db settings
# メモリを使う場合は設定不要(NODE_ENV=developmentの時のみ)
export MYSQL_HOST=localhost
export MYSQL_USER=
export MYSQL_PASS=
export MYSQL_NAME=bridalnazo

# port
export NODE_PORT=3000

# env
export NODE_ENV=development
```

# db
migrate
```
create table accounts (
  name char(256),
  type char(256,
  created_at datetime  default current_timestamp
);
```

# 開発時
## jsのビルド(watch)
```
$ npm run watch
```

## ブラウザでの動作確認

```
localhost:3000
```

 portは環境変数`NODE_PORT`で指定した値
