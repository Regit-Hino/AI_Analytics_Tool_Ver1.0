# GitHub Pages デプロイメント注意事項

## セキュリティ対策

### 1. GASの保護
GASコードに以下のような簡単な認証を追加することを推奨：

```javascript
function doPost(e) {
  try {
    // 簡単なトークン認証
    const SECRET_TOKEN = 'your-secret-token-here';
    
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    }
    
    // トークンチェック
    if (data.token !== SECRET_TOKEN) {
      throw new Error('Unauthorized');
    }
    
    // 以降は既存のコード
  } catch (error) {
    // エラー処理
  }
}
```

### 2. 環境変数の設定
`.env.production`ファイルを作成：
```
VITE_AI_ENDPOINT=
VITE_SAVE_ENDPOINT=https://script.google.com/macros/s/YOUR_PRODUCTION_DEPLOYMENT_ID/exec
```

### 3. スプレッドシートの権限
- スプレッドシートの共有設定を「リンクを知っている人は閲覧可能」に設定
- 編集権限は自分のみに制限

## デプロイ手順

1. 本番用のGASをデプロイ
2. `.env.production`を設定
3. ビルド実行：`npm run build`
4. GitHub Pagesにデプロイ：
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

## 利用規約・プライバシーポリシー

個人情報を扱うため、以下の対応を推奨：
- 利用規約の追加
- プライバシーポリシーの追加
- データの利用目的の明記

## モニタリング

- Google Sheetsの定期的な確認
- 異常なアクセスパターンの監視
- 不正なデータの削除

## 制限事項

- GitHub Pagesは静的ホスティングのみ
- サーバーサイドの処理は不可
- HTTPSは自動で有効化される