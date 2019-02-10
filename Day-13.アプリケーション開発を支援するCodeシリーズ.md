# Day 13. アプリケーション開発を支援するCodeシリーズ

## CodeCommit

ソースコード管理サービス。Gitリポジトリをホストすることができる。

- バッチサーバーから接続する際IAMユーザーを利用するので、`aws configure`でバッチサーバーにIAMユーザーのアクセスキーを設定する

## CodeBuild

ビルドサービス。コンパイルしたりテストしたりする。`buildspec.yml`にビルドの内容を定義する。

- アーティファクト保存用のS3バケットはバージョニングを有効にする
- CodeBuildプロジェクト作成時に追加したロールに`CodeDeployDeployerAccess`と`S3FullAccess`をアタッチする

## CodeDeploy

デプロイ自動化サービス。`appspec.yml`にデプロイの動作を定義する。

- CodeBuildの`buildspec.yml`に設定したアプリケーション名でアプリケーションを作成する
- ビルドが遅いのは「登録解除の遅延」で待ちが生じているため
  - ターゲットグループの「属性の変更」にて変更することができる

## CodePipeline

継続的デリバリをサポートするサービス。CodeCommit、CodeBuild、CodeDeployをパイプライン処理する。

- 手動の承認を挟むことができる
