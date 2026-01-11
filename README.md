# RerekishoReaction
履歴書をブラウザ上で作成するためのWebアプリケーションのサンプルです。

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
```

# 環境構築

## 前提条件
以下がローカルにインストール済みであることが必要です。
Node.js、AWS CLI、AWS SSM Plugin、Docker

## Node.jsバージョン
v24.x系  
開発時：v24.12.0  
開発者ごとにバージョンが異なるとpackage-lock.jsonがコンフリクトを起こすので、ローカルNode.jsのバージョンを合わせることを推奨します。

## cloudformation

### 事前準備
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
/RerekishoReaction/DevEmail=通知に使われる開発者のEmailアドレス(Let's Encryptから通知が届きます)
```

### 初回デプロイ
以下のコマンドにて初回デプロイを行います。  
EC2がVPC内に作成され、SecurityGroupにてhttps通信が許可され、ElasticIPが付与された上で、Route53にAレコードが追加されます。  
CodeDeployのアプリ、デプロイグループ、デプロイ用リビジョンのアップロード先S3も同時に作成されます。  

```
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
AWS CLIとsession-manager-pluginのインストールが済んでいる状態で、以下の通り接続します。

```
aws ssm start-session --target 作成されたEC2のインスタンスID(例：i-xxxxx)
```

### 本番系では
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
# ビルドしてrevision.zipを作成
npm run create
# revision.zipをS3にアップロード
npm run upload
# createとuploadは以下で一括実行できます
npm run prepare
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
### CodeDeployのAfterInstallの内容について
ALBを利用していないため、Let's EncryptにてSSL証明書を取得しています。  
CloudFormationでRoute53のAレコードを作成している都合上、DNSに浸透してからCodeDeployにてデプロイすることでLet's Encryptが通るようになります。  

## server

### ローカル環境構築
MariaDBをdocker上で立ち上げます。
```
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
# 実行環境（local、staging、production）
CURRENT_ENV="local"
APP_PORT= "3000"

# prisma
DATABASE_URL="mysql://prisma_user_local:パスワード(docker-compose.ymlにて設定)@127.0.0.1:3306/rerekisho_reaction_app"
```

以下にてローカル環境が立ち上がります。
```
npm i
npm run prisma:generate
npm run dev
```

## client

### ローカル環境構築
以下にてローカル環境が立ち上がります。
```
npm i
npm run dev
```

# その他
## 画像ファイルについて
faviconとロゴ画像はAI生成です。  

