# AI Backend Starter

このプロジェクトは Mastra を使用した AI バックエンドのスターター プロジェクトです。

## インストール

```bash
pnpm install
```

## 開発サーバーの起動

```bash
pnpm dev
```

## デプロイメント

Mastraはスタンダードな Node.js サーバーとしてビルドされるため、Node.jsをサポートする様々なプラットフォームにデプロイできます：

### デプロイ可能なプラットフォーム

- **クラウドVM**
  - AWS EC2
  - DigitalOcean Droplets
  - GCP Compute Engine
- **コンテナプラットフォーム**
  - Docker
  - Kubernetes
- **PaaS（Platform as a Service）**
  - Heroku
  - Railway
- **セルフホスティング**
  - 自社サーバー

### ビルド手順

アプリケーションをビルドするには：

```bash
# カレントディレクトリからビルド
pnpm build

# または特定のディレクトリを指定してビルド
pnpm build --dir ./my-project
```

ビルドプロセスでは以下が実行されます：

- エントリーファイル（`src/mastra/index.ts` または `src/mastra/index.js`）の検出
- `.mastra` 出力ディレクトリの作成
- Rollupを使用したコードのバンドル（ツリーシェイキングとソースマップ付き）
- Hono HTTPサーバーの生成

### デプロイ手順

1. **依存関係のインストールとビルド**

```bash
pnpm install
pnpm build
```

2. **環境変数の設定**

- 必要な環境変数をデプロイ先の環境に設定してください

3. **アプリケーションの起動**

```bash
node .mastra/output/index.mjs
```

4. **（推奨）プロセスマネージャーの使用**

本番環境では、PM2などのプロセスマネージャーの使用を推奨します：

```bash
# PM2のグローバルインストール
pnpm add -g pm2

# アプリケーションの起動
pm2 start .mastra/output/index.mjs
```

PM2を使用することで、以下のような利点があります：

- アプリケーションの永続的な実行
- 自動再起動
- ログ管理
- プロセスモニタリング

## サーバーレスデプロイメント

[公式の概要](https://mastra.ai/docs/deployment/deployment)
[CloudflareDeployer](https://mastra.ai/docs/reference/deployer/cloudflare)

このセクションでは、Cloudflare Workers、Vercel、Netlifyへのデプロイ方法について説明します。

### 前提条件

デプロイを開始する前に、以下を確認してください：

- Node.js v18以上がインストールされていること
- 各プラットフォーム固有のデプロイヤーを使用する場合：
  - 選択したプラットフォームのアカウントを持っていること
  - 必要なAPIキーまたは認証情報を用意していること

### サーバーレスプラットフォーム用デプロイヤー

以下のプラットフォーム向けのデプロイヤーが利用可能です：

- Cloudflare Workers
- Vercel
- Netlify

### デプロイヤーのインストール

```bash
# Cloudflare用
pnpm add @mastra/deployer-cloudflare

# Vercel用
pnpm add @mastra/deployer-vercel

# Netlify用
pnpm add @mastra/deployer-netlify
```

### デプロイヤーの設定

エントリーファイルでデプロイヤーを設定します：

```typescript
import { Mastra, createLogger } from "@mastra/core";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";

export const mastra = new Mastra({
  agents: {
    /* エージェントの設定 */
  },
  logger: createLogger({ name: "MyApp", level: "debug" }),
  deployer: new CloudflareDeployer({
    scope: "your-cloudflare-scope",
    projectName: "your-project-name",
    // 詳細な設定オプションはリファレンスドキュメントを参照
  }),
});
```

### プラットフォーム別の設定例

#### Cloudflare Deployer

```typescript
new CloudflareDeployer({
  scope: "your-cloudflare-account-id",
  projectName: "your-project-name",
});
```

#### Vercel Deployer

```typescript
new VercelDeployer({
  teamSlug: "your-vercel-team-slug",
  projectName: "your-project-name",
  token: "your-vercel-token",
});
```

#### Netlify Deployer

```typescript
new NetlifyDeployer({
  scope: "your-netlify-team-slug",
  projectName: "your-project-name",
  token: "your-netlify-token",
});
```

### 環境変数

以下の環境変数の設定が必要です：

#### プラットフォーム固有の変数

- 各プラットフォームの認証情報

#### エージェントのAPI キー

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`

#### サーバー設定（ユニバーサルデプロイメント用）

- `PORT`: HTTPサーバーのポート（デフォルト: 3000）
- `HOST`: サーバーホスト（デフォルト: 0.0.0.0）
