# Funhub

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1082524923102248980/1203887288300474428/image.png?ex=65d2ba68&is=65c04568&hm=5053bd335f4a7c002c7f28d58580b51a1446b1878cc4c5eeba35e81797c0b87f&" width="100%"/>
</p>

####

<p align="center">
<img src="https://cdn.discordapp.com/attachments/1082524923102248980/1203887453862105118/image.png?ex=65d2ba90&is=65c04590&hm=aab0bec1981e2e75e74630014367b3fa2466b0d4c8072d9a8f915faebed435cc&" width="100%"/>
</p>

## 紹介

このプロジェクトは、JavaScript を使用したフルスタックのアプリケーションで、さまざまな技術を利用しています。

- `Node.js`
- `Express.js`
- `React.js`
- `MySQL`

## 前提条件

マシンに `Node.js` と `npm`がインストールされていることを確認してください。
`Node.js` のバージョン `18` を使用してください。バージョンを確認するには、`node -v` を実行します。

## インストール

1. リポジトリをクローンします：
   `git clone <https://github.com/huynhnguyen1906/FunHub.git>`

2. ルート、サーバー、およびクライアントディレクトリで依存関係をインストールします：

####

    cd <Funhub>

####

    npm install

####

    cd server

####

    npm install

####

    cd ../client

####

    npm install

3. 設定
   サーバーディレクトリに`.env.example`を`.env`にコピーし、環境変数を入力してください。
   サーバーディレクトリに `funhub-keyfile.example.json` を `funhub-keyfile.json` にコピーし、環境変数を入力してください。

## 開始方法

アプリケーションを起動するには、ルートディレクトリに戻り、次のコマンドを実行します：

    npm start

## プロジェクト構造

プロジェクトは以下の構造を持っています：

- `client/`：React クライアントアプリケーションが含まれています。
  - `src/`：React アプリケーションのソースコードが含まれています。
  - `src/components/`：再利用可能な React コンポーネントが含まれています。
  - `src/pages/`：React アプリケーションの異なるページが含まれています。
- `server/`：Node.js サーバーが含まれています。
  - `src/`：サーバーのソースコードが含まれています
  - `src/controllers/`：HTTP リクエストを処理するためのコントローラー関数が含まれています。
  - `src/models/`：データモデルが含まれています。
  - `src/routes/`: API ルートが含まれています。
  - `src/config/database`：データベースの設定が含まれています。
