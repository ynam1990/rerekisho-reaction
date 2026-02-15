# rerekisho-reaction
履歴書をブラウザ上で作成できる、Webアプリケーションのサンプルです。  
Webアプリ開発を学習される方向けの参考用として公開しています。  

公開Webサイト  
https://rerekishon.ynam.click
  
※履歴書の様式は厚生労働省の定める通りです  
https://www.mhlw.go.jp/stf/newpage_kouseisaiyou030416.html

# ディレクトリ
インフラ、バックエンド、フロントエンドをモノレポにしています。  
開発をチーム分けする場合はリポジトリを分けてください。

```
/cloudformation
AWSのインフラセットをIaCで記述しています。

/app/codedeploy
AWSのCodeDeploy用スクリプトです。

/app/server
Expressのバックエンドコード群です。

/app/client
Reactのフロントエンドコード群です。
基本はFSD、shared/uiのみAtomicDesign風に分けています。

/openapi
バックエンド・フロントエンドでAPI仕様を共有するためのOpenAPI記述です。

/packages
上記OpenAPIのopenapi.ymlから生成されるAPIの型情報を、リポジトリ内で共通利用するためのパッケージです。
```

## 利用させていただいたフレームワーク、ツールなど
- インフラ系
  - AWS VPC、Route53、IAM、S3、EC2
  - AWS CloudFormation (インフラ構造の自動デプロイ)
  - AWS CodeDeploy (コードの自動デプロイ)
- バックエンド Node.js + MariaDB + Redis
  - Express
  - Prisma (ORM)
  - Prism (モックサーバー)
- フロントエンド JS
  - React.js
  - Redux (ストア管理)
  - Styled-Components (CSS in JS)
  - Storybook (JSXコンポーネントのプレビュー)
- テスト 主流の2つ
  - Jest（バックエンドに導入）
  - Vitest（フロントエンドに導入）

# 環境構築

## 前提条件
以下がローカルにインストール済みであることが必要です。  
Node.js、AWS CLI、AWS SSM Plugin、Docker、(必要に応じて)SwaggerViewer

## Node.jsバージョン
v24.x系  
開発時：v24.12.0  
開発者ごとにバージョンが異なるとpackage-lock.jsonがコンフリクトを起こすので、ローカルNode.jsのバージョンを合わせることを推奨します。

## cloudformation

### AWS事前準備
1.任意のリージョンに、VPCを作成します。サブネットも同時に作成されます。  
2.任意のドメインでRoute53にホストゾーンを作成します。  
3.SystemsManagerのパラメータストアに以下のパラメータを作成します。(SecureStringを使用するため、KMSで暗号化キーを一つ用意してください)  

```
/RerekishoReaction/VpcId=事前に作成したVPCのID(例：vpc-xxxxx)
/RerekishoReaction/PublicSubnetId=事前に作成したPublicSubnetのID(例：subnet-xxxxx)
/RerekishoReaction/HostedZoneId=事前に作成したRoute53ホストゾーンのID
/RerekishoReaction/RecordName=ホストゾーンに作成するレコードのドメイン名
/RerekishoReaction/DBUserName=データベースに接続する任意のユーザ名(例：prisma_user)
/RerekishoReaction/DBPassword=データベースに設定する任意のパスワード(暗号化推奨)
/RerekishoReaction/DATABASE_URL=prismaのDB接続情報の形式に則った文字列(例：mysql://prisma_user:passpass@localhost:3306/rerekisho_reaction_db)
/RerekishoReaction/REDIS_HOST="127.0.0.1"
/RerekishoReaction/REDIS_PORT="6379"
/RerekishoReaction/NODE_ENV="production"
/RerekishoReaction/SESSION_SECRET=ランダムな任意のセッションシークレット(例：prod-xxxxxx)
/RerekishoReaction/SESSION_NAME="connect.sid"
/RerekishoReaction/DevEmail=Let's Encryptに登録する開発者のEmailアドレス
```

### 初回デプロイ
以下のコマンドにて初回デプロイを行います。  
EC2がVPC内に作成され、SecurityGroupにてhttps通信が許可され、ElasticIPが付与された上で、Route53にAレコードが追加されます。  
CodeDeployのアプリ、デプロイグループ、デプロイ用リビジョンファイルのアップロード先S3も同時に作成されます。  

```
実行ディレクトリ: cloudformation/

aws cloudformation deploy \
  --template-file template.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --fail-on-empty-changeset \
  --stack-name rerekisho-reaction-ec2 \
  --parameter-overrides \
    Region=リージョン(例: ap-northeast-1) \
    SSMParameterStoreId=パラメータストアのArn（例：arn:aws:ssm:ap-northeast-1:xxxxx:parameter） \
    SSMParameterStoreKeyId=作成したKMSのキーArn（例：arn:aws:kms:ap-northeast-1:xxxxx:key/mrk-xxxxx）
```

### EC2へのセッション接続方法
ローカルPCにAWS CLIとsession-manager-pluginのインストールが済んでいる状態で、以下の通り接続します。

```
aws ssm start-session --target 作成されたEC2のインスタンスID(例：i-xxxxx)
```

### [TIPS] 本番系では
費用はかかりますが、本プロジェクトでEC2+Nginx+LetsEncryptとしている部分は、ECS+ALB+ACMとして置き換えるとより良くなります。

### 削除方法
以下のコマンドでスタックを削除できます。  
今回はデータベースをRDSに外部化しておらず、EC2上に乗せています。インスタンス切り替え時にデータが削除されないよう、外部のEBSを永続化しています。
**注：RerekishoReactionEC2PermanentVolumeのみ永続化しているため、自動的には削除されません。手動で削除が必要になります。**  

```
aws cloudformation delete-stack \
  --stack-name 作成したスタック名(例：rerekisho-reaction-ec2)
```

## CodeDeploy
### ビルドとアップロード
以下のようにappディレクトリでコードをビルドしてS3にアップロードします。
```
実行ディレクトリ: ルート

# ビルドしてrevision.zipを作成
npm run build:app  
npm run gen:revision  
# revision.zipをS3にアップロード
npm run upload:revision  
```
**「npm run gen:revision」はshファイルに実行権限を付けていないと失敗します**  
windowsの場合：「npm run gen:revision」はshスクリプトを利用しているため、WSL上で実行するなどします  
```
実行権限の付与
chmod +x app/codedeploy/gen_revision.sh
```

### デプロイ
以下のコマンドでS3にアップロードしたrevision.zipをEC2にデプロイできます。  

```
aws deploy create-deployment \
  --application-name RerekishoReactionCodeDeployApp \
  --deployment-group-name RerekishoReactionDeploymentGroup \
  --revision '{
    "revisionType":"S3",
    "s3Location":{
      "bucket":"rerekisho-reaction-code-deploy-s3-bucket",
      "key":"revision.zip",
      "bundleType":"zip"
    }
  }' \
  --description "RerekishoReaction deploy from s3 revision.zip"
```
**after_install.shがメモリ不足で失敗する場合があります。その場合は以下のshでスワップ領域を追加するなどします。**  
/app/codedeploy/scripts/_add_swapfile.sh  

### CodeDeployのAfterInstallの内容について
ALBを利用していないため、Let's EncryptにてSSL証明書を取得しています。  
CloudFormationでRoute53のAレコードを作成している都合上、DNSに浸透してからCodeDeployにてデプロイすることでLet's Encryptが通るようになります。  

## serverとclient共通
以下にてローカル環境が立ち上がります。  

初回実行  
```
実行ディレクトリ: ルート

パッケージインストール
npm i

openapi.ymlから、API返り値の型を生成
npm run gen:contract
npm run build:contract

schema.prismaからprisma関連ファイルの生成
npm run gen:prisma_client
```

開発環境の立ち上げ
```
実行ディレクトリ: ルート

ローカルサーバ
npm run dev:server
npm run dev:db

ローカルクライアント
npm run dev:client

モックAPIサーバ
npm run dev:mockapi

Storybook
npm run dev:storybook
```

## server

### ローカル環境構築
MariaDBをdocker上で立ち上げます。
```
実行ディレクトリ: app/server/

# docker立ち上げ
docker compose up -d
# dockerシャットダウン
docker compose down
# docker状況確認
docker compose ps
# ログ確認
docker logs -f rerekisho-reaction-mariadb-local
# docker内のmaridbに接続
docker exec -it rerekisho-reaction-mariadb-local mariadb -u root -p
```

環境変数を.envファイルとして設置します  
```
# 実行環境（development、production）
NODE_ENV="development"
APP_PORT= "3000"
OUTPUT_REQUEST_LOGS="false"

# セッション
SESSION_SECRET="local-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
SESSION_NAME="connect.sid"
※SESSION_SECRETはランダムな文字列「openssl rand -base64 64」などで生成

# prisma
DATABASE_URL="mysql://prisma_user_local:passpass@127.0.0.1:3002/rerekisho_reaction_local_db"
SHADOW_DATABASE_URL="mysql://prisma_user_local:passpass@127.0.0.1:3002/rerekisho_reaction_shadow_db"
※passpassはdocker-compose.ymlにて設定した任意のパスワード

# redis
REDIS_HOST="127.0.0.1"
REDIS_PORT=3004
```

.env.testも設置します
```
# 実行環境（development、production）
NODE_ENV="development"
APP_PORT= "3001"
OUTPUT_REQUEST_LOGS="false"

# セッション
SESSION_SECRET="local-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
SESSION_NAME="connect.sid"

# prisma(テスト用)
DATABASE_URL="mysql://prisma_user_local:passpass@127.0.0.1:3002/rerekisho_reaction_test_db"

# redis(テスト用)
REDIS_HOST="127.0.0.1"
REDIS_PORT=3005

# JestのESMモジュールサポートを有効にするためのオプション(v29まで)
NODE_OPTIONS=--experimental-vm-modules
```

### Prismaマイグレーションの適用
```
実行ディレクトリ: ルート

npm run prisma:migrate
```

## client

### ローカル環境構築
ローカルAPI接続先ポートの情報を記した環境変数を.envファイルとして設置します  
```
# ローカルExpressサーバーに繋げる場合
VITE_LOCAL_API_PORT=3001

# prismモックサーバーに繋げる場合
# VITE_LOCAL_API_PORT=3003
```  

# その他
## 画像ファイルについて
faviconとロゴ画像はAI生成です。  

