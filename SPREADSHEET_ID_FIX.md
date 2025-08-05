# Google Apps Script スプレッドシートID設定ガイド

## 問題の解決方法

現在、Google Apps ScriptにスプレッドシートIDが設定されていないため、データが保存できません。以下の手順で修正してください。

## ステップ1: スプレッドシートIDを見つける

### 方法A: 既存のスプレッドシートがある場合
1. データを保存したいGoogle Spreadsheetsを開く
2. URLを確認する：
   ```
   https://docs.google.com/spreadsheets/d/1234567890abcdefghijklmnopqrstuvwxyz/edit
                                          ↑ この部分がスプレッドシートID
   ```
3. `/d/` と `/edit` の間の文字列をコピー

### 方法B: 新しくスプレッドシートを作成する場合
1. [Google Sheets](https://sheets.google.com)にアクセス
2. 「+」ボタンで新規スプレッドシートを作成
3. シート名を「回答一覧」に変更（重要！）
4. URLからIDをコピー

## ステップ2: Google Apps Scriptを更新

1. [Google Apps Script](https://script.google.com)にアクセス
2. あなたの「AI診断データ保存」プロジェクトを開く
3. 以下のコードを**すべて選択してコピー**し、既存のコードと置き換える：

```javascript
// POSTリクエストを処理する関数
function doPost(e) {
  try {
    // リクエストボディをパース
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを開く
    // ↓↓↓ ここにスプレッドシートIDを貼り付けてください ↓↓↓
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    // ↑↑↑ 'YOUR_SPREADSHEET_ID_HERE'を実際のIDに置き換える ↑↑↑
    
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('回答一覧');
    
    // ヘッダー行がない場合は追加
    if (sheet.getLastRow() === 0) {
      const headers = [
        'タイムスタンプ',
        '会社名',
        '業種',
        '従業員数',
        '氏名',
        'メールアドレス',
        'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 
        'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
        'Q11', 'Q12', 'Q13', 'Q14', 'Q15',
        '総合スコア',
        'ティア'
      ];
      sheet.appendRow(headers);
    }
    
    // データを配列に変換
    const row = [
      data.timestamp || new Date().toISOString(),
      data.company || '',
      data.industry || '',
      data.headcount || '',
      data.name || '',
      data.email || '',
      data.answers?.q1 || data.answers?.[1] || '',
      data.answers?.q2 || data.answers?.[2] || '',
      data.answers?.q3 || data.answers?.[3] || '',
      data.answers?.q4 || data.answers?.[4] || '',
      data.answers?.q5 || data.answers?.[5] || '',
      data.answers?.q6 || data.answers?.[6] || '',
      data.answers?.q7 || data.answers?.[7] || '',
      data.answers?.q8 || data.answers?.[8] || '',
      data.answers?.q9 || data.answers?.[9] || '',
      data.answers?.q10 || data.answers?.[10] || '',
      data.answers?.q11 || data.answers?.[11] || '',
      data.answers?.q12 || data.answers?.[12] || '',
      data.answers?.q13 || data.answers?.[13] || '',
      data.answers?.q14 || data.answers?.[14] || '',
      data.answers?.q15 || data.answers?.[15] || '',
      data.total_score || 0,
      data.tier || ''
    ];
    
    // 最終行に追加
    sheet.appendRow(row);
    
    // ログに記録
    console.log('Data saved successfully:', {
      company: data.company,
      email: data.email,
      score: data.total_score
    });
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーログ
    console.error('Error in doPost:', error.toString());
    
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GETリクエストを処理する関数（テスト用）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Google Apps Script is working correctly',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// テスト関数（エディタから実行可能）
function testSaveData() {
  // テストデータ
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        company: "テスト会社",
        industry: "IT",
        headcount: "1-50",
        name: "テスト太郎",
        email: "test@example.com",
        answers: {
          q1: 1, q2: 2, q3: 3, q4: 2, q5: 1,
          q6: 2, q7: 3, q8: 2, q9: 1, q10: 2,
          q11: 3, q12: 2, q13: 1, q14: 2, q15: 3
        },
        total_score: 75,
        tier: "★★"
      })
    }
  };
  
  // doPost関数をテスト
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}
```

4. **重要**: 9行目の `'YOUR_SPREADSHEET_ID_HERE'` をステップ1でコピーしたIDに置き換える
   - 例: `const spreadsheetId = '1234567890abcdefghijklmnopqrstuvwxyz';`

## ステップ3: 保存して再デプロイ

1. Ctrl+S（Mac: Cmd+S）で保存
2. 「デプロイ」→「デプロイの管理」をクリック
3. 鉛筆アイコン（編集）をクリック
4. バージョンを「新バージョン」に変更
5. 「デプロイ」をクリック

## ステップ4: 動作確認

### 方法1: ブラウザで確認
1. デプロイURLをブラウザで開く
2. 以下のようなメッセージが表示されればOK：
   ```json
   {
     "status": "ok",
     "message": "Google Apps Script is working correctly",
     "timestamp": "2025-08-05T..."
   }
   ```

### 方法2: Apps Scriptエディタで確認
1. Apps Scriptエディタで`testSaveData`関数を選択
2. 「実行」ボタンをクリック
3. 初回は権限の承認が必要
4. Google Sheetsにテストデータが追加されているか確認

## トラブルシューティング

### エラー: "Exception: Spreadsheet with id [YOUR_SPREADSHEET_ID_HERE] not found"
→ スプレッドシートIDが正しく設定されていません。手順2を再確認してください。

### エラー: "TypeError: Cannot read property 'getSheetByName' of null"
→ スプレッドシートIDが無効です。URLから正しいIDをコピーしてください。

### エラー: "Exception: Sheet 回答一覧 was not found"
→ スプレッドシートのシート名を「回答一覧」に変更してください。

### データが保存されない
1. Apps Scriptのログを確認（表示→ログ）
2. ブラウザの開発者ツールでネットワークタブを確認
3. レスポンスのステータスとメッセージを確認

## 確認事項チェックリスト

- [ ] スプレッドシートIDを正しく設定した
- [ ] シート名が「回答一覧」になっている
- [ ] コードを保存して再デプロイした
- [ ] ブラウザでGET確認ができた
- [ ] テスト関数でデータ保存ができた

これらすべてが完了すれば、アプリケーションからのデータ保存が正常に動作するはずです。