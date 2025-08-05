# Google Apps Script セットアップガイド

## 問題の診断

現在、401エラーが発生しています。これは以下の原因が考えられます：

1. **Google Apps Scriptの公開設定**
   - Webアプリケーションとして公開されていない
   - アクセス権限が正しく設定されていない

2. **URLの問題**
   - 提供されたURL: `https://script.google.com/a/macros/regit-technology.com/s/AKfycbwmcnuNAdT7leScIb3JnYPkH2Pye6vN0PruZZZ_3szelb1MczLg0hLmjAxN_Qf5GvBl/exec`
   - これは組織内限定URLの形式です（`/a/macros/regit-technology.com/`）

## 解決方法

### 1. Google Apps Scriptの設定確認

1. Google Apps Scriptエディタを開く
2. 「デプロイ」→「デプロイを管理」
3. 現在のデプロイの設定を確認：
   - **実行ユーザー**: 「ウェブアプリケーションにアクセスしているユーザー」または「自分」
   - **アクセスできるユーザー**: 「全員」（匿名ユーザーを含む）

### 2. 正しいURLの取得

公開URLは以下の形式である必要があります：
- `https://script.google.com/macros/s/{SCRIPT_ID}/exec`
- 組織内限定の場合: `https://script.google.com/a/macros/{DOMAIN}/s/{SCRIPT_ID}/exec`

### 3. Google Apps Scriptのコード例

```javascript
function doPost(e) {
  try {
    // リクエストボディをパース
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートに書き込み
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('回答一覧');
    
    // データを配列に変換
    const row = [
      data.timestamp,
      data.company,
      data.industry,
      data.headcount,
      data.name,
      data.email,
      data.answers.q1 || '',
      data.answers.q2 || '',
      data.answers.q3 || '',
      data.answers.q4 || '',
      data.answers.q5 || '',
      data.answers.q6 || '',
      data.answers.q7 || '',
      data.answers.q8 || '',
      data.answers.q9 || '',
      data.answers.q10 || '',
      data.answers.q11 || '',
      data.answers.q12 || '',
      data.answers.q13 || '',
      data.answers.q14 || '',
      data.answers.q15 || '',
      data.total_score,
      data.tier
    ];
    
    // 最終行に追加
    sheet.appendRow(row);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GETリクエスト用（テスト用）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok', message: 'GAS is working'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 4. デプロイ手順

1. 上記のコードをGoogle Apps Scriptに貼り付け
2. 「デプロイ」→「新しいデプロイ」
3. 種類: 「ウェブアプリ」
4. 設定:
   - 説明: 「AI診断データ収集」
   - 実行ユーザー: 「自分」
   - アクセスできるユーザー: 「全員」
5. 「デプロイ」をクリック
6. 表示されたURLをコピー

### 5. テスト方法

1. ブラウザで `{YOUR_GAS_URL}` にアクセス
2. `{"status":"ok","message":"GAS is working"}` が表示されれば成功

### 6. .envファイルの更新

```
VITE_SAVE_ENDPOINT=https://script.google.com/macros/s/{YOUR_SCRIPT_ID}/exec
```

## トラブルシューティング

### CORSエラーの場合
- `mode: 'no-cors'` を使用しているため、レスポンスは読めません
- ネットワークタブでリクエストが送信されているか確認

### 401エラーの場合
- アクセス権限を「全員」に設定
- 組織内限定の場合は、同じGoogleアカウントでログインしているか確認

### データが保存されない場合
- Google Apps Scriptのログを確認
- スプレッドシートIDが正しいか確認
- シート名が「回答一覧」になっているか確認