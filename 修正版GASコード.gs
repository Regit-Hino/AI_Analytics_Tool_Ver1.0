// Google Apps Script - 修正版
// このコード全体をコピーしてGoogle Apps Scriptに貼り付けてください

// スプレッドシートIDをここに設定（重要！）
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // ← ここを実際のIDに変更！

// POSTリクエストを処理する関数
function doPost(e) {
  try {
    console.log('POST request received');
    
    // リクエストボディをパース
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // スプレッドシートを開く
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('回答一覧');
    
    // シートが存在しない場合は作成
    if (!sheet) {
      sheet = spreadsheet.insertSheet('回答一覧');
      // ヘッダー行を追加
      const headers = [
        'タイムスタンプ', '会社名', '業種', '従業員数', '氏名', 'メールアドレス',
        'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
        'Q11', 'Q12', 'Q13', 'Q14', 'Q15', '総合スコア', 'ティア'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
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
    console.log('Data saved successfully');
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
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
      message: 'Working!',
      spreadsheetId: SPREADSHEET_ID
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// スプレッドシートへのアクセステスト関数
function testSpreadsheetAccess() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet name:', spreadsheet.getName());
    console.log('Access successful!');
    return true;
  } catch (error) {
    console.error('Cannot access spreadsheet:', error);
    return false;
  }
}