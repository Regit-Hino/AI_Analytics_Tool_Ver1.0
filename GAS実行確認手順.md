# GAS実行確認手順

## 問題の可能性

1. **スプレッドシートIDが設定されていない**
   - GASコードの `const spreadsheetId = 'ここにスプレッドシートIDを入力';` の部分が変更されていない

2. **GASの権限設定**
   - GASがスプレッドシートへのアクセス権限を持っていない

3. **シート名の不一致**
   - スプレッドシートに「回答一覧」という名前のシートが存在しない

## 確認手順

### 1. GASエディタでの直接テスト

1. Google Apps Scriptエディタを開く
2. デバッグ版のコードを貼り付ける
3. スプレッドシートIDを正しく設定する
4. `testDirectSave()` 関数を選択して実行
5. 実行ログを確認

### 2. 実行ログの確認方法

1. GASエディタの左側メニューから「実行数」をクリック
2. 最新の実行を確認
3. エラーメッセージがないか確認

### 3. スプレッドシートの確認

1. スプレッドシートを開く
2. 「回答一覧」シートが存在することを確認
3. ヘッダー行が正しく設定されていることを確認

### 4. 権限の確認

1. GASを初めて実行する際は権限の承認が必要
2. 「権限を確認」→「詳細」→「安全ではないページに移動」→「許可」

## トラブルシューティング

### エラー: "スプレッドシートIDが設定されていません！"
→ GASコードのスプレッドシートIDを実際のIDに変更してください

### エラー: "「回答一覧」シートが見つかりません"
→ スプレッドシートに「回答一覧」という名前のシートを作成してください

### エラー: "Exception: You do not have permission to call SpreadsheetApp.openById"
→ GASの権限を承認してください

## 最小テストコード

```javascript
function minimalTest() {
  try {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('回答一覧');
    sheet.appendRow(['テスト', new Date().toISOString()]);
    console.log('成功！');
  } catch (error) {
    console.error('エラー:', error.toString());
  }
}
```

このコードをGASエディタで実行して、基本的な書き込みが成功するか確認してください。