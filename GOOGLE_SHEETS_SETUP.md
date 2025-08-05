# Google Sheets連携セットアップガイド

## 問題の原因と解決方法

### 主な問題点
1. Google Apps ScriptのスプレッドシートIDが設定されていない（`YOUR_SPREADSHEET_ID`のまま）
2. CORSの問題でデータが正しく送信されていない
3. Content-Typeヘッダーが適切に設定されていない

## セットアップ手順

### 1. Google Sheetsの準備

1. 新しいGoogle Sheetsを作成
2. シート名を「回答一覧」に変更（重要！）
3. スプレッドシートのURLからIDをコピー
   - URL例: `https://docs.google.com/spreadsheets/d/[ここがID]/edit`
   - IDは`/d/`と`/edit`の間の文字列

### 2. Google Apps Scriptの設定

1. Google Sheetsで「拡張機能」→「Apps Script」を選択
2. `コード.gs`の内容を全て削除
3. `コード.gs`ファイルの内容を全てコピーして貼り付け
4. **重要**: 17行目の`YOUR_SPREADSHEET_ID`を実際のスプレッドシートIDに置き換える
   ```javascript
   const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // ← ここを実際のIDに変更
   ```

### 3. Google Apps Scriptのデプロイ

1. Apps Scriptエディタで「デプロイ」→「新しいデプロイ」をクリック
2. 設定:
   - 種類: 「ウェブアプリ」
   - 説明: 「AI診断ツール データ保存」
   - 次のユーザーとして実行: 「自分」
   - アクセスできるユーザー: 「全員」
3. 「デプロイ」をクリック
4. 表示されるウェブアプリのURLをコピー

### 4. 環境変数の更新

`.env`ファイルの`VITE_SAVE_ENDPOINT`を新しいURLに更新:
```
VITE_SAVE_ENDPOINT=https://script.google.com/macros/s/[新しいデプロイID]/exec
```

### 5. アプリケーションの再起動

```bash
npm run dev
```

## デバッグ方法

### ブラウザコンソールで確認すべき項目

1. **ネットワークタブ**
   - POSTリクエストが送信されているか
   - ステータスコード（200 OKが理想）
   - レスポンスの内容

2. **コンソールログ**
   - `Sending diagnosis data:` のログ
   - `Response from GAS:` のログ
   - エラーメッセージ

### Google Apps Scriptのログ確認

1. Apps Scriptエディタで「実行」→「ログを表示」
2. POSTリクエストを受信した際のログを確認

### よくある問題と解決方法

1. **「スプレッドシートが見つかりません」エラー**
   - スプレッドシートIDが正しく設定されているか確認
   - シート名が「回答一覧」になっているか確認

2. **CORSエラー**
   - Apps Scriptが「全員」アクセス可能に設定されているか確認
   - URLが最新のデプロイURLか確認

3. **データが保存されない**
   - Google Sheetsの権限を確認
   - Apps Scriptのログでエラーを確認

## テスト方法

1. アプリケーションで診断を完了
2. 結果画面で「テスト送信」ボタンをクリック（開発モードのみ表示）
3. Google Sheetsを確認してデータが追加されているか確認

## 修正内容の説明

### `send.ts`の変更
- `mode: 'no-cors'`を削除し、適切なヘッダーを設定
- エラー時のフォールバック処理を追加
- レスポンスの確認とログ出力を改善

### `コード.gs`の変更
- デバッグログを追加
- エラーハンドリングを改善
- レスポンスに詳細情報を追加

これらの変更により、データが正しくGoogle Sheetsに保存されるようになります。