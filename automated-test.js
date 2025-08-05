// 自動テストスクリプト
const GAS_URL = 'https://script.google.com/macros/s/AKfycbziuZzkU3S0c_DZKmVrfIRV9YR4U_8EDQR6Ggkq8qcX792IeEcC9Hiyq2OdoK53cc3rPw/exec';

// テストデータ
const testData = {
    timestamp: new Date().toISOString(),
    company: "自動テスト株式会社",
    industry: "IT",
    headcount: "101-500",
    name: "自動テスト 太郎",
    email: "autotest@example.com",
    answers: {
        "q1": 2,
        "q2": 1,
        "q3": 0,
        "q4": 1,
        "q5": 2,
        "q6": 1,
        "q7": 0,
        "q8": 1,
        "q9": 2,
        "q10": 0,
        "q11": 1,
        "q12": 1,
        "q13": 2,
        "q14": 1,
        "q15": 2
    },
    total_score: 78,
    tier: "★★"
};

async function runTests() {
    console.log('=== Google Apps Script 自動テスト開始 ===\n');
    console.log('テストデータ:', JSON.stringify(testData, null, 2));
    console.log('\n--- テスト実行 ---\n');

    // 1. GETリクエストテスト
    try {
        console.log('1. GETリクエストテスト...');
        const response = await fetch(GAS_URL);
        const text = await response.text();
        console.log(`✓ GET成功: Status ${response.status}`);
        console.log(`  Response: ${text}\n`);
    } catch (error) {
        console.log(`✗ GET失敗: ${error.message}\n`);
    }

    // 2. No-CORS POSTテスト（本番と同じ方式）
    try {
        console.log('2. No-CORS POSTテスト (本番方式)...');
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(testData),
        });
        console.log('✓ No-CORS POST送信完了');
        console.log('  (注: no-corsモードではレスポンスは読めません)\n');
    } catch (error) {
        console.log(`✗ No-CORS POST失敗: ${error.message}\n`);
    }

    // 3. FormData No-CORS POSTテスト
    try {
        console.log('3. FormData No-CORS POSTテスト...');
        const formData = new FormData();
        formData.append('data', JSON.stringify(testData));
        
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
        });
        console.log('✓ FormData POST送信完了\n');
    } catch (error) {
        console.log(`✗ FormData POST失敗: ${error.message}\n`);
    }

    // 4. URLSearchParams No-CORS POSTテスト
    try {
        console.log('4. URLSearchParams No-CORS POSTテスト...');
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(testData));
        
        await fetch(GAS_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: params,
        });
        console.log('✓ URLSearchParams POST送信完了\n');
    } catch (error) {
        console.log(`✗ URLSearchParams POST失敗: ${error.message}\n`);
    }

    console.log('=== テスト完了 ===');
    console.log('\n重要: no-corsモードでは送信成功を確認できません。');
    console.log('Google スプレッドシートの「回答一覧」シートを確認してください。');
    console.log('以下のデータが記録されているはずです:');
    console.log('- 会社名: 自動テスト株式会社');
    console.log('- 名前: 自動テスト 太郎');
    console.log('- 時刻: ' + testData.timestamp);
}

// テスト実行
runTests();