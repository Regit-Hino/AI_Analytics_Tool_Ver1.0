// このファイルの内容をすべてコピーして、Google Apps Scriptに貼り付けてください
// 貼り付け後、YOUR_SPREADSHEET_IDを実際のスプレッドシートIDに置き換えてください

// POSTリクエストを処理する関数
function doPost(e) {
  try {
    // デバッグログ
    console.log('Received POST request');
    console.log('Content Type:', e.contentType);
    console.log('Post Data:', e.postData);
    console.log('Post Data Contents:', e.postData.contents);
    
    // リクエストボディをパース
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを開く（IDを実際のものに置き換えてください）
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // ← ここにスプレッドシートIDを入力
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
    console.log('Data saved:', data);
    
    // 成功レスポンス（CORS対応）
    const output = ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        data: {
          timestamp: data.timestamp,
          company: data.company,
          score: data.total_score
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    // CORS headers設定
    return output;
      
  } catch (error) {
    // エラーログ
    console.error('Error:', error);
    
    // エラーレスポンス（CORS対応）
    const errorOutput = ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        details: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    return errorOutput;
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
function test() {
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
  console.log(result.getContent());
}