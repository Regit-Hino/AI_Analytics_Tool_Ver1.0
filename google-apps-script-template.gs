// Google Apps Script Template for AI Analytics Tool
// Copy this code to your Google Apps Script project

// IMPORTANT: Replace this with your actual Google Spreadsheet ID
// Get it from your spreadsheet URL: https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Working!"
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle POST requests (for saving data)
function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received POST request:', e.postData.contents);
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.timestamp || !data.company || !data.email) {
      throw new Error('Missing required fields');
    }
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // If this is the first entry, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [
        'タイムスタンプ',
        '会社名',
        '業種',
        '従業員数',
        '氏名',
        'メールアドレス',
        '総合スコア',
        'ティア',
        // Individual question answers
        'Q1', 'Q2', 'Q3', 'Q4', 'Q5',
        'Q6', 'Q7', 'Q8', 'Q9', 'Q10',
        'Q11', 'Q12', 'Q13', 'Q14', 'Q15'
      ];
      sheet.appendRow(headers);
    }
    
    // Prepare the data row
    const row = [
      data.timestamp,
      data.company || '',
      data.industry || '',
      data.headcount || '',
      data.name || '',
      data.email || '',
      data.total_score || 0,
      data.tier || '',
      // Add individual answers (handle both numeric and string keys)
      data.answers['q1'] || data.answers[1] || '',
      data.answers['q2'] || data.answers[2] || '',
      data.answers['q3'] || data.answers[3] || '',
      data.answers['q4'] || data.answers[4] || '',
      data.answers['q5'] || data.answers[5] || '',
      data.answers['q6'] || data.answers[6] || '',
      data.answers['q7'] || data.answers[7] || '',
      data.answers['q8'] || data.answers[8] || '',
      data.answers['q9'] || data.answers[9] || '',
      data.answers['q10'] || data.answers[10] || '',
      data.answers['q11'] || data.answers[11] || '',
      data.answers['q12'] || data.answers[12] || '',
      data.answers['q13'] || data.answers[13] || '',
      data.answers['q14'] || data.answers[14] || '',
      data.answers['q15'] || data.answers[15] || ''
    ];
    
    // Append the row to the spreadsheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data saved successfully",
      row_number: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify spreadsheet access
function testSpreadsheetAccess() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    console.log('Spreadsheet name:', spreadsheet.getName());
    console.log('Sheet name:', sheet.getName());
    console.log('Last row:', sheet.getLastRow());
    return 'Success: Can access spreadsheet';
  } catch (error) {
    console.error('Error accessing spreadsheet:', error);
    return 'Error: ' + error.toString();
  }
}

// Deployment Instructions:
// 1. Replace SPREADSHEET_ID with your actual spreadsheet ID
// 2. Save the script (Ctrl+S or Cmd+S)
// 3. Click "Deploy" > "New deployment"
// 4. Choose type: "Web app"
// 5. Settings:
//    - Description: "AI Analytics Tool Data Collector"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
// 6. Click "Deploy"
// 7. Copy the Web app URL and update your .env file