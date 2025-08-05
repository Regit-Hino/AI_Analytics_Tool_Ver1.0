# 🔍 GAS実行ログ確認手順

## デバッグ情報
送信したテストデータ：
- **会社名**: `デバッグテスト_1754370236259`
- **時刻**: `2025-08-05T05:03:56.259Z`

## 1. GASの実行ログを確認

### 手順：
1. **Google Apps Scriptエディタを開く**
2. **左側メニューの「実行数」をクリック**
3. **最新の実行を確認**
   - 実行時刻を確認
   - ステータスを確認（成功/失敗）
   - エラーメッセージがあれば確認

### よくあるエラー：

#### ❌ "Exception: You do not have permission to call SpreadsheetApp.openById"
→ **権限の承認が必要**
1. GASエディタで任意の関数を実行
2. 「権限を確認」をクリック
3. Googleアカウントを選択
4. 「詳細」→「安全でないページに移動」→「許可」

#### ❌ "TypeError: Cannot read property 'getSheetByName' of null"
→ **スプレッドシートIDが間違っている**
- 正しいID: `1-vBChfdpYN1-Sb92jVX5n1FA8eTFH_ztZgQyZCsTwN4`

#### ❌ "Exception: シートが見つかりません"
→ **「回答一覧」シートが存在しない**
- スプレッドシートに「回答一覧」という名前のシートを作成

## 2. GASエディタで直接テスト

以下のコードをGASエディタで実行：

```javascript
function debugTest() {
  console.log('=== デバッグ開始 ===');
  
  // 1. スプレッドシートIDの確認
  const spreadsheetId = '1-vBChfdpYN1-Sb92jVX5n1FA8eTFH_ztZgQyZCsTwN4';
  console.log('スプレッドシートID:', spreadsheetId);
  
  try {
    // 2. スプレッドシートを開く
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    console.log('✅ スプレッドシートを開けました');
    console.log('スプレッドシート名:', spreadsheet.getName());
    
    // 3. シート一覧を取得
    const sheets = spreadsheet.getSheets();
    console.log('シート数:', sheets.length);
    sheets.forEach(sheet => {
      console.log('- シート名:', sheet.getName());
    });
    
    // 4. 「回答一覧」シートを取得
    const targetSheet = spreadsheet.getSheetByName('回答一覧');
    if (targetSheet) {
      console.log('✅ 「回答一覧」シートが見つかりました');
      
      // 5. テストデータを追加
      const testRow = [
        new Date().toISOString(),
        'GASデバッグテスト',
        'IT',
        '1-100',
        'テスト太郎',
        'gas-debug@example.com',
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
        75,
        '★★'
      ];
      
      targetSheet.appendRow(testRow);
      console.log('✅ データを追加しました');
      
      // 6. 最終行を確認
      const lastRow = targetSheet.getLastRow();
      console.log('最終行番号:', lastRow);
      
    } else {
      console.log('❌ 「回答一覧」シートが見つかりません');
      console.log('利用可能なシート名:');
      sheets.forEach(sheet => {
        console.log('  -', sheet.getName());
      });
    }
    
  } catch (error) {
    console.error('❌ エラー発生:', error.toString());
    console.error('スタックトレース:', error.stack);
  }
  
  console.log('=== デバッグ終了 ===');
}

// 実行ボタンでこの関数を実行してください
```

## 3. 権限の確認

### GASの権限設定：
1. **デプロイ設定の確認**
   - 実行ユーザー：自分
   - アクセスできるユーザー：全員

2. **スプレッドシートの共有設定**
   - GASを実行するGoogleアカウントがスプレッドシートにアクセスできることを確認
   - 必要に応じて編集権限を付与

## 4. 最小限のテスト

```javascript
function minimalTest() {
  try {
    // これだけでエラーが出るか確認
    const sheet = SpreadsheetApp.openById('1-vBChfdpYN1-Sb92jVX5n1FA8eTFH_ztZgQyZCsTwN4');
    console.log('成功: スプレッドシートにアクセスできます');
  } catch (error) {
    console.error('失敗:', error.toString());
  }
}
```

## 5. 確認事項チェックリスト

- [ ] GASコードが保存されている
- [ ] 再デプロイが完了している（バージョン：新バージョン）
- [ ] スプレッドシートIDが正しく設定されている
- [ ] 「回答一覧」シートが存在する
- [ ] GASの実行権限が承認されている
- [ ] スプレッドシートへのアクセス権限がある

これらの手順を実行して、エラーメッセージを教えてください。