## 前半の部： Momento Topics ハンズオン手順

このワークショップでは、Momento Topicsを深く掘り下げ、チャットアプリを作成しAWSのサービスに対して構築していきます。使用するサービスは以下の通りです、

* ユーザの写真を保存する用途で、Amazon S3
* データストアとしての DynamoDB
* ホスティング先として、AWS App Runner

# 学習目的
前半のワークショップではMomentoについての概要、使うためにどうすればよいのかなど初期構築からMomentoコンソールの見方、APIキーの発行の仕方についてを学んでいきます。

# 前提条件
* 利用できるAWS アカウントがあること

# 所要時間
* 前半については、全体を通して45分のワークショップを予定しております。

### はじめに: Momentoの概要についてをお話しします。

### 1. Momento コンソールへサインアップおよびAPIキーを作成する

#### Momento(https://www.gomomento.com/jp/home-page)にアクセスしてください。
![momento コンソール](images/momento_1.png)

#### Momento Console からサインアップします。
![momentoへサインイン](images/momento_2.png)

#### momento cacheを作成してください。

![momento cacheの作成](images/momento_3.png)

#### キャッシュ名に[example]を入力し、クラウドプロバイダー&リージョンに[aws]を、リージョンは[ap-northeast-1]を選択し、「作成」を押す。

![momento cacheの作成](images/momento_4.png)


#### Momento SDKを使用するためにAPIキーを発行します。
* 左のタブにある[トークンの生成]を選択すると以下の画面が表示されます。
* 「Type of key」は「Super User Key」を選択します。
* ラウドプロバイダー&リージョンに[aws]を、リージョンは[ap-northeast-1]を、Expirationは[30日]を選択いたします。
* 最後に「トークンを生成する」をクリックします。

![momento apiキーを発行する](images/momento_5.png)

#### トークン、apiキーが生成されると下記のような画面になります。ここで、[JSONをダウンロード]をクリックしてください。
![momento apiキーを発行する](images/momento_6.png)

### Momento TopicsをMomentoコンソールから体験してみます。


### AWSにて作業環境を構築
AWSへログイン
Cloud9へアクセス
githubからのCloneを選択
GitHubからリポジトリをcloneする (https://github.com/Yoshiitaka/momento-topics-hands-on)


### SAMを利用し、データストアを構築

### SNSチャットアプリを構築する

バックエンドのAPIとWeb側でローカル起動をして動作確認をする
操作1: .env.templateをコピーして、払い出したmomento auth toekn をcloneしたrepoの.envに設定する
i .env
NEXT_PUBLIC_AUTH_BASE_URL="aaa"と作成し、”xxxxxxxx”を入力し:qw!で保存する

手順2: momento クライアント側のコードを追加する

### AWS App Runnerへチャットアプリをデプロイ


### 動作確認

### まとめ
