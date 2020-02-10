# デバイス一覧表示アプリケーション
## 実行手順
1. src/environmentsにenvironment.tsを以下の内容で追加してください
```
export const environment = {
  production: false,
  API_HOST: [APIのホスト],
  API_KEY_NAME: [APIキーの名前],
  API_KEY: [APIキー]
};
```
2. NPMパッケージをインストールしてローカルサーバを立ち上げてください
```
$ npm i
$ ng serve -o
```
## ルーティング
```
/devices -> デバイス一覧画面(/からリダイレクトされるようになっています)
/devices/[device_id] -> 動画再生画面
```
## ファイル構成(以下全てsrc/app以下)
### モジュール
#### app.module.ts
ルートモジュールです
#### material.module.ts
Angular Materialから必要なモジュールをimportしています
#### modules/devices/devices.module.ts
デバイス一覧画面、動画再生画面に関するモジュールです

### サービス
#### services/device/device.service.ts
APIアクセスやデバイスのサムネイルの更新を管理するサービスです
#### services/local-storage/local-storage.service.ts
localStorageへの値の保存、取得等を管理するサービスです
#### services/title/title.service.ts
画面上のタイトルやブラウザのタブのタイトルを管理するサービスです

### コンポーネント
#### app.component.ts
ルートコンポーネントです
#### common/header/header.component.ts
共通ヘッダーのコンポーネントです
#### modules/devices/detail/detail.component.ts
動画再生画面のコンポーネントです
#### modules/devices/item/item.component.ts
デバイス一覧画面の各デバイスのサムネイルのコンポーネントです(list.componentから呼ばれます)
#### modules/devices/list/list.component.ts
デバイス一覧画面のコンポーネントです
#### modules/devices/list-config-dialog/list-config-dialog.ts
デバイス一覧画面の表示設定ダイアログのコンポーネントです(list.componentから呼ばれます)

### その他
#### constants.ts
定数を定義しているファイルです
#### modules/devices/device.ts, modules/devices/list.ts
それぞれデバイス、リストの定義を行っているファイルです
