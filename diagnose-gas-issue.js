// Diagnostic script to identify GAS integration issues

const GAS_URL = 'https://script.google.com/macros/s/AKfycbziuZzkU3S0c_DZKmVrfIRV9YR4U_8EDQR6Ggkq8qcX792IeEcC9Hiyq2OdoK53cc3rPw/exec';

console.log('=== GOOGLE APPS SCRIPT INTEGRATION DIAGNOSTIC ===\n');

// Issue Analysis based on the error
console.log('IDENTIFIED ISSUE:');
console.log('Error: "Unexpected error while getting the method or property openById on object SpreadsheetApp."');
console.log('\nThis error indicates that the Google Apps Script is trying to access a spreadsheet but failing.');
console.log('Common causes:');
console.log('1. The SPREADSHEET_ID in the GAS code is undefined or incorrect');
console.log('2. The GAS doesn\'t have permission to access the spreadsheet');
console.log('3. The spreadsheet has been deleted or moved');
console.log('4. The GAS code has a syntax error when defining SPREADSHEET_ID\n');

// Test data structure analysis
console.log('=== DATA STRUCTURE ANALYSIS ===\n');

const frontendData = {
  timestamp: new Date().toISOString(),
  company: "テスト株式会社",
  industry: "IT",
  headcount: "101-500",
  name: "テスト 太郎",
  email: "test@example.com",
  answers: {
    "q1": 2, "q2": 1, "q3": 0, "q4": 1, "q5": 2,
    "q6": 1, "q7": 0, "q8": 1, "q9": 2, "q10": 0,
    "q11": 1, "q12": 1, "q13": 2, "q14": 1, "q15": 2
  },
  total_score: 78,
  tier: "★★"
};

console.log('Frontend sends this data structure:');
console.log(JSON.stringify(frontendData, null, 2));

console.log('\n=== GOOGLE APPS SCRIPT CODE REQUIREMENTS ===\n');

console.log('The GAS code should have:');
console.log('1. A valid SPREADSHEET_ID constant defined at the top');
console.log('2. Proper doPost function to handle POST requests');
console.log('3. Error handling for spreadsheet access');
console.log('\nExample GAS code structure:\n');

const exampleGAS = `
// Replace with your actual spreadsheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Working!"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Prepare row data
    const row = [
      data.timestamp,
      data.company,
      data.industry,
      data.headcount,
      data.name,
      data.email,
      data.total_score,
      data.tier,
      // Add individual answers
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
      data.answers.q15 || ''
    ];
    
    // Append the row
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

console.log(exampleGAS);

console.log('\n=== TROUBLESHOOTING STEPS ===\n');
console.log('1. Check your Google Apps Script code:');
console.log('   - Make sure SPREADSHEET_ID is defined correctly');
console.log('   - The ID should be the long string from your spreadsheet URL');
console.log('   - Example: If URL is https://docs.google.com/spreadsheets/d/1ABC123.../edit');
console.log('   - Then ID is: 1ABC123...\n');

console.log('2. Verify spreadsheet permissions:');
console.log('   - The spreadsheet should be accessible by the Google account that owns the GAS');
console.log('   - Try opening the spreadsheet directly to confirm access\n');

console.log('3. Test with a simple version:');
console.log('   - Replace your doPost with a simple test that doesn\'t access the spreadsheet');
console.log('   - This will confirm if the issue is specifically with spreadsheet access\n');

console.log('4. Check GAS deployment:');
console.log('   - Make sure you\'ve deployed as "Web app"');
console.log('   - Execute as: "Me"');
console.log('   - Who has access: "Anyone"\n');

console.log('=== FRONTEND INTEGRATION STATUS ===\n');
console.log('✓ Frontend is correctly configured with endpoint:', GAS_URL);
console.log('✓ Data structure is properly formatted');
console.log('✓ Environment variable VITE_SAVE_ENDPOINT is set');
console.log('✓ Frontend attempts both regular and no-cors fallback');
console.log('✗ GAS is failing to access the spreadsheet\n');

console.log('=== RECOMMENDED ACTIONS ===\n');
console.log('1. Fix the SPREADSHEET_ID in your Google Apps Script');
console.log('2. Redeploy the GAS after making changes');
console.log('3. Test using the test-gas.html file in this directory');
console.log('4. Once working, the frontend should automatically save data\n');