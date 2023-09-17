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

### Momento Topicsを体験する為の設定をします。
* 左のタブにある「topics」を選択する。
* そうすると以下の画面になります。
* 「クラウドプロバイダー」には[aws]を選択し、「リージョン」には[ap-northeast-1]を、「Cache」に[example]を設定します。
* 最後に、「Topics」に[test]を入力し、「Subscribe」をクリックします。

![momento Topicsを体験する](images/momento_7.png)

#### 体験してみましょう。
* 「Type your message...」にテキストを入力し、「Publish」をクリックするとメッセージの送受信ができることが確認できます。

![momento Topicsを体験する](images/momento_8.png)

### AWSにて作業環境を構築
#### AWSへログイン
* 自身でお持ちのAWSアカウントへログインしてください。

#### Cloud9へアクセス
* マネジメントコンソールからCloud9へアクセスします。

AWS Cloud9 は、ブラウザだけでコードを作成、実行、デバッグできるクラウドベースの統合開発環境 (IDE) です。
コードエディター、デバッガー、ターミナルが含まれています。Cloud9 には、一般的なプログラミング言語に必要なツールと AWS コマンドラインインターフェイス (CLI) がプリインストールされているため、このワークショップのためにファイルをインストールしたりラップトップを設定したりする必要はありません。

Cloud9 環境は、AWS マネジメントコンソールにログインしたユーザーと同じ AWS リソースにアクセスできるようになります。

AWS Cloud9 の詳細については、以下のリソースをご覧ください。
* https://aws.amazon.com/cloud9/ 
* https://docs.aws.amazon.com/cloud9/latest/user-guide/welcome.html 

#### Cloud9にてワークスペースを作成する

* デフォルト設定の AWS Cloud9 アプローチに従います このワークショップに必要なCloud9インスタンスを作成します。

https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/tutorial-create-environment.html

* 「リージョン」は[ap-northeast-1]を設定し、「環境作を作成」からワークスペースを作成します。

![cloud9でワークスペースを作成する](images/momento_9.png)

* 名前に[momento-workspace]を入力してください。
* 環境タイプはデフォストの状態で[新しいEC2インスタンス]のチェックボックスの入力のままにしておきます。
* 新しいEC2インスタンスにはデフォルトの状態のままで[t2.micro]のチェックボックスに入力されたままにしておきます。
* プラットフォームは[Amazon Linux 2]のままでタイムアウトは[30分]のままにします。
* ネットワーク設定については、接続を[AWS Systems Manager(SSM)]のままにします。
* VPCの設定もいじらずそのままとしましょう。
* 上記の状態でデフォルトの状態のまま[作成]をクリックしてください。

#### githubからのCloneを選択

* Cloud9のワークスペース[momento-workspace]の作成が完了するまで2~3分程度お待ちください。このタイミングで作成が完了しなかった場合は、講師にヘルプを求めてください。
* 完了し次第、下記の画面のようになるので、[開く]をクリックしてください。

![cloud9でワークスペースを作成する](images/momento_10.png)


##### Cloud9を起動すると、ファイル ブラウザ、ファイル エディタ、ターミナルで構成される 3 つのウィンドウが表示されます。

![cloud9でワークスペースを作成する](images/momento_11.png)

#### 操作に必要なものをインストールする

* まずは、aws cliがダウンロードされていることを確認します。
```
$ aws --version
aws-cli/2.13.13 Python/3.11.4 Linux/4.14.322-244.536.amzn2.x86_64 exe/x86_64.amzn.2 prompt/off
```

* 次にGitがインストールされていることを確認します。

```
$ git --version
git version 2.40.1
```

* 問題がなければ、今回使用するソースコードをcloneしてきます。

```
 $ git clone https://github.com/Yoshiitaka/momento-topics-hands-on.git
Cloning into 'momento-topics-hands-on'...
remote: Enumerating objects: 169, done.
remote: Counting objects: 100% (169/169), done.
remote: Compressing objects: 100% (108/108), done.
remote: Total 169 (delta 63), reused 147 (delta 47), pack-reused 0
Receiving objects: 100% (169/169), 1010.95 KiB | 11.75 MiB/s, done.
Resolving deltas: 100% (63/63), done.
```

* 無事cloneが完成すると以下のようにcloud9上は表示されます。

![momento Topicsを体験する](images/momento_12.png)

* 最後にチェックしていただきたいのは、sam cliがインストールされていることを確認いたします。
* 今回はデータストアとなるDynamoDBやオブジェクトストレージにはS3を使用しています。それら資源については、SAMを利用し資源を作成するような流れとなります。

```
$ sam --version
SAM CLI, version 1.72.0
```

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
