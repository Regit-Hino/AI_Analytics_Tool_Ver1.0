// Node.js ESM script for testing remarks submission
import fetch from 'node-fetch';
import FormData from 'form-data';

const GAS_URL = 'https://script.google.com/a/macros/regit-technology.com/s/AKfycbwmcnuNAdT7leScIb3JnYPkH2Pye6vN0PruZZZ_3szelb1MczLg0hLmjAxN_Qf5GvBl/exec';

// Generate timestamp in JST
function getJSTTimestamp() {
  const now = new Date();
  const jstOffset = 9 * 60;
  const jstTime = new Date(now.getTime() + (jstOffset * 60 * 1000));
  
  const year = jstTime.getUTCFullYear();
  const month = String(jstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(jstTime.getUTCDate()).padStart(2, '0');
  const hours = String(jstTime.getUTCHours()).padStart(2, '0');
  const minutes = String(jstTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(jstTime.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function testRemarks() {
  const testData = {
    timestamp: getJSTTimestamp(),
    company: "デバッグテスト株式会社",
    industry: "IT",
    headcount: "101-500",
    name: "自動テスト太郎",
    email: "auto-test@example.com",
    answers: {
      1: 2,
      2: 1,
      3: 0,
      4: 1,
      5: 2,
      6: 1,
      7: 0,
      8: 1,
      9: 2,
      10: 0,
      11: 1,
      12: 1,
      13: 2,
      14: 1,
      15: 2
    },
    total_score: 78,
    tier: "★★",
    remarks: "これは自動テストのヒアリングメモです。remarksフィールドが正しくX列に記録されることを確認します。日本語、English、123、特殊文字!@#$%も含めてテストします。"
  };

  console.log('=== SENDING TEST DATA ===');
  console.log('Timestamp:', testData.timestamp);
  console.log('Company:', testData.company);
  console.log('Remarks:', testData.remarks);
  console.log('Remarks length:', testData.remarks.length);
  console.log('\nFull data:');
  console.log(JSON.stringify(testData, null, 2));

  try {
    // Test 1: JSON format
    console.log('\n=== TEST 1: JSON Format ===');
    const response1 = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(testData),
    });
    console.log('Response status:', response1.status);
    const text1 = await response1.text();
    console.log('Response body:', text1);
    
    // Test 2: FormData format
    console.log('\n=== TEST 2: FormData Format ===');
    const formData = new FormData();
    formData.append('data', JSON.stringify(testData));
    
    const response2 = await fetch(GAS_URL, {
      method: 'POST',
      body: formData,
    });
    console.log('Response status:', response2.status);
    const text2 = await response2.text();
    console.log('Response body:', text2);
    
    // Test 3: URL encoded
    console.log('\n=== TEST 3: URL Encoded Format ===');
    const params = new URLSearchParams();
    params.append('data', JSON.stringify(testData));
    
    const response3 = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    console.log('Response status:', response3.status);
    const text3 = await response3.text();
    console.log('Response body:', text3);
    
    console.log('\n=== TESTS COMPLETED ===');
    console.log('Please check your spreadsheet for the following entries:');
    console.log('- Company: "デバッグテスト株式会社"');
    console.log('- Name: "自動テスト太郎"');
    console.log('- X column (remarks): Should contain the test memo');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testRemarks();