# GitHub Pages デプロイガイド

## ✅ 動作する機能

1. **AI診断アンケート** - 完全に動作
2. **診断結果の表示** - モックデータで動作
3. **PDFダウンロード** - 動作
4. **CSVダウンロード** - 動作
5. **Google スプレッドシートへの送信** - 動作（GASが正しく設定されていれば）

## 🚨 注意点

### 1. AIエンドポイント
- `VITE_AI_ENDPOINT` が設定されていない場合、業種別のモックデータが使用されます
- 実際のAI分析を使用したい場合は、APIエンドポイントが必要です

### 2. 環境変数
GitHub Pagesでは環境変数を直接設定できないため、ビルド時に含める必要があります。

## デプロイ手順

### 1. vite.config.tsを更新

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI_Analytics_Tool_Ver1.0/', // リポジトリ名に合わせる
})
```

### 2. package.jsonにデプロイスクリプトを追加

```json
{
  "scripts": {
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 3. gh-pagesパッケージをインストール

```bash
npm install --save-dev gh-pages
```

### 4. .envファイルの内容を直接設定（オプション）

セキュリティ上、公開しても問題ない場合のみ：

```typescript
// src/config.ts を作成
export const config = {
  saveEndpoint: 'https://script.google.com/macros/s/YOUR_GAS_ID/exec',
  aiEndpoint: '' // 空の場合はモックデータを使用
};
```

### 5. デプロイ実行

```bash
npm run deploy
```

### 6. GitHub Pagesを有効化

1. GitHubリポジトリの Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages
4. フォルダ: / (root)
5. Save

## セキュリティ考慮事項

### ⚠️ 重要な注意点

1. **GAS URLは公開される**
   - フロントエンドのコードに含まれるため、誰でも見ることができます
   - スプレッドシートへの書き込みのみ許可し、読み取りは制限することを推奨

2. **スプレッドシートの権限設定**
   - GASは「全員」がアクセス可能に設定されています
   - スプレッドシートは直接公開しないでください
   - GAS経由でのみアクセスを許可

3. **データ保護**
   - 収集したデータ（メールアドレス等）の取り扱いに注意
   - プライバシーポリシーの掲載を検討

## 推奨される追加対策

### 1. レート制限
GASコードに追加：
```javascript
// 同一IPからの連続アクセスを制限
const cache = CacheService.getScriptCache();
const ip = e.parameter.ip || 'unknown';
const count = cache.get(ip) || 0;
if (count > 10) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'error', message: 'Rate limit exceeded'}))
    .setMimeType(ContentService.MimeType.JSON);
}
cache.put(ip, parseInt(count) + 1, 60); // 1分間のカウント
```

### 2. 基本的な検証
```javascript
// データの妥当性チェック
if (!data.email || !data.email.includes('@')) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'error', message: 'Invalid email'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## GitHub Actionsで自動デプロイ

`.github/workflows/deploy.yml` を作成：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SAVE_ENDPOINT: ${{ secrets.VITE_SAVE_ENDPOINT }}
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## まとめ

- ✅ GitHub Pagesで問題なく動作します
- ✅ 無料でホスティング可能
- ⚠️ GAS URLは公開されるため、適切なセキュリティ対策が必要
- 💡 商用利用の場合は、より安全なバックエンド構築を推奨