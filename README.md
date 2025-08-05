# AI 即日診断

AI活用準備度を診断する単一ページアプリケーション。React + Vite + TypeScript + Tailwind CSS + Framer Motion + shadcn/ui で構築されています。

## 機能

- 15問のAI準備度診断アンケート
- 回答の自動保存（localStorage）
- スコア計算とティア判定（★〜★★★）
- API連携による推奨事項の取得
- PDF/CSVダウンロード機能
- アニメーション付きUI

## セットアップ

### 前提条件

- Node.js 16.x以上
- npm または yarn

### インストール

```bash
# プロジェクトの作成
npm create vite@latest ai-check --template react-ts
cd ai-check

# または既存のディレクトリで
npm install
```

### 環境変数の設定

`.env.example` を `.env` にコピーして、API エンドポイントを設定します：

```bash
cp .env.example .env
```

`.env` ファイルを編集：

```
VITE_AI_ENDPOINT=https://your-api-endpoint.com/getRecommendation
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:4000 を開きます。

## ビルドとデプロイ

### ビルド

```bash
npm run build
```

`dist` ディレクトリに静的ファイルが生成されます。

### GitHub Pages へのデプロイ

1. GitHub でリポジトリを作成

2. リポジトリ名に合わせて `vite.config.ts` の `base` を更新：
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

3. git の初期化とリモート設定：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

4. GitHub Pages の設定：
   - リポジトリの Settings → Pages へ移動
   - Source を "Deploy from a branch" に設定
   - Branch を `gh-pages` に設定
   - Save をクリック

5. デプロイの実行：
   ```bash
   npm run deploy
   ```

6. 数分後、`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` でアプリにアクセスできます。

## API仕様

### エンドポイント

`POST ${VITE_AI_ENDPOINT}`

### リクエスト

```json
{
  "score": 75,
  "answers": {
    "1": 5,
    "2": 7,
    // ...
  }
}
```

### レスポンス

```json
{
  "comment": "総評のテキスト",
  "levers": ["重点施策1", "重点施策2", "重点施策3"],
  "usecases": ["ユースケース1", "ユースケース2", "ユースケース3"]
}
```

## 技術スタック

- **React** 18.2.0
- **TypeScript** 5.2.2
- **Vite** 5.0.8
- **Tailwind CSS** 3.4.0
- **Framer Motion** 11.0.0
- **shadcn/ui** コンポーネント
- **jsPDF** 2.5.1（PDFダウンロード）

## カラーパレット

- Primary: `#FFD600` (黄色)
- Secondary: `#0066FF` (青)
- White: `#FFFFFF`
- Dark: `#222222`

## 開発ポート

開発サーバーはポート 4000 で起動します（3000, 5174, 8000-8082 を避けるため）。

## ライセンス

MIT